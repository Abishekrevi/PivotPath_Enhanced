import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Award, MessageCircle, Building2, ArrowRight, CheckCircle, Briefcase, BrainCircuit, BookOpen, DollarSign } from 'lucide-react';
import { useWorker } from '../App';
import { coachAPI, signalAPI, credentialAPI } from '../lib/api';
import { useLanguage } from '../context/LanguageContext';

const FINANCE_HIGHLIGHTS = [
  { title: 'NIFTY 50', val: '24,380', change: '+0.42%', up: true },
  { title: 'SENSEX', val: '80,120', change: '+0.38%', up: true },
  { title: 'USD/INR', val: '83.52', change: '-0.12%', up: false },
  { title: 'Gold (10g)', val: '₹74,200', change: '+1.2%', up: true },
];

export default function Dashboard() {
  const { worker } = useWorker();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState(null);
  const [signals, setSignals] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    if (!worker) return;
    coachAPI.roadmap(worker.id).then(r => setRoadmap(r.data)).catch(() => {});
    signalAPI.top(4).then(r => setSignals(r.data)).catch(() => {});
    credentialAPI.workerCredentials(worker.id).then(r => setEnrollments(r.data)).catch(() => {});
  }, [worker]);

  const statusColor = { onboarding: '#D97706', active: 'var(--brand)', learning: 'var(--accent)', placed: '#059669', paused: 'var(--gray-400)' };
  const statusLabel = { onboarding: 'Onboarding', active: 'Active', learning: 'Learning', placed: 'Placed', paused: 'Paused' };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: 'var(--gray-800)' }}>
          {t('welcomeBack')}, {worker?.name?.split(' ')[0]} 👋
        </h1>
        <p style={{ color: 'var(--gray-600)', marginTop: 4 }}>Here's your career transition overview.</p>
      </div>

      {/* Finance Ticker */}
      <div style={{ background: 'var(--gray-800)', borderRadius: 10, padding: '10px 18px', marginBottom: 20, display: 'flex', gap: 32, overflowX: 'auto', alignItems: 'center' }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', whiteSpace: 'nowrap' }}>📈 Markets</span>
        {FINANCE_HIGHLIGHTS.map(m => (
          <div key={m.title} style={{ display: 'flex', gap: 8, alignItems: 'center', whiteSpace: 'nowrap' }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{m.title}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{m.val}</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: m.up ? '#34D399' : '#F87171' }}>{m.change}</span>
          </div>
        ))}
      </div>

      {/* Status banner */}
      <div style={{
        background: 'var(--brand-light)', border: '1px solid rgba(31,77,140,0.15)',
        borderRadius: 12, padding: '16px 20px', marginBottom: 24,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12
      }}>
        <div>
          <div style={{ fontSize: 13, color: 'var(--brand)', fontWeight: 500 }}>{t('currentStatus')}</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: statusColor[worker?.status] || 'var(--brand)', marginTop: 2 }}>
            {statusLabel[worker?.status] || 'Onboarding'}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 13, color: 'var(--gray-500)' }}>{t('currentRole')}</div>
          <div style={{ fontWeight: 600, color: 'var(--gray-800)' }}>{worker?.current_role || '—'}</div>
        </div>
        <div>
          <div style={{ fontSize: 13, color: 'var(--gray-500)' }}>{t('targetRole')}</div>
          <div style={{ fontWeight: 600, color: 'var(--gray-800)' }}>{worker?.target_role || 'Not set yet'}</div>
        </div>
        {roadmap && (
          <div>
            <div style={{ fontSize: 13, color: 'var(--gray-500)' }}>{t('estSalaryUplift')}</div>
            <div style={{ fontWeight: 700, color: 'var(--accent)', fontSize: 18 }}>
              +₹{((roadmap.estimated_salary_uplift || 0) * 83).toLocaleString('en-IN')}
            </div>
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 28 }}>
        {[
          { icon: MessageCircle, label: t('chatWithCoach'), sub: 'Get personalised guidance', to: '/coach', color: 'var(--brand)', bg: 'var(--brand-light)' },
          { icon: BrainCircuit, label: t('virtualInterview'), sub: 'Practice AI interviews', to: '/tests', color: '#7C3AED', bg: '#F5F3FF' },
          { icon: Briefcase, label: t('topJobs'), sub: 'Naukri, Indeed, Upwork', to: '/jobs', color: '#B45309', bg: '#FFFBEB' },
          { icon: BookOpen, label: t('freeYoutubeCourses'), sub: 'Learn for free', to: '/courses', color: '#FF0000', bg: '#FFF5F5' },
          { icon: Award, label: t('browseCredentials'), sub: `${enrollments.length} enrolled`, to: '/credentials', color: 'var(--accent)', bg: 'var(--accent-light)' },
          { icon: TrendingUp, label: t('skillsSignal'), sub: 'Top demand skills', to: '/signal', color: '#059669', bg: '#ECFDF5' },
        ].map(({ icon: Icon, label, sub, to, color, bg }) => (
          <button key={to} onClick={() => navigate(to)} style={{
            background: bg, border: `1px solid ${color}22`, borderRadius: 12,
            padding: '16px 14px', textAlign: 'left', transition: 'transform 0.15s, box-shadow 0.15s', cursor: 'pointer'
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
            <Icon size={20} color={color} style={{ marginBottom: 8 }} />
            <div style={{ fontWeight: 600, color: 'var(--gray-800)', fontSize: 13 }}>{label}</div>
            <div style={{ fontSize: 11, color: 'var(--gray-500)', marginTop: 2 }}>{sub}</div>
          </button>
        ))}
      </div>

      {/* Finance Sector Spotlight */}
      <div style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #1F4D8C 100%)', borderRadius: 14, padding: '20px 24px', marginBottom: 24, color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px' }}>Sector Spotlight</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>💰 Finance Sector Jobs</h3>
          </div>
          <button onClick={() => navigate('/jobs')} style={{ fontSize: 12, fontWeight: 600, padding: '7px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
            View All
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
          {[
            { role: 'Financial Analyst', company: 'HDFC Bank', sal: '₹8-14 LPA', exp: 'Fresher/Junior' },
            { role: 'Investment Banker', company: 'Morgan Stanley', sal: '₹25-40 LPA', exp: 'Senior' },
            { role: 'Risk Analyst', company: 'ICICI Bank', sal: '₹5-8 LPA', exp: 'Fresher' },
          ].map(j => (
            <div key={j.role} onClick={() => navigate('/jobs')} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: '12px 14px', cursor: 'pointer', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{j.role}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', marginTop: 3 }}>{j.company}</div>
              <div style={{ fontSize: 12, color: '#7DB3F5', fontWeight: 700, marginTop: 6 }}>{j.sal}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{j.exp}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Top skills */}
        <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 12, padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontWeight: 600, fontSize: 15 }}>{t('topInDemandSkills')}</h3>
            <button onClick={() => navigate('/signal')} style={{ fontSize: 12, color: 'var(--brand)', background: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
              See all <ArrowRight size={12} />
            </button>
          </div>
          {signals.length > 0 ? signals.map(s => (
            <div key={s.id} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{s.skill_name}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--brand)' }}>{s.demand_score}/100</span>
              </div>
              <div style={{ height: 6, background: 'var(--gray-100)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${s.demand_score}%`, background: 'var(--brand)', borderRadius: 4, transition: 'width 0.6s ease' }} />
              </div>
              <div style={{ fontSize: 11, color: 'var(--accent)', marginTop: 2 }}>+{s.growth_rate}% YoY growth</div>
            </div>
          )) : (
            // Demo skills when API not available
            [{ name: 'Financial Modeling', score: 94, growth: 18 }, { name: 'Python / Data Science', score: 91, growth: 24 }, { name: 'React / Full Stack', score: 88, growth: 21 }, { name: 'Cloud (AWS/Azure)', score: 85, growth: 19 }].map(s => (
              <div key={s.name} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{s.name}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--brand)' }}>{s.score}/100</span>
                </div>
                <div style={{ height: 6, background: 'var(--gray-100)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${s.score}%`, background: 'var(--brand)', borderRadius: 4 }} />
                </div>
                <div style={{ fontSize: 11, color: 'var(--accent)', marginTop: 2 }}>+{s.growth}% YoY growth</div>
              </div>
            ))
          )}
        </div>

        {/* Roadmap */}
        <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 12, padding: 22 }}>
          <h3 style={{ fontWeight: 600, fontSize: 15, marginBottom: 16 }}>{t('yourAIRoadmap')}</h3>
          {roadmap ? (
            <div>
              <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
                <Chip label={`~${roadmap.estimated_timeline_weeks}w timeline`} color="var(--brand)" />
                <Chip label={`+₹${Math.round(((roadmap.estimated_salary_uplift || 0) * 83) / 100000)}L uplift`} color="var(--accent)" />
              </div>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--gray-600)', marginBottom: 8 }}>Recommended credentials</div>
              {roadmap.recommended_credentials?.slice(0, 3).map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--gray-100)' }}>
                  <CheckCircle size={14} color="var(--accent)" style={{ flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{c.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{c.provider} · {c.weeks}w · {Math.round(c.placement_rate * 100)}% placement</div>
                  </div>
                </div>
              ))}
              <button onClick={() => navigate('/coach')} style={{ marginTop: 14, width: '100%', padding: '10px', borderRadius: 8, background: 'var(--brand)', color: '#fff', fontWeight: 600, fontSize: 13 }}>
                Chat with your coach →
              </button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--gray-400)' }}>
              <MessageCircle size={32} style={{ marginBottom: 10, opacity: 0.4 }} />
              <p style={{ fontSize: 13 }}>Chat with your AI coach to generate a personalised roadmap.</p>
              <button onClick={() => navigate('/coach')} style={{ marginTop: 12, padding: '8px 18px', borderRadius: 8, background: 'var(--brand)', color: '#fff', fontWeight: 600, fontSize: 13 }}>
                Start coaching →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Chip({ label, color }) {
  return (
    <span style={{ fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 20, background: `${color}18`, color }}>
      {label}
    </span>
  );
}
