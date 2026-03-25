import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, MessageCircle, Award, TrendingUp, Building2, Users, LogOut, User, FileText, Briefcase, Shield, Menu, X, BookOpen, BrainCircuit, Globe } from 'lucide-react';
import { useWorker } from '../App';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';

const getWorkerNav = (t) => [
  { to: '/', icon: LayoutDashboard, label: t('dashboard') },
  { to: '/coach', icon: MessageCircle, label: t('aiCoach') },
  { to: '/tests', icon: BrainCircuit, label: t('tests') },
  { to: '/jobs', icon: Briefcase, label: t('jobs') },
  { to: '/courses', icon: BookOpen, label: t('courses') },
  { to: '/credentials', icon: Award, label: t('credentials') },
  { to: '/signal', icon: TrendingUp, label: t('skillsSignal') },
  { to: '/employers', icon: Building2, label: t('employers') },
  { to: '/gigs', icon: Briefcase, label: t('gigMarket') },
  { to: '/isa', icon: FileText, label: t('myISA') },
  { to: '/profile', icon: User, label: t('profile') },
];
const hrNav = [{ to: '/hr', icon: Users, label: 'HR Dashboard' }];
const adminNav = [{ to: '/admin', icon: Shield, label: 'Admin Panel' }];

function LanguageSwitcher() {
  const { lang, setLanguage, languages } = useLanguage();
  const [open, setOpen] = useState(false);
  const current = languages.find(l => l.code === lang);
  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setOpen(!open)} style={{
        display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px',
        borderRadius: 8, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
        color: '#fff', fontSize: 12, fontWeight: 600, width: '100%', cursor: 'pointer',
      }}>
        <Globe size={13} /> {current?.label}
      </button>
      {open && (
        <div style={{
          position: 'absolute', bottom: '110%', left: 0, background: '#fff', border: '1px solid var(--gray-200)',
          borderRadius: 10, padding: 6, boxShadow: '0 8px 24px rgba(0,0,0,0.15)', zIndex: 200, minWidth: 160,
        }}>
          {languages.map(l => (
            <button key={l.code} onClick={() => { setLanguage(l.code); setOpen(false); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '8px 10px',
                borderRadius: 6, background: lang === l.code ? 'var(--brand-light)' : 'transparent',
                color: lang === l.code ? 'var(--brand)' : 'var(--gray-700)', fontSize: 13, fontWeight: lang === l.code ? 600 : 400, border: 'none', cursor: 'pointer',
              }}>
              <span>{l.flag}</span> {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Layout({ children, view }) {
  const { worker, hrCompany, logout } = useWorker();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const nav = view === 'hr' ? hrNav : view === 'admin' ? adminNav : getWorkerNav(t);
  const displayName = worker?.name || hrCompany?.name || 'User';
  const displayRole = worker?.current_role || hrCompany?.industry || '';

  const SidebarContent = () => (
    <>
      <div style={{ padding: '24px 20px 16px' }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', letterSpacing: '-0.5px' }}>
          Pivot<span style={{ color: '#7DB3F5' }}>Path</span>
        </div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 2, letterSpacing: '1px', textTransform: 'uppercase' }}>India's Career Platform</div>
        <div style={{ marginTop: 12, padding: '10px 12px', background: 'rgba(255,255,255,0.1)', borderRadius: 8 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{view === 'hr' ? 'HR Company' : 'Worker'}</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginTop: 2 }}>{displayName}</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 1 }}>{displayRole}</div>
        </div>
      </div>
      <nav style={{ flex: 1, padding: '8px 12px', overflowY: 'auto' }}>
        {nav.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} end={to === '/' || to === '/hr' || to === '/admin'}
            onClick={() => setMobileOpen(false)}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 12px', borderRadius: 8, marginBottom: 2,
              color: isActive ? '#fff' : 'rgba(255,255,255,0.65)',
              background: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
              fontWeight: isActive ? 600 : 400, fontSize: 13, transition: 'all 0.15s'
            })}>
            <Icon size={15} />{label}
          </NavLink>
        ))}
      </nav>
      <div style={{ padding: '12px 12px 24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ marginBottom: 8 }}><LanguageSwitcher /></div>
        {view !== 'hr' && view !== 'admin' && (
          <NavLink to="/hr" onClick={() => setMobileOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 8, marginBottom: 4, color: 'rgba(255,255,255,0.55)', fontSize: 13 }}>
            <Users size={15} /> HR View
          </NavLink>
        )}
        <button onClick={() => { logout(); navigate('/landing'); setMobileOpen(false); }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '9px 12px', borderRadius: 8, background: 'transparent', color: 'rgba(255,255,255,0.55)', fontSize: 13 }}>
          <LogOut size={15} /> {t('signOut')}
        </button>
      </div>
    </>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: 220, background: 'var(--brand)', display: 'flex', flexDirection: 'column', flexShrink: 0, position: 'fixed', height: '100vh', zIndex: 10 }} className="desktop-sidebar">
        <SidebarContent />
      </aside>
      <button onClick={() => setMobileOpen(true)} style={{ display: 'none', position: 'fixed', top: 16, left: 16, zIndex: 20, background: 'var(--brand)', border: 'none', borderRadius: 8, padding: 8, color: '#fff' }} className="mobile-menu-btn">
        <Menu size={20} />
      </button>
      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 30, display: 'flex' }}>
          <div style={{ width: 220, background: 'var(--brand)', display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px 16px 0' }}>
              <button onClick={() => setMobileOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <SidebarContent />
          </div>
          <div style={{ flex: 1, background: 'rgba(0,0,0,0.5)' }} onClick={() => setMobileOpen(false)} />
        </div>
      )}
      <main style={{ marginLeft: 220, flex: 1, padding: '32px 36px', minHeight: '100vh' }} className="main-content">
        {children}
      </main>
      <style>{`
        @media (max-width: 768px) {
          .desktop-sidebar { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .main-content { margin-left: 0 !important; padding: 70px 16px 24px !important; }
        }
      `}</style>
    </div>
  );
}
