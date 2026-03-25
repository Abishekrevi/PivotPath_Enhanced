import React, { useState } from 'react';
import { Youtube, Award, Clock, Star, ExternalLink, Search, BookOpen, DollarSign, Zap, Filter } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const YOUTUBE_COURSES = [
  { id: 'yt1', title: 'Complete Python for Data Science', channel: 'freeCodeCamp', duration: '12 hrs', views: '4.2M', rating: 4.8, thumbnail: 'https://img.youtube.com/vi/LHBE0uBOeaE/hqdefault.jpg', url: 'https://www.youtube.com/watch?v=LHBE0uBOeaE', tags: ['Python', 'Data Science', 'ML'], sector: 'Tech', level: 'Beginner' },
  { id: 'yt2', title: 'React Full Course 2024', channel: 'Traversy Media', duration: '9 hrs', views: '2.8M', rating: 4.7, thumbnail: 'https://img.youtube.com/vi/LDB4uaJ87e0/hqdefault.jpg', url: 'https://www.youtube.com/watch?v=LDB4uaJ87e0', tags: ['React', 'JavaScript', 'Frontend'], sector: 'Tech', level: 'Intermediate' },
  { id: 'yt3', title: 'Financial Analysis & Modeling', channel: 'Corporate Finance Institute', duration: '6 hrs', views: '1.5M', rating: 4.6, thumbnail: 'https://img.youtube.com/vi/wjqnhYPMBaE/hqdefault.jpg', url: 'https://www.youtube.com/watch?v=wjqnhYPMBaE', tags: ['Finance', 'Excel', 'Modeling'], sector: 'Finance', level: 'Intermediate' },
  { id: 'yt4', title: 'Investment Banking Full Course', channel: 'Niti Kishore', duration: '8 hrs', views: '980K', rating: 4.5, thumbnail: 'https://img.youtube.com/vi/8IFy2KiQHj0/hqdefault.jpg', url: 'https://www.youtube.com/results?search_query=investment+banking+full+course', tags: ['Investment Banking', 'Valuation', 'M&A'], sector: 'Finance', level: 'Advanced' },
  { id: 'yt5', title: 'Machine Learning A-Z', channel: 'Krish Naik', duration: '15 hrs', views: '3.1M', rating: 4.8, thumbnail: 'https://img.youtube.com/vi/GwIo3gDZCVQ/hqdefault.jpg', url: 'https://www.youtube.com/watch?v=GwIo3gDZCVQ', tags: ['ML', 'Python', 'AI'], sector: 'Tech', level: 'Intermediate' },
  { id: 'yt6', title: 'Stock Market for Beginners', channel: 'CA Rachana Phadke', duration: '5 hrs', views: '2.4M', rating: 4.7, thumbnail: 'https://img.youtube.com/vi/cBj9BFbSuAQ/hqdefault.jpg', url: 'https://www.youtube.com/watch?v=cBj9BFbSuAQ', tags: ['Stock Market', 'Investing', 'Finance'], sector: 'Finance', level: 'Beginner' },
  { id: 'yt7', title: 'AWS Cloud Practitioner 2024', channel: 'freeCodeCamp', duration: '11 hrs', views: '2.1M', rating: 4.6, thumbnail: 'https://img.youtube.com/vi/SOTamWNgDKc/hqdefault.jpg', url: 'https://www.youtube.com/watch?v=SOTamWNgDKc', tags: ['AWS', 'Cloud', 'DevOps'], sector: 'Tech', level: 'Beginner' },
  { id: 'yt8', title: 'Accounting & GST in India', channel: 'Accounts Adda', duration: '7 hrs', views: '890K', rating: 4.5, thumbnail: 'https://img.youtube.com/vi/gO1PPfR3o5Q/hqdefault.jpg', url: 'https://www.youtube.com/results?search_query=GST+accounting+india+full+course', tags: ['GST', 'Accounting', 'Tally'], sector: 'Finance', level: 'Beginner' },
  { id: 'yt9', title: 'Digital Marketing Complete Course', channel: 'Simplilearn', duration: '10 hrs', views: '1.7M', rating: 4.4, thumbnail: 'https://img.youtube.com/vi/nU-IIXBWlS4/hqdefault.jpg', url: 'https://www.youtube.com/watch?v=nU-IIXBWlS4', tags: ['Digital Marketing', 'SEO', 'Google Ads'], sector: 'Marketing', level: 'Beginner' },
  { id: 'yt10', title: 'SQL for Data Analysis', channel: 'Alex The Analyst', duration: '4 hrs', views: '1.2M', rating: 4.7, thumbnail: 'https://img.youtube.com/vi/OT1RErkfLNQ/hqdefault.jpg', url: 'https://www.youtube.com/watch?v=OT1RErkfLNQ', tags: ['SQL', 'Database', 'Analytics'], sector: 'Tech', level: 'Beginner' },
  { id: 'yt11', title: 'Risk Management in Banking', channel: 'FinanceWalk', duration: '4 hrs', views: '560K', rating: 4.5, thumbnail: 'https://img.youtube.com/vi/ZWFNTj5cZ7M/hqdefault.jpg', url: 'https://www.youtube.com/results?search_query=risk+management+banking+course', tags: ['Risk', 'Banking', 'Basel III'], sector: 'Finance', level: 'Intermediate' },
  { id: 'yt12', title: 'Excel for Finance & Accounting', channel: 'Leila Gharani', duration: '6 hrs', views: '1.8M', rating: 4.8, thumbnail: 'https://img.youtube.com/vi/7kCx09hbKZk/hqdefault.jpg', url: 'https://www.youtube.com/watch?v=7kCx09hbKZk', tags: ['Excel', 'Finance', 'Accounting'], sector: 'Finance', level: 'Beginner' },
];

