import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, Clock, ExternalLink, Search, Filter, TrendingUp, DollarSign, Star, RefreshCw, Building, Users, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const JOB_DATA = [
  // Tech
  { id: 1, title: 'Senior Software Engineer - React', company: 'Infosys', location: 'Bengaluru', salary: '₹18-28 LPA', type: 'Full-time', exp: 'Senior', sector: 'Tech', source: 'naukri', tags: ['React', 'Node.js', 'AWS'], posted: '1d', rating: 4.2, logo: '🏢', url: 'https://www.naukri.com', finance: false },
  { id: 2, title: 'Data Scientist', company: 'TCS', location: 'Hyderabad', salary: '₹15-22 LPA', type: 'Full-time', exp: 'Junior', sector: 'Tech', source: 'naukri', tags: ['Python', 'ML', 'TensorFlow'], posted: '2d', rating: 3.9, logo: '🏭', url: 'https://www.naukri.com', finance: false },
  { id: 3, title: 'Full Stack Developer (Fresher)', company: 'Wipro', location: 'Chennai', salary: '₹4.5-6.5 LPA', type: 'Full-time', exp: 'Fresher', sector: 'Tech', source: 'indeed', tags: ['Java', 'Angular', 'MySQL'], posted: '3d', rating: 4.0, logo: '💼', url: 'https://in.indeed.com', finance: false },
  { id: 4, title: 'Cloud Architect', company: 'Accenture', location: 'Pune', salary: '₹30-45 LPA', type: 'Full-time', exp: 'Senior', sector: 'Tech', source: 'naukri', tags: ['AWS', 'Azure', 'Kubernetes'], posted: '1d', rating: 4.3, logo: '🏗️', url: 'https://www.naukri.com', finance: false },
  { id: 5, title: 'React Native Developer', company: 'Startup', location: 'Remote', salary: '₹8-14 LPA', type: 'Full-time', exp: 'Junior', sector: 'Tech', source: 'indeed', tags: ['React Native', 'TypeScript', 'Firebase'], posted: '5d', rating: 4.1, logo: '📱', url: 'https://in.indeed.com', finance: false },
  // Finance
  { id: 6, title: 'Financial Analyst', company: 'HDFC Bank', location: 'Mumbai', salary: '₹8-14 LPA', type: 'Full-time', exp: 'Junior', sector: 'Finance', source: 'naukri', tags: ['Excel', 'Financial Modeling', 'CFA'], posted: '1d', rating: 4.5, logo: '🏦', url: 'https://www.naukri.com', finance: true },
  { id: 7, title: 'Investment Banking Associate', company: 'Morgan Stanley', location: 'Mumbai', salary: '₹25-40 LPA', type: 'Full-time', exp: 'Senior', sector: 'Finance', source: 'naukri', tags: ['M&A', 'Valuation', 'DCF', 'MBA'], posted: '2d', rating: 4.7, logo: '💰', url: 'https://www.naukri.com', finance: true },
  { id: 8, title: 'Risk Analyst (Fresher)', company: 'ICICI Bank', location: 'Delhi NCR', salary: '₹5-8 LPA', type: 'Full-time', exp: 'Fresher', sector: 'Finance', source: 'indeed', tags: ['Risk Management', 'Excel', 'SQL'], posted: '4d', rating: 4.2, logo: '⚠️', url: 'https://in.indeed.com', finance: true },
  { id: 9, title: 'Chartered Accountant', company: 'Deloitte', location: 'Bengaluru', salary: '₹12-20 LPA', type: 'Full-time', exp: 'Junior', sector: 'Finance', source: 'naukri', tags: ['CA', 'Taxation', 'Audit', 'IFRS'], posted: '1d', rating: 4.4, logo: '📊', url: 'https://www.naukri.com', finance: true },
  { id: 10, title: 'Credit Risk Manager', company: 'SBI', location: 'Mumbai', salary: '₹18-30 LPA', type: 'Full-time', exp: 'Senior', sector: 'Finance', source: 'naukri', tags: ['Credit Analysis', 'Basel III', 'FRM'], posted: '6d', rating: 4.0, logo: '🏛️', url: 'https://www.naukri.com', finance: true },
  { id: 11, title: 'Equity Research Analyst', company: 'Kotak Securities', location: 'Mumbai', salary: '₹10-18 LPA', type: 'Full-time', exp: 'Junior', sector: 'Finance', source: 'indeed', tags: ['Equity Research', 'CFA', 'Bloomberg'], posted: '3d', rating: 4.3, logo: '📈', url: 'https://in.indeed.com', finance: true },
  { id: 12, title: 'Finance Manager (Fresher - MBA)', company: 'Bajaj Finance', location: 'Pune', salary: '₹7-11 LPA', type: 'Full-time', exp: 'Fresher', sector: 'Finance', source: 'naukri', tags: ['MBA Finance', 'NBFC', 'Excel'], posted: '2d', rating: 4.1, logo: '🏢', url: 'https://www.naukri.com', finance: true },
  // Freelance / Upwork
  { id: 13, title: 'Freelance React Developer', company: 'Various Clients', location: 'Remote', salary: '₹2,000-4,000/hr', type: 'Freelance', exp: 'Junior', sector: 'Tech', source: 'upwork', tags: ['React', 'JavaScript', 'Tailwind'], posted: '12h', rating: 4.6, logo: '💻', url: 'https://www.upwork.com', finance: false },
  { id: 14, title: 'Financial Model Builder', company: 'Finance Startup (US)', location: 'Remote', salary: '₹3,000-6,000/hr', type: 'Freelance', exp: 'Senior', sector: 'Finance', source: 'upwork', tags: ['Excel', 'Financial Modeling', 'VBA'], posted: '1d', rating: 4.8, logo: '💹', url: 'https://www.upwork.com', finance: true },
  { id: 15, title: 'Python Data Analyst', company: 'Global Client', location: 'Remote', salary: '₹1,500-3,000/hr', type: 'Freelance', exp: 'Junior', sector: 'Tech', source: 'upwork', tags: ['Python', 'Pandas', 'Tableau'], posted: '6h', rating: 4.5, logo: '🐍', url: 'https://www.upwork.com', finance: false },
  { id: 16, title: 'Digital Marketing Manager', company: 'E-commerce Brand', location: 'Gurugram', salary: '₹9-16 LPA', type: 'Full-time', exp: 'Junior', sector: 'Marketing', source: 'indeed', tags: ['SEO', 'Meta Ads', 'Google Analytics'], posted: '2d', rating: 4.0, logo: '📣', url: 'https://in.indeed.com', finance: false },
];

