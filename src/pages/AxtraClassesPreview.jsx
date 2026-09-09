import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, Clock, Users } from 'lucide-react';
import { createPageUrl } from '@/utils';
import { useApiCollection } from '@/hooks/useApiCollection';

export default function AxtraClassesPreview() {
  const { data: lessons, loading, error } = useApiCollection('lessons');
  const scrollerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root || !lessons.length) return;
    const slides = [...root.querySelectorAll('[data-class-slide]')];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveIndex(Number(entry.target.dataset.index));
      });
    }, { root, threshold: 0.58 });
    slides.forEach(slide => observer.observe(slide));
    return () => observer.disconnect();
  }, [lessons]);

  const goTo = index => {
    scrollerRef.current?.querySelector(`[data-index="${index}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (loading) return <div className="min-h-[70vh] grid place-items-center bg-[#090909] text-white">טוען שיעורים...</div>;
  if (error) return <div className="min-h-[70vh] grid place-items-center bg-[#090909] text-red-300">{error}</div>;

  return (
    <div className="book-shell">
      <style>{`
        .book-shell{background:#090909;color:#f1eee8;min-height:100vh;position:relative;overflow:hidden}
        .book-scroller{height:calc(100vh - 86px);overflow-y:auto;scroll-snap-type:y mandatory;scroll-behavior:smooth;scrollbar-width:none}
        .book-scroller::-webkit-scrollbar{display:none}.book-slide{min-height:calc(100vh - 86px);scroll-snap-align:start;display:grid;grid-template-columns:minmax(0,1.1fr) minmax(360px,.9fr);border-bottom:1px solid rgba(255,255,255,.14)}
        .book-copy{padding:clamp(48px,6vw,92px);display:flex;flex-direction:column;justify-content:center;border-left:1px solid rgba(255,255,255,.14);position:relative}
        .book-index{position:absolute;top:34px;right:clamp(24px,4vw,56px);font-size:12px;letter-spacing:.22em;color:#777}.book-kicker{color:#D4AF37;letter-spacing:.18em;font-size:12px;margin-bottom:24px}
        .book-title{font-size:clamp(58px,7.7vw,128px);line-height:.88;letter-spacing:-.065em;margin:0}.book-subtitle{font-size:clamp(20px,2vw,30px);margin:26px 0 0;color:#d6d2cb;line-height:1.45}.book-description{color:#9b9891;line-height:1.9;font-size:16px;margin:26px 0 0;max-width:690px}
        .book-meta{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));border-top:1px solid rgba(255,255,255,.14);border-bottom:1px solid rgba(255,255,255,.14);margin-top:38px}.book-meta-item{padding:18px 0;display:flex;align-items:center;gap:10px;color:#c5c1b9;font-size:14px}.book-levels{color:#79766f;font-size:13px;margin-top:16px}
        .book-visual{min-height:100%;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 55% 38%,rgba(212,175,55,.12),transparent 25%),linear-gradient(145deg,#151515,#090909 64%)}.book-icon{width:min(38vw,320px);max-height:320px;object-fit:contain;filter:grayscale(1) brightness(1.3);opacity:.88;z-index:2}.book-word{position:absolute;left:-14px;bottom:18px;font-size:clamp(82px,10vw,170px);font-weight:800;letter-spacing:-.08em;color:rgba(255,255,255,.035);direction:ltr}
        .book-features{position:absolute;bottom:40px;right:38px;z-index:3;display:flex;flex-wrap:wrap;gap:8px;max-width:72%}.book-chip{padding:8px 12px;border:1px solid rgba(255,255,255,.14);border-radius:999px;font-size:12px;color:#c9c5bd;background:rgba(0,0,0,.26)}
        .book-dots{position:fixed;left:24px;top:50%;transform:translateY(-50%);z-index:35;display:flex;flex-direction:column;gap:12px}.book-dot{width:9px;height:9px;border-radius:50%;border:1px solid rgba(255,255,255,.45);background:transparent;padding:0}.book-dot.active{background:#D4AF37;border-color:#D4AF37;transform:scale(1.45)}.book-scroll-hint{position:fixed;left:20px;bottom:18px;z-index:35;color:#75726c;font-size:11px;display:flex;align-items:center;gap:7px;writing-mode:vertical-rl}
        .book-bottom{min-height:calc(100vh - 86px);scroll-snap-align:start;display:grid;place-items:center;padding:70px 24px;text-align:center;background:#D4AF37;color:#111}.book-bottom h2{font-size:clamp(52px,8vw,120px);line-height:.92;letter-spacing:-.065em;margin:0}.book-bottom p{font-size:18px;margin:28px auto;max-width:640px}.book-bottom a{display:inline-flex;align-items:center;gap:10px;border:1px solid rgba(0,0,0,.45);border-radius:999px;padding:14px 22px;color:#111;font-weight:700}
        @media(max-width:900px){.book-scroller{height:auto}.book-slide{min-height:auto;grid-template-columns:1fr}.book-copy{border-left:0;border-bottom:1px solid rgba(255,255,255,.14);padding:62px 22px 42px}.book-visual{min-height:38vh}.book-dots,.book-scroll-hint{display:none}.book-features{right:18px;bottom:18px;max-width:86%}.book-meta{grid-template-columns:1fr}}
      `}</style>

      <div className="book-dots" aria-label="ניווט בין שיעורים">
        {lessons.map((item, index) => <button key={item._id} className={`book-dot ${activeIndex === index ? 'active' : ''}`} onClick={() => goTo(index)} aria-label={`מעבר ל${item.title}`} />)}
      </div>
      <div className="book-scroll-hint">גללי לדפדוף <ChevronDown size={14} /></div>

      <div className="book-scroller" ref={scrollerRef}>
        {lessons.map((item, index) => (
          <section key={item._id} className="book-slide" data-class-slide data-index={index}>
            <div className="book-copy">
              <div className="book-index">{String(index + 1).padStart(2, '0')} / {String(lessons.length).padStart(2, '0')}</div>
              <div className="book-kicker">Dance class</div>
              <h1 className="book-title">{item.title}</h1>
              {item.subtitle && <p className="book-subtitle">{item.subtitle}</p>}
              {item.description && <p className="book-description">{item.description}</p>}
              <div className="book-meta">
                <div className="book-meta-item"><Clock size={17} /> {item.duration || 'משך משתנה'}</div>
                <div className="book-meta-item"><Users size={17} /> {item.ages || 'מגוון גילאים'}</div>
              </div>
              <div className="book-levels">{(item.levels || []).join(' · ')}</div>
            </div>
            <div className="book-visual">
              {item.imageUrl && <img className="book-icon" src={item.imageUrl} alt={item.title} />}
              <div className="book-word">MOVE</div>
              <div className="book-features">{(item.features || []).map(feature => <span key={feature} className="book-chip">{feature}</span>)}</div>
            </div>
          </section>
        ))}
        <section className="book-bottom"><div><h2>מצאת את השיעור שלך?</h2><p>אפשר להמשיך להרשמה או לדבר איתנו כדי לבחור את הקבוצה והרמה המתאימות.</p><Link to={createPageUrl('Contact')}>דברי איתנו <ArrowLeft size={18} /></Link></div></section>
      </div>
    </div>
  );
}