const PAID_COURSES = [
  { id: 'p1', title: 'CFA Level 1 Complete Prep', provider: 'Udemy', price: '₹499', originalPrice: '₹3,499', rating: 4.7, students: '45K', duration: '80 hrs', tags: ['CFA', 'Finance', 'Investment'], sector: 'Finance', badge: 'Bestseller', url: 'https://www.udemy.com' },
  { id: 'p2', title: 'Full Stack Web Development Bootcamp', provider: 'Coursera', price: '₹799/mo', originalPrice: '₹2,999/mo', rating: 4.8, students: '120K', duration: '6 months', tags: ['React', 'Node', 'MongoDB'], sector: 'Tech', badge: 'Top Rated', url: 'https://www.coursera.org' },
  { id: 'p3', title: 'MBA Essentials in Finance', provider: 'upGrad', price: '₹1,499/mo', originalPrice: '₹4,999/mo', rating: 4.6, students: '28K', duration: '4 months', tags: ['MBA', 'Finance', 'Management'], sector: 'Finance', badge: 'EMI Available', url: 'https://www.upgrad.com' },
  { id: 'p4', title: 'Data Science & ML with Python', provider: 'Great Learning', price: '₹999/mo', originalPrice: '₹3,999/mo', rating: 4.7, students: '65K', duration: '5 months', tags: ['Python', 'ML', 'AI'], sector: 'Tech', badge: 'Job Guarantee', url: 'https://www.greatlearning.in' },
  { id: 'p5', title: 'FRM Part 1 — Risk Management', provider: 'Udemy', price: '₹449', originalPrice: '₹2,999', rating: 4.5, students: '22K', duration: '40 hrs', tags: ['FRM', 'Risk', 'Finance'], sector: 'Finance', badge: 'New', url: 'https://www.udemy.com' },
  { id: 'p6', title: 'AWS Solutions Architect', provider: 'Whizlabs', price: '₹1,299', originalPrice: '₹4,999', rating: 4.8, students: '88K', duration: '30 hrs', tags: ['AWS', 'Cloud', 'Certification'], sector: 'Tech', badge: 'Certification', url: 'https://www.whizlabs.com' },
];

