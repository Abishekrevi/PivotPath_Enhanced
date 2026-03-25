import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Send, Bot, User, CheckCircle, XCircle, RotateCcw, Trophy, ChevronRight, Loader, Star, TrendingUp, DollarSign, BarChart2, BrainCircuit } from 'lucide-react';
import { useWorker } from '../App';
import { useLanguage } from '../context/LanguageContext';

const INTERVIEW_ROLES = [
  { id: 'swe', label: 'Software Engineer', icon: '💻', sector: 'Tech', questions: 8 },
  { id: 'data', label: 'Data Analyst', icon: '📊', sector: 'Tech', questions: 8 },
  { id: 'pm', label: 'Product Manager', icon: '🎯', sector: 'Tech', questions: 8 },
  { id: 'fin_analyst', label: 'Financial Analyst', icon: '💰', sector: 'Finance', questions: 8 },
  { id: 'ca', label: 'Chartered Accountant', icon: '📋', sector: 'Finance', questions: 8 },
  { id: 'risk', label: 'Risk Manager', icon: '⚠️', sector: 'Finance', questions: 8 },
  { id: 'inv_banker', label: 'Investment Banker', icon: '🏦', sector: 'Finance', questions: 8 },
  { id: 'ux', label: 'UX Designer', icon: '🎨', sector: 'Design', questions: 8 },
  { id: 'mktg', label: 'Digital Marketer', icon: '📣', sector: 'Marketing', questions: 8 },
  { id: 'hr', label: 'HR Business Partner', icon: '👥', sector: 'HR', questions: 8 },
];

const DIFFICULTY_LEVELS = [
  { id: 'fresher', label: 'Fresher (0-1 yr)', color: '#059669', bg: '#ECFDF5' },
  { id: 'junior', label: 'Junior (1-3 yrs)', color: '#2563EB', bg: '#EFF6FF' },
  { id: 'senior', label: 'Senior (3-7 yrs)', color: '#7C3AED', bg: '#F5F3FF' },
  { id: 'lead', label: 'Lead / Manager', color: '#B45309', bg: '#FFFBEB' },
];

const SYSTEM_PROMPT = (role, difficulty, workerName) => `You are Arjun, a professional AI interviewer for PivotPath — an Indian job upskilling platform. You are conducting a ${difficulty} level interview for the role of ${role}.

Candidate name: ${workerName || 'Candidate'}

RULES:
1. Ask one focused interview question at a time
2. After the candidate answers, provide brief constructive feedback (2-3 sentences), rate the answer 1-5 stars, then ask the NEXT question
3. After 6-8 questions, end the interview with a comprehensive evaluation summary including: Overall Score (out of 100), Strengths (3 points), Areas to Improve (3 points), Recommended courses/skills, and whether they are "Ready to Apply" or "Need More Preparation"
4. Keep questions relevant to the ${role} role and ${difficulty} experience level
5. Be encouraging but honest
6. Format feedback clearly with: "⭐ Rating: X/5" and "💬 Feedback: ..."
7. When ending, use "🎯 INTERVIEW COMPLETE" as the header
8. Salary expectations should be in Indian Rupees (₹)
9. Be conversational and professional

Start by greeting the candidate warmly and asking the first question.`;

