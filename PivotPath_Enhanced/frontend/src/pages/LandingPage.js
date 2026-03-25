import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Award, Building2, MessageCircle, CheckCircle, ArrowRight, Briefcase, BookOpen, BrainCircuit, Globe, DollarSign, Star } from 'lucide-react';
import { LANGUAGES, TRANSLATIONS } from '../context/LanguageContext';

export default function LandingPage() {
  const navigate = useNavigate();
  const [lang, setLang] = useState('en');
  const [langOpen, setLangOpen] = useState(false);
  const t = (key) => TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en']?.[key] || key;
  const currentLang = LANGUAGES.find(l => l.code === lang);

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', color: '#1F2937' }}>

      {/* Nav */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 60px', background: '#fff', borderBottom: '1px solid #E5E7EB', position: 'sticky', top: 0, zIndex: 100 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#1F4D8C' }}>Pivot<span style={{ color: '#2D9B6F' }}>Path</span></div>
          <div style={{ fontSize: 10, color: '#9CA3AF', letterSpacing: '1px', textTransform: 'uppercase' }}>India's Career Platform</div>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {/* Language Switcher */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setLangOpen(!langOpen)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px', borderRadius: 8, border: '1px solid #E5E7EB', background: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: '#1F4D8C' }}>
              <Globe size={14} /> {currentLang?.label}
            </button>
            {langOpen && (
              <div style={{ position: 'absolute', top: '110%', right: 0, background: '#fff', border: '1px solid #E5E7EB', borderRadius: 10, padding: 6, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', zIndex: 200, minWidth: 160 }}>
                {LANGUAGES.map(l => (
                  <button key={l.code} onClick={() => { setLang(l.code); setLangOpen(false); }}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '8px 10px', borderRadius: 6, background: lang === l.code ? '#E8EEFA' : 'transparent', color: lang === l.code ? '#1F4D8C' : '#374151', fontSize: 13, fontWeight: lang === l.code ? 600 : 400, border: 'none', cursor: 'pointer' }}>
                    {l.flag} {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button onClick={() => navigate('/login')} style={{ padding: '9px 20px', borderRadius: 8, border: '1px solid #E5E7EB', background: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>Sign in</button>
          <button onClick={() => navigate('/onboarding')} style={{ padding: '9px 20px', borderRadius: 8, border: 'none', background: '#1F4D8C', color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>Get started free</button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #1F4D8C 0%, #2B5FAA 100%)', padding: '90px 60px', textAlign: 'center', color: '#fff' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 24, flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: '5px 14px', fontSize: 12, fontWeight: 600 }}>🇮🇳 Made for India</span>
            <span style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: '5px 14px', fontSize: 12, fontWeight: 600 }}>💼 LinkedIn + LinkedIn Learning</span>
            <span style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: '5px 14px', fontSize: 12, fontWeight: 600 }}>🎯 AI-Powered</span>
          </div>
          <h1 style={{ fontSize: 52, fontWeight: 800, lineHeight: 1.15, marginBottom: 20, letterSpacing: '-1px' }}>
            Your Career. Your Language.<br />Your Future.
          </h1>
          <p style={{ fontSize: 18, opacity: 0.88, lineHeight: 1.75, marginBottom: 40, maxWidth: 600, margin: '0 auto 40px' }}>
            PivotPath is India's AI-powered career platform — AI interviews, free courses, live jobs from Naukri & Indeed, and finance sector opportunities. Available in 6 Indian languages.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/onboarding')} style={{ padding: '14px 32px', borderRadius: 10, border: 'none', background: '#2D9B6F', color: '#fff', fontWeight: 700, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
              {t('startInterview')} <ArrowRight size={18} />
            </button>
            <button onClick={() => navigate('/hr')} style={{ padding: '14px 32px', borderRadius: 10, border: '2px solid rgba(255,255,255,0.4)', background: 'transparent', color: '#fff', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
              For Employers →
            </button>
          </div>
        </div>
      </section>

      {/* Language showcase */}
      <section style={{ background: '#F9FAFB', padding: '32px 60px', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#6B7280' }}>Available in:</span>
          {LANGUAGES.map(l => (
            <button key={l.code} onClick={() => setLang(l.code)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 20, border: '1px solid', borderColor: lang === l.code ? '#1F4D8C' : '#E5E7EB', background: lang === l.code ? '#E8EEFA' : '#fff', color: lang === l.code ? '#1F4D8C' : '#374151', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
              {l.flag} {l.label}
            </button>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '60px', background: '#fff', display: 'flex', justifyContent: 'center', gap: 60, flexWrap: 'wrap' }}>
        {[
          ['₹40,000+', 'Average salary uplift after transition'],
          ['70%+', 'Placement rate for programme graduates'],
          ['16+', 'Live job openings (Naukri, Indeed, Upwork)'],
          ['6 Languages', 'English, Hindi, Tamil, Telugu & more'],
        ].map(([stat, label]) => (
          <div key={stat} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: '#1F4D8C' }}>{stat}</div>
            <div style={{ fontSize: 14, color: '#6B7280', marginTop: 6, maxWidth: 160 }}>{label}</div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section style={{ padding: '80px 60px', maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ fontSize: 36, fontWeight: 800, textAlign: 'center', marginBottom: 14 }}>Everything in one platform</h2>
        <p style={{ textAlign: 'center', color: '#6B7280', fontSize: 16, marginBottom: 56 }}>LinkedIn + LinkedIn Learning + Naukri + YouTube — all rolled into one</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
          {[
            { icon: BrainCircuit, color: '#7C3AED', bg: '#F5F3FF', title: t('virtualInterview'), desc: 'AI-powered mock interviews with real-time scoring and feedback for 10+ roles.' },
            { icon: Briefcase, color: '#B45309', bg: '#FFFBEB', title: t('topJobs'), desc: 'Live job openings pulled from Naukri, Indeed & Upwork — freshers & experienced.' },
            { icon: BookOpen, color: '#FF0000', bg: '#FFF5F5', title: t('freeYoutubeCourses'), desc: 'Free YouTube courses + paid platforms. Finance, Tech, Marketing — in ₹ pricing.' },
            { icon: MessageCircle, color: '#1F4D8C', bg: '#E8EEFA', title: t('aiCoach'), desc: 'Alex builds your personalised roadmap tied to real employer demand — not generic advice.' },
            { icon: TrendingUp, color: '#059669', bg: '#ECFDF5', title: t('skillsSignal'), desc: 'Real-time data on which skills employers are hiring for in the next 3–5 years.' },
            { icon: DollarSign, color: '#D97706', bg: '#FFFBEB', title: t('financeSector'), desc: 'Dedicated finance jobs, courses and career paths — CA, CFA, FRM, Investment Banking.' },
          ].map(({ icon: Icon, color, bg, title, desc }) => (
            <div key={title} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 14, padding: 26 }}>
              <div style={{ width: 46, height: 46, borderRadius: 12, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                <Icon size={22} color={color} />
              </div>
              <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{title}</h3>
              <p style={{ color: '#6B7280', fontSize: 14, lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Finance Sector Section */}
      <section style={{ padding: '80px 60px', background: 'linear-gradient(135deg, #1a3a5c 0%, #1F4D8C 100%)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', color: '#fff' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 12 }}>Finance Sector</div>
            <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 14 }}>India's Finance Jobs & Courses</h2>
            <p style={{ fontSize: 16, opacity: 0.8, maxWidth: 500, margin: '0 auto' }}>From CA to Investment Banking — complete career paths with ₹ salary benchmarks</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { role: 'Financial Analyst', sal: '₹8–22 LPA', src: 'HDFC, Deloitte' },
              { role: 'Investment Banker', sal: '₹25–50+ LPA', src: 'Morgan Stanley, JPMorgan' },
              { role: 'Chartered Accountant', sal: '₹12–30 LPA', src: 'Big 4, Banks' },
              { role: 'Risk Manager', sal: '₹15–35 LPA', src: 'SBI, ICICI' },
            ].map(j => (
              <div key={j.role} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: '18px 16px', border: '1px solid rgba(255,255,255,0.15)' }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{j.role}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#7DB3F5', marginTop: 8 }}>{j.sal}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 4 }}>{j.src}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 60px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 40, fontWeight: 800, marginBottom: 16 }}>Ready to pivot your career?</h2>
        <p style={{ color: '#6B7280', fontSize: 17, marginBottom: 36 }}>Join thousands of professionals upskilling on PivotPath — India's most complete career platform</p>
        <button onClick={() => navigate('/onboarding')} style={{ padding: '16px 40px', borderRadius: 12, background: '#1F4D8C', color: '#fff', fontWeight: 700, fontSize: 17, display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer', border: 'none' }}>
          Start for Free <ArrowRight size={20} />
        </button>
      </section>

      {/* Footer */}
      <footer style={{ background: '#1F2937', color: 'rgba(255,255,255,0.6)', padding: '32px 60px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>Pivot<span style={{ color: '#2D9B6F' }}>Path</span></div>
          <div style={{ fontSize: 12, marginTop: 4 }}>India's Career Upskilling Platform</div>
        </div>
        <div style={{ fontSize: 12 }}>
          Serving professionals across India in English, हिन्दी, தமிழ், తెలుగు, മലയാളം, ಕನ್ನಡ
        </div>
        <div style={{ fontSize: 12 }}>© 2025 PivotPath. All rights reserved.</div>
      </footer>
    </div>
  );
}