const LEVEL_COLORS = {
  Beginner: { color: '#059669', bg: '#ECFDF5' },
  Intermediate: { color: '#2563EB', bg: '#EFF6FF' },
  Advanced: { color: '#7C3AED', bg: '#F5F3FF' },
};

export default function Courses() {
  const { t } = useLanguage();
  const [tab, setTab] = useState('youtube');
  const [search, setSearch] = useState('');
  const [sectorFilter, setSectorFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All');

  const sectors = ['All', 'Tech', 'Finance', 'Marketing'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredYT = YOUTUBE_COURSES.filter(c => {
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchSector = sectorFilter === 'All' || c.sector === sectorFilter;
    const matchLevel = levelFilter === 'All' || c.level === levelFilter;
    return matchSearch && matchSector && matchLevel;
  });

  const filteredPaid = PAID_COURSES.filter(c => {
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchSector = sectorFilter === 'All' || c.sector === sectorFilter;
    return matchSearch && matchSector;
  });

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: 'var(--gray-800)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <BookOpen size={26} color="var(--brand)" /> {t('courses')}
        </h1>
        <p style={{ color: 'var(--gray-600)', marginTop: 4 }}>
          Free YouTube courses + top paid platforms — all in one place
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 24, background: 'var(--gray-100)', borderRadius: 10, padding: 4, width: 'fit-content' }}>
        {[
          { id: 'youtube', icon: <Youtube size={15} />, label: `${t('freeYoutubeCourses')} (${YOUTUBE_COURSES.length})` },
          { id: 'paid', icon: <Award size={15} />, label: `Paid Courses (${PAID_COURSES.length})` },
        ].map(({ id, icon, label }) => (
          <button key={id} onClick={() => setTab(id)} style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '8px 18px', borderRadius: 8,
            fontSize: 13, fontWeight: 600, border: 'none', transition: 'all 0.15s',
            background: tab === id ? '#fff' : 'transparent',
            color: tab === id ? (id === 'youtube' ? '#FF0000' : 'var(--brand)') : 'var(--gray-600)',
            boxShadow: tab === id ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
          }}>{icon} {label}</button>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 14, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1', minWidth: 200 }}>
          <Search size={15} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search courses, skills..." style={{ paddingLeft: 34, borderRadius: 8 }} />
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {sectors.map(s => (
            <button key={s} onClick={() => setSectorFilter(s)} style={{
              padding: '6px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500, border: '1px solid',
              borderColor: sectorFilter === s ? 'var(--brand)' : 'var(--gray-200)',
              background: sectorFilter === s ? 'var(--brand)' : '#fff',
              color: sectorFilter === s ? '#fff' : 'var(--gray-600)'
            }}>{s}</button>
          ))}
        </div>
        {tab === 'youtube' && (
          <div style={{ display: 'flex', gap: 6 }}>
            {levels.map(l => (
              <button key={l} onClick={() => setLevelFilter(l)} style={{
                padding: '6px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500, border: '1px solid',
                borderColor: levelFilter === l ? 'var(--accent)' : 'var(--gray-200)',
                background: levelFilter === l ? 'var(--accent)' : '#fff',
                color: levelFilter === l ? '#fff' : 'var(--gray-600)'
              }}>{l}</button>
            ))}
          </div>
        )}
      </div>

      {/* YouTube Courses */}
      {tab === 'youtube' && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Youtube size={18} color="#FF0000" />
            <span style={{ fontWeight: 600, color: 'var(--gray-700)' }}>Free YouTube Courses</span>
            <span style={{ fontSize: 12, padding: '2px 8px', borderRadius: 12, background: '#FFE4E4', color: '#FF0000', fontWeight: 600 }}>100% FREE</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 18 }}>
            {filteredYT.map(course => {
              const lvl = LEVEL_COLORS[course.level] || LEVEL_COLORS.Beginner;
              return (
                <div key={course.id} style={{
                  background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 14,
                  overflow: 'hidden', transition: 'box-shadow 0.15s, transform 0.15s'
                }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.transform = ''; }}>
                  {/* Thumbnail */}
                  <div style={{ position: 'relative', paddingTop: '56.25%', background: '#000', overflow: 'hidden' }}>
                    <img src={course.thumbnail} alt={course.title} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none'; }} />
                    <div style={{ position: 'absolute', bottom: 8, right: 8, background: 'rgba(0,0,0,0.8)', color: '#fff', fontSize: 11, padding: '2px 8px', borderRadius: 4, fontWeight: 600 }}>
                      {course.duration}
                    </div>
                    <div style={{ position: 'absolute', top: 8, left: 8, background: '#FF0000', color: '#fff', fontSize: 10, padding: '2px 8px', borderRadius: 4, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Youtube size={10} /> FREE
                    </div>
                  </div>

                  <div style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--gray-800)', lineHeight: 1.4, marginBottom: 6 }}>{course.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--gray-500)', marginBottom: 10 }}>{course.channel}</div>
                    <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 12, background: lvl.bg, color: lvl.color, fontWeight: 600 }}>{course.level}</span>
                      {course.tags.slice(0, 2).map(tag => (
                        <span key={tag} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 12, background: 'var(--gray-100)', color: 'var(--gray-600)' }}>{tag}</span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Star size={12} color="#F59E0B" fill="#F59E0B" />
                        <span style={{ fontSize: 12, fontWeight: 600 }}>{course.rating}</span>
                        <span style={{ fontSize: 11, color: 'var(--gray-400)' }}>{course.views} views</span>
                      </div>
                      <a href={course.url} target="_blank" rel="noopener noreferrer" style={{
                        display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600,
                        color: '#fff', background: '#FF0000', padding: '6px 12px', borderRadius: 8, textDecoration: 'none'
                      }}>
                        <Youtube size={12} /> Watch
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Paid Courses */}
      {tab === 'paid' && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Award size={18} color="var(--brand)" />
            <span style={{ fontWeight: 600, color: 'var(--gray-700)' }}>Premium Courses (INR Pricing)</span>
            <span style={{ fontSize: 12, padding: '2px 8px', borderRadius: 12, background: 'var(--accent-light)', color: 'var(--accent)', fontWeight: 600 }}>All prices in ₹</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 18 }}>
            {filteredPaid.map(course => (
              <div key={course.id} style={{
                background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 14, padding: 20,
                display: 'flex', flexDirection: 'column', gap: 12, transition: 'box-shadow 0.15s'
              }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = ''}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--gray-800)', lineHeight: 1.4 }}>{course.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 3 }}>{course.provider} · {course.duration}</div>
                  </div>
                  {course.badge && (
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 20, background: 'var(--accent-light)', color: 'var(--accent)', whiteSpace: 'nowrap' }}>
                      {course.badge}
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {course.tags.map(tag => (
                    <span key={tag} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 12, background: 'var(--gray-100)', color: 'var(--gray-600)' }}>{tag}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <Star size={13} color="#F59E0B" fill="#F59E0B" />
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{course.rating}</span>
                  <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>({course.students} students)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTop: '1px solid var(--gray-100)' }}>
                  <div>
                    <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--accent)' }}>{course.price}</span>
                    <span style={{ fontSize: 12, color: 'var(--gray-400)', textDecoration: 'line-through', marginLeft: 8 }}>{course.originalPrice}</span>
                  </div>
                  <a href={course.url} target="_blank" rel="noopener noreferrer" style={{
                    display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600,
                    color: '#fff', background: 'var(--brand)', padding: '8px 16px', borderRadius: 8, textDecoration: 'none'
                  }}>
                    Enroll <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