export default function Tests() {
  const { worker } = useWorker();
  const { t } = useLanguage();
  const [phase, setPhase] = useState('select'); // select | interview | results
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedDiff, setSelectedDiff] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [scores, setScores] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [sectorFilter, setSectorFilter] = useState('All');
  const bottomRef = useRef(null);

  const sectors = ['All', ...new Set(INTERVIEW_ROLES.map(r => r.sector))];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startInterview = async () => {
    if (!selectedRole || !selectedDiff) return;
    setPhase('interview');
    setMessages([]);
    setLoading(true);
    setIsComplete(false);
    setQuestionCount(0);
    setScores([]);

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM_PROMPT(selectedRole.label, selectedDiff.label, worker?.name),
          messages: [{ role: 'user', content: 'Start the interview' }],
        }),
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || '';
      setMessages([{ role: 'assistant', text }]);
      setQuestionCount(1);
    } catch (e) {
      setMessages([{ role: 'assistant', text: `Hello ${worker?.name?.split(' ')[0] || 'there'}! I'm Arjun, your AI interviewer today. Welcome to your ${selectedRole.label} interview. Let's begin!\n\n**Question 1:** Tell me about yourself and why you're interested in the ${selectedRole.label} role.` }]);
      setQuestionCount(1);
    }
    setLoading(false);
  };

  const sendAnswer = async () => {
    const answer = input.trim();
    if (!answer || loading) return;
    setInput('');
    const newMessages = [...messages, { role: 'user', text: answer }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const apiMessages = newMessages.map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.text }));
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM_PROMPT(selectedRole.label, selectedDiff.label, worker?.name),
          messages: apiMessages,
        }),
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || '';
      setMessages(m => [...m, { role: 'assistant', text }]);

      // Extract star rating
      const match = text.match(/⭐\s*Rating:\s*(\d)/);
      if (match) setScores(s => [...s, parseInt(match[1])]);

      if (text.includes('🎯 INTERVIEW COMPLETE')) {
        setIsComplete(true);
        setPhase('results');
      } else {
        setQuestionCount(q => q + 1);
      }
    } catch (e) {
      setMessages(m => [...m, { role: 'assistant', text: 'Great answer! Let me ask you the next question...\n\nCan you tell me about a challenging situation you faced at work and how you resolved it?' }]);
      setQuestionCount(q => q + 1);
    }
    setLoading(false);
  };

  const avgScore = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : 0;
  const overallPct = Math.round((avgScore / 5) * 100);

  const filteredRoles = sectorFilter === 'All' ? INTERVIEW_ROLES : INTERVIEW_ROLES.filter(r => r.sector === sectorFilter);

  if (phase === 'select') {
    return (
      <div>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: 'var(--gray-800)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <BrainCircuit size={28} color="var(--brand)" /> AI Virtual Interview
          </h1>
          <p style={{ color: 'var(--gray-600)', marginTop: 4 }}>
            Practice with an AI interviewer, get real-time feedback, and know if you're ready to apply.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 28 }}>
          {[
            { icon: '🎯', label: 'Mock Interviews', val: '10+ Roles' },
            { icon: '⭐', label: 'AI Scoring', val: '5-Star Rating' },
            { icon: '💬', label: 'Instant Feedback', val: 'Per Answer' },
            { icon: '🏆', label: 'Certificate', val: 'On Completion' },
          ].map(({ icon, label, val }) => (
            <div key={label} style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 12, padding: '16px 18px', textAlign: 'center' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--brand)' }}>{val}</div>
              <div style={{ fontSize: 11, color: 'var(--gray-500)', marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
          {/* Role Selection */}
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 14 }}>Step 1 — Choose a Role</h2>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
              {sectors.map(s => (
                <button key={s} onClick={() => setSectorFilter(s)} style={{
                  padding: '5px 14px', borderRadius: 20, fontSize: 12, fontWeight: 500, border: '1px solid',
                  borderColor: sectorFilter === s ? 'var(--brand)' : 'var(--gray-200)',
                  background: sectorFilter === s ? 'var(--brand)' : '#fff',
                  color: sectorFilter === s ? '#fff' : 'var(--gray-600)'
                }}>{s}</button>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
              {filteredRoles.map(role => (
                <button key={role.id} onClick={() => setSelectedRole(role)} style={{
                  padding: '16px', borderRadius: 12, border: `2px solid`,
                  borderColor: selectedRole?.id === role.id ? 'var(--brand)' : 'var(--gray-200)',
                  background: selectedRole?.id === role.id ? 'var(--brand-light)' : '#fff',
                  textAlign: 'left', transition: 'all 0.15s', cursor: 'pointer'
                }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{role.icon}</div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--gray-800)' }}>{role.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginTop: 3 }}>{role.sector} · {role.questions} Qs</div>
                  {selectedRole?.id === role.id && <CheckCircle size={14} color="var(--brand)" style={{ marginTop: 6 }} />}
                </button>
              ))}
            </div>
          </div>

          {/* Config Panel */}
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 14 }}>Step 2 — Experience Level</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
              {DIFFICULTY_LEVELS.map(d => (
                <button key={d.id} onClick={() => setSelectedDiff(d)} style={{
                  padding: '12px 16px', borderRadius: 10, border: `2px solid`,
                  borderColor: selectedDiff?.id === d.id ? d.color : 'var(--gray-200)',
                  background: selectedDiff?.id === d.id ? d.bg : '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  transition: 'all 0.15s', cursor: 'pointer'
                }}>
                  <span style={{ fontWeight: 600, fontSize: 13, color: d.color }}>{d.label}</span>
                  {selectedDiff?.id === d.id && <CheckCircle size={14} color={d.color} />}
                </button>
              ))}
            </div>

            {selectedRole && selectedDiff && (
              <div style={{ background: 'var(--brand-light)', border: '1px solid rgba(31,77,140,0.2)', borderRadius: 12, padding: 18, marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--brand)', marginBottom: 8 }}>Interview Summary</div>
                <div style={{ fontSize: 13, color: 'var(--gray-700)' }}>
                  <div>📌 Role: <b>{selectedRole.label}</b></div>
                  <div style={{ marginTop: 4 }}>📊 Level: <b>{selectedDiff.label}</b></div>
                  <div style={{ marginTop: 4 }}>⏱ Duration: <b>~15 mins</b></div>
                  <div style={{ marginTop: 4 }}>❓ Questions: <b>6-8</b></div>
                </div>
              </div>
            )}

            <button
              onClick={startInterview}
              disabled={!selectedRole || !selectedDiff}
              style={{
                width: '100%', padding: '14px', borderRadius: 10,
                background: selectedRole && selectedDiff ? 'var(--brand)' : 'var(--gray-200)',
                color: selectedRole && selectedDiff ? '#fff' : 'var(--gray-400)',
                fontWeight: 700, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
              }}>
              Start Interview <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'results') {
    const lastMsg = messages[messages.length - 1]?.text || '';
    return (
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 64, marginBottom: 12 }}>🎯</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--gray-800)' }}>Interview Complete!</h1>
          <p style={{ color: 'var(--gray-600)', marginTop: 8 }}>Here's your detailed performance report</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div style={{ background: 'var(--brand-light)', border: '1px solid rgba(31,77,140,0.2)', borderRadius: 12, padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--brand)' }}>{overallPct}%</div>
            <div style={{ fontSize: 12, color: 'var(--gray-600)', marginTop: 4 }}>Overall Score</div>
          </div>
          <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: 12, padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: '#B45309' }}>{avgScore}/5</div>
            <div style={{ fontSize: 12, color: 'var(--gray-600)', marginTop: 4 }}>Avg Rating</div>
          </div>
          <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 12, padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: '#059669' }}>{scores.length}</div>
            <div style={{ fontSize: 12, color: 'var(--gray-600)', marginTop: 4 }}>Qs Answered</div>
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 14, padding: 24, marginBottom: 24, whiteSpace: 'pre-wrap', fontSize: 14, lineHeight: 1.8, color: 'var(--gray-700)' }}>
          {lastMsg}
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => { setPhase('select'); setSelectedRole(null); setSelectedDiff(null); }} style={{
            flex: 1, padding: '12px', borderRadius: 10, border: '1px solid var(--gray-200)',
            background: '#fff', fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
          }}>
            <RotateCcw size={16} /> Try Another Role
          </button>
          <button onClick={() => setPhase('interview')} style={{
            flex: 1, padding: '12px', borderRadius: 10,
            background: 'var(--brand)', color: '#fff', fontWeight: 600, fontSize: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
          }}>
            <RotateCcw size={16} /> Retry Same Role
          </button>
        </div>
      </div>
    );
  }

  // Interview chat phase
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)' }}>
      {/* Header */}
      <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 12, padding: '14px 20px', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bot size={20} color="#fff" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Arjun — AI Interviewer</div>
            <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>{selectedRole?.label} · {selectedDiff?.label}</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 20, background: 'var(--brand-light)', color: 'var(--brand)' }}>
            Q{questionCount}
          </span>
          {scores.length > 0 && (
            <span style={{ fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 20, background: '#FFF7ED', color: '#B45309' }}>
              ⭐ {avgScore}/5 avg
            </span>
          )}
          <button onClick={() => setPhase('select')} style={{ fontSize: 12, color: 'var(--gray-500)', background: 'none', border: '1px solid var(--gray-200)', borderRadius: 6, padding: '4px 10px' }}>
            Exit
          </button>
        </div>
      </div>

      {/* Chat messages */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16, paddingRight: 4 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: m.role === 'assistant' ? 'var(--brand)' : 'var(--accent)',
            }}>
              {m.role === 'assistant' ? <Bot size={16} color="#fff" /> : <User size={16} color="#fff" />}
            </div>
            <div style={{
              maxWidth: '75%', padding: '12px 16px', borderRadius: 12,
              background: m.role === 'assistant' ? '#fff' : 'var(--brand)',
              border: m.role === 'assistant' ? '1px solid var(--gray-200)' : 'none',
              color: m.role === 'assistant' ? 'var(--gray-800)' : '#fff',
              fontSize: 13, lineHeight: 1.8, whiteSpace: 'pre-wrap',
              boxShadow: m.role === 'assistant' ? 'var(--shadow)' : 'none',
            }}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bot size={16} color="#fff" />
            </div>
            <div style={{ padding: '14px 18px', background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 12, display: 'flex', gap: 6, alignItems: 'center' }}>
              <Loader size={14} color="var(--brand)" style={{ animation: 'spin 1s linear infinite' }} />
              <span style={{ fontSize: 13, color: 'var(--gray-500)' }}>Arjun is thinking...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      {!isComplete && (
        <div style={{ marginTop: 16, display: 'flex', gap: 10, alignItems: 'flex-end' }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendAnswer(); } }}
            placeholder="Type your answer... (Enter to send, Shift+Enter for new line)"
            style={{ flex: 1, minHeight: 50, maxHeight: 120, resize: 'none', borderRadius: 10, padding: '12px 14px', fontSize: 13, border: '1px solid var(--gray-200)' }}
          />
          <button onClick={sendAnswer} disabled={!input.trim() || loading} style={{
            padding: '12px 16px', borderRadius: 10, background: input.trim() && !loading ? 'var(--brand)' : 'var(--gray-200)',
            color: input.trim() && !loading ? '#fff' : 'var(--gray-400)', border: 'none', height: 50, display: 'flex', alignItems: 'center', gap: 6
          }}>
            <Send size={16} />
          </button>
        </div>
      )}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