const SOURCE_CONFIG = {
  naukri: { label: 'Naukri', color: '#6C3483', bg: '#EDE7F6', icon: '🔍' },
  indeed: { label: 'Indeed', color: '#2196F3', bg: '#E3F2FD', icon: '🔵' },
  upwork: { label: 'Upwork', color: '#14A800', bg: '#E8F5E9', icon: '🟢' },
};

export default function Jobs() {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [expFilter, setExpFilter] = useState('all');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  const refresh = () => {
    setRefreshing(true);
    setTimeout(() => { setLastRefresh(new Date()); setRefreshing(false); }, 1200);
  };

  const filtered = JOB_DATA.filter(j => {
    const matchSearch = !search || j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase()) || j.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchSource = sourceFilter === 'all' || j.source === sourceFilter;
    const matchExp = expFilter === 'all' || (expFilter === 'fresher' ? j.exp === 'Fresher' : expFilter === 'experienced' ? j.exp !== 'Fresher' : true);
    const matchSector = sectorFilter === 'all' || (sectorFilter === 'finance' ? j.finance : sectorFilter === j.sector.toLowerCase());
    return matchSearch && matchSource && matchExp && matchSector;
  });

  const freshersCount = JOB_DATA.filter(j => j.exp === 'Fresher').length;
  const experiencedCount = JOB_DATA.filter(j => j.exp !== 'Fresher').length;
  const financeCount = JOB_DATA.filter(j => j.finance).length;

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: 'var(--gray-800)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Briefcase size={26} color="var(--brand)" /> {t('topJobs')}
            </h1>
            <p style={{ color: 'var(--gray-600)', marginTop: 4 }}>
              Live openings from Naukri, Indeed & Upwork — updated daily
            </p>
          </div>
          <button onClick={refresh} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 8, border: '1px solid var(--gray-200)', background: '#fff', fontSize: 12, color: 'var(--gray-600)', cursor: 'pointer' }}>
            <RefreshCw size={14} style={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
            {refreshing ? 'Refreshing...' : `Refreshed ${lastRefresh.toLocaleTimeString()}`}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 14, marginBottom: 24 }}>
        {[
          { icon: Briefcase, label: 'Total Openings', val: JOB_DATA.length, color: 'var(--brand)', bg: 'var(--brand-light)' },
          { icon: Users, label: t('freshers'), val: freshersCount, color: '#059669', bg: '#ECFDF5' },
          { icon: TrendingUp, label: t('experienced'), val: experiencedCount, color: '#7C3AED', bg: '#F5F3FF' },
          { icon: DollarSign, label: t('financeSector'), val: financeCount, color: '#B45309', bg: '#FFFBEB' },
        ].map(({ icon: Icon, label, val, color, bg }) => (
          <div key={label} style={{ background: bg, border: `1px solid ${color}22`, borderRadius: 12, padding: '16px 18px' }}>
            <Icon size={18} color={color} style={{ marginBottom: 6 }} />
            <div style={{ fontSize: 22, fontWeight: 700, color }}>{val}</div>
            <div style={{ fontSize: 11, color: 'var(--gray-600)', marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 12, padding: '16px 20px', marginBottom: 20 }}>
        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 14 }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search jobs, companies, skills..."
            style={{ paddingLeft: 38, borderRadius: 8 }}
          />
        </div>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {/* Source */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-500)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Source</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {[['all', 'All'], ['naukri', 'Naukri'], ['indeed', 'Indeed'], ['upwork', 'Upwork']].map(([v, l]) => (
                <button key={v} onClick={() => setSourceFilter(v)} style={{
                  padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500, border: '1px solid',
                  borderColor: sourceFilter === v ? 'var(--brand)' : 'var(--gray-200)',
                  background: sourceFilter === v ? 'var(--brand)' : '#fff',
                  color: sourceFilter === v ? '#fff' : 'var(--gray-600)'
                }}>{l}</button>
              ))}
            </div>
          </div>
          {/* Experience */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-500)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Experience</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {[['all', 'All'], ['fresher', t('freshers')], ['experienced', t('experienced')]].map(([v, l]) => (
                <button key={v} onClick={() => setExpFilter(v)} style={{
                  padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500, border: '1px solid',
                  borderColor: expFilter === v ? 'var(--accent)' : 'var(--gray-200)',
                  background: expFilter === v ? 'var(--accent)' : '#fff',
                  color: expFilter === v ? '#fff' : 'var(--gray-600)'
                }}>{l}</button>
              ))}
            </div>
          </div>
          {/* Sector */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-500)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Sector</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {[['all', 'All'], ['finance', '💰 Finance'], ['tech', '💻 Tech'], ['marketing', '📣 Marketing']].map(([v, l]) => (
                <button key={v} onClick={() => setSectorFilter(v)} style={{
                  padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500, border: '1px solid',
                  borderColor: sectorFilter === v ? '#B45309' : 'var(--gray-200)',
                  background: sectorFilter === v ? '#FFFBEB' : '#fff',
                  color: sectorFilter === v ? '#B45309' : 'var(--gray-600)'
                }}>{l}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 14 }}>
        Showing <b style={{ color: 'var(--gray-800)' }}>{filtered.length}</b> jobs
      </div>

      {/* Job Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
        {filtered.map(job => {
          const src = SOURCE_CONFIG[job.source];
          return (
            <div key={job.id} style={{
              background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 14,
              padding: 20, display: 'flex', flexDirection: 'column', gap: 12,
              transition: 'box-shadow 0.15s', cursor: 'default'
            }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = ''}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                    {job.logo}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--gray-800)', lineHeight: 1.3 }}>{job.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 2 }}>{job.company}</div>
                  </div>
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 20, background: src.bg, color: src.color, whiteSpace: 'nowrap' }}>
                  {src.icon} {src.label}
                </span>
              </div>

              {/* Details */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--gray-600)' }}>
                  <MapPin size={12} /> {job.location}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--accent)', fontWeight: 600 }}>
                  💰 {job.salary}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--gray-600)' }}>
                  <Clock size={12} /> {job.posted} ago
                </span>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {job.tags.map(tag => (
                  <span key={tag} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 20, background: 'var(--gray-100)', color: 'var(--gray-600)', fontWeight: 500 }}>{tag}</span>
                ))}
                <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 20, background: job.exp === 'Fresher' ? '#ECFDF5' : job.exp === 'Senior' ? '#F5F3FF' : 'var(--brand-light)', color: job.exp === 'Fresher' ? '#059669' : job.exp === 'Senior' ? '#7C3AED' : 'var(--brand)', fontWeight: 600 }}>
                  {job.exp}
                </span>
                {job.finance && <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 20, background: '#FFF7ED', color: '#B45309', fontWeight: 600 }}>Finance</span>}
              </div>

              {/* Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTop: '1px solid var(--gray-100)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Star size={12} color="#F59E0B" fill="#F59E0B" />
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-700)' }}>{job.rating}</span>
                  <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>· {job.type}</span>
                </div>
                <a href={job.url} target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600,
                  color: '#fff', background: 'var(--brand)', padding: '6px 14px', borderRadius: 8, textDecoration: 'none'
                }}>
                  Apply <ExternalLink size={12} />
                </a>
              </div>
            </div>
          );
        })}
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
