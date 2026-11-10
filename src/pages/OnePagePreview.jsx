import React, { useEffect, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import About from './About';
import AxtraClassesPreview from './AxtraClassesPreview';
import Locations from './LocationsWithSchedules';
import Performances from './Performances';
import Shop from './Shop';
import Contact from './Contact';
import Registration from './Registration';

const NAV_ITEMS = [
  { id: 'home', label: 'ראשי' },
  { id: 'about', label: 'אודות' },
  { id: 'classes', label: 'חוגים' },
  { id: 'locations', label: 'סניפים' },
  { id: 'performances', label: 'הופעות' },
  { id: 'shop', label: 'חנות' },
  { id: 'contact', label: 'יצירת קשר' },
  { id: 'registration', label: 'הרשמה', cta: true },
];

const styles = `
  :root {
    --landing-bg: #0d0d0d;
    --landing-cream: #f2eee7;
    --landing-muted: #9a9994;
    --landing-line: rgba(255,255,255,.15);
    --landing-gold: #D4AF37;
    --landing-pink: #E8B4CB;
  }

  html { scroll-behavior: smooth; }
  body { margin: 0; background: var(--landing-bg); }

  .landing-preview {
    min-height: 100vh;
    background: var(--landing-bg);
    color: var(--landing-cream);
    direction: rtl;
    overflow-x: hidden;
    font-family: Arial, Helvetica, sans-serif;
  }

  .landing-nav {
    position: fixed;
    inset: 0 0 auto 0;
    z-index: 100;
    background: rgba(10,10,10,.86);
    border-bottom: 1px solid var(--landing-line);
    backdrop-filter: blur(18px);
  }

  .landing-nav-inner {
    width: min(1440px, calc(100% - 64px));
    min-height: 82px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 36px;
  }

  .landing-brand {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    color: var(--landing-cream);
    text-decoration: none;
    white-space: nowrap;
    border: 0;
    background: transparent;
    cursor: pointer;
    padding: 0;
  }

  .landing-brand img {
    width: 44px;
    height: 44px;
    object-fit: contain;
    filter: grayscale(1) contrast(1.1) brightness(2);
  }

  .landing-brand span { font-size: 14px; font-weight: 700; }

  .landing-mark {
    justify-self: center;
    color: #666;
    font-size: 10px;
    letter-spacing: .18em;
  }

  .landing-links {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .landing-link {
    position: relative;
    border: 0;
    background: transparent;
    color: #b9b7b1;
    font: inherit;
    font-size: 13px;
    cursor: pointer;
    padding: 12px 2px;
    transition: color .2s ease;
    white-space: nowrap;
  }

  .landing-link::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 4px;
    width: 100%;
    height: 1px;
    background: var(--landing-gold);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform .25s ease;
  }

  .landing-link:hover,
  .landing-link.active { color: var(--landing-gold); }
  .landing-link.active::after { transform: scaleX(1); }

  .landing-link.cta {
    border: 1px solid var(--landing-line);
    border-radius: 999px;
    padding: 11px 17px;
  }

  .landing-link.cta::after { display: none; }
  .landing-link.cta.active {
    color: #111;
    background: var(--landing-gold);
    border-color: var(--landing-gold);
  }

  .landing-menu-button {
    display: none;
    border: 0;
    background: transparent;
    color: #fff;
    cursor: pointer;
  }

  .landing-mobile-menu {
    border-top: 1px solid var(--landing-line);
    background: #0d0d0d;
  }

  .landing-mobile-link {
    display: block;
    width: 100%;
    border: 0;
    border-bottom: 1px solid var(--landing-line);
    background: transparent;
    color: #eee;
    text-align: right;
    padding: 16px 24px;
    font-size: 15px;
  }

  .landing-mobile-link.active { color: var(--landing-gold); }

  .landing-section {
    position: relative;
    scroll-margin-top: 80px;
    border-bottom: 1px solid var(--landing-line);
  }

  .landing-hero {
    min-height: 100vh;
    padding-top: 82px;
    display: grid;
    align-items: stretch;
    background:
      radial-gradient(circle at 22% 35%, rgba(232,180,203,.10), transparent 24%),
      radial-gradient(circle at 72% 58%, rgba(212,175,55,.11), transparent 28%),
      #0d0d0d;
  }

  .landing-hero-inner {
    width: min(1440px, calc(100% - 64px));
    margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(0, 1.3fr) minmax(300px, .7fr);
    min-height: calc(100vh - 82px);
  }

  .landing-hero-copy {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 90px 58px 58px 0;
    border-left: 1px solid var(--landing-line);
  }

  .landing-eyebrow {
    margin-bottom: 30px;
    color: #8e8c87;
    font-size: 11px;
    letter-spacing: .18em;
  }

  .landing-title {
    margin: 0;
    max-width: 1040px;
    font-size: clamp(82px, 11vw, 176px);
    font-weight: 500;
    line-height: .8;
    letter-spacing: -.075em;
  }

  .landing-title .outline {
    display: block;
    color: transparent;
    -webkit-text-stroke: 1px rgba(242,238,231,.67);
  }

  .landing-title .dot { color: var(--landing-gold); }

  .landing-hero-bottom {
    margin-top: 52px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 36px;
  }

  .landing-hero-description {
    max-width: 620px;
    margin: 0;
    color: var(--landing-muted);
    font-size: 15px;
    line-height: 1.9;
  }

  .landing-scroll-button {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    border: 0;
    background: transparent;
    color: #aaa7a1;
    cursor: pointer;
    font-size: 11px;
    letter-spacing: .1em;
  }

  .landing-scroll-circle {
    width: 56px;
    height: 56px;
    display: grid;
    place-items: center;
    border: 1px solid var(--landing-line);
    border-radius: 50%;
  }

  .landing-hero-art {
    position: relative;
    overflow: hidden;
    display: grid;
    place-items: center;
  }

  .landing-hero-art::before,
  .landing-hero-art::after {
    content: '';
    position: absolute;
    border: 1px solid rgba(212,175,55,.25);
    border-radius: 50%;
  }

  .landing-hero-art::before { width: 430px; height: 430px; }
  .landing-hero-art::after { width: 260px; height: 260px; }

  .landing-hero-word {
    position: relative;
    z-index: 2;
    font-size: clamp(70px, 9vw, 138px);
    font-weight: 800;
    letter-spacing: -.08em;
    color: rgba(255,255,255,.055);
    transform: rotate(-90deg);
  }

  .landing-section-label {
    position: absolute;
    top: 24px;
    right: 28px;
    z-index: 5;
    color: var(--landing-gold);
    font-size: 10px;
    letter-spacing: .18em;
    pointer-events: none;
  }

  /* Convert the classes page's inner scroll-book into normal document flow. */
  .landing-section--classes .book-shell { overflow: visible !important; min-height: 0 !important; }
  .landing-section--classes .book-scroller {
    height: auto !important;
    overflow: visible !important;
    scroll-snap-type: none !important;
  }
  .landing-section--classes .book-slide,
  .landing-section--classes .book-bottom {
    scroll-snap-align: none !important;
    min-height: min(820px, calc(100vh - 82px)) !important;
  }
  .landing-section--classes .book-dots,
  .landing-section--classes .book-scroll-hint { display: none !important; }

  /* Keep embedded page sections visually connected as one landing page. */
  .landing-section > .min-h-screen,
  .landing-section > div > .min-h-screen { margin: 0 !important; }

  .landing-footer {
    padding: 32px 0 42px;
    background: #080808;
    color: #6f6f6f;
    font-size: 11px;
  }

  .landing-footer-inner {
    width: min(1440px, calc(100% - 64px));
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    gap: 18px;
  }

  @media (max-width: 1120px) {
    .landing-links { display: none; }
    .landing-menu-button { display: block; }
    .landing-mark { justify-self: end; }
    .landing-hero-inner { grid-template-columns: 1fr; }
    .landing-hero-copy { border-left: 0; min-height: 70vh; padding-left: 0; }
    .landing-hero-art { min-height: 360px; border-top: 1px solid var(--landing-line); }
  }

  @media (max-width: 760px) {
    .landing-nav-inner,
    .landing-hero-inner,
    .landing-footer-inner { width: min(100% - 28px, 1440px); }
    .landing-nav-inner { min-height: 72px; }
    .landing-brand span,
    .landing-mark { display: none; }
    .landing-hero { padding-top: 72px; }
    .landing-hero-copy { padding: 58px 0 38px; }
    .landing-title { font-size: clamp(64px, 22vw, 104px); }
    .landing-hero-bottom { align-items: flex-start; flex-direction: column; }
    .landing-hero-art { min-height: 300px; }
    .landing-footer-inner { flex-direction: column; }
    .landing-section { scroll-margin-top: 70px; }
  }
`;

export default function OnePagePreview({ initialSection = 'home' }) {
  const [activeSection, setActiveSection] = useState(initialSection);
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id, updateUrl = true) => {
    const target = document.getElementById(id);
    if (!target) return;
    setMenuOpen(false);
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (updateUrl) {
      const nextUrl = id === 'home' ? '/' : `/#${id}`;
      window.history.replaceState({}, '', nextUrl);
    }
  };

  useEffect(() => {
    const sections = NAV_ITEMS
      .map(item => document.getElementById(item.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActiveSection(visible[0].target.id);
    }, {
      root: null,
      rootMargin: '-30% 0px -55% 0px',
      threshold: [0, .05, .15, .3, .6]
    });

    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hashSection = window.location.hash.replace('#', '');
    const requested = NAV_ITEMS.some(item => item.id === hashSection) ? hashSection : initialSection;
    if (!requested || requested === 'home') return;

    const timer = window.setTimeout(() => {
      const target = document.getElementById(requested);
      if (target) {
        target.scrollIntoView({ behavior: 'auto', block: 'start' });
        setActiveSection(requested);
        window.history.replaceState({}, '', `/#${requested}`);
      }
    }, 80);

    return () => window.clearTimeout(timer);
  }, [initialSection]);

  return (
    <div className="landing-preview">
      <Helmet>
        <title>ריקוד ברוח הטובה — Preview</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <style>{styles}</style>

      <header className="landing-nav">
        <div className="landing-nav-inner">
          <button className="landing-brand" onClick={() => scrollToSection('home')} aria-label="חזרה לראש העמוד">
            <img src="/logo.png" alt="לוגו ריקוד ברוח הטובה" />
            <span>ריקוד ברוח הטובה</span>
          </button>

          <div className="landing-mark">ONE PAGE / PREVIEW</div>

          <nav className="landing-links" aria-label="ניווט ראשי">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`landing-link ${activeSection === item.id ? 'active' : ''} ${item.cta ? 'cta' : ''}`}
                aria-current={activeSection === item.id ? 'location' : undefined}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button className="landing-menu-button" type="button" onClick={() => setMenuOpen(value => !value)} aria-label="פתיחת תפריט" aria-expanded={menuOpen}>
            {menuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>

        {menuOpen && (
          <nav className="landing-mobile-menu" aria-label="ניווט למובייל">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`landing-mobile-link ${activeSection === item.id ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      <main>
        <section id="home" data-landing-section className="landing-section landing-hero">
          <div className="landing-hero-inner">
            <div className="landing-hero-copy">
              <div className="landing-eyebrow">DANCE / MOTION / STUDIO</div>
              <h1 className="landing-title">
                ריקוד<span className="dot">.</span>
                <span className="outline">ברוח הטובה</span>
              </h1>
              <div className="landing-hero-bottom">
                <p className="landing-hero-description">
                  בית ספר למחול, אקרודאנס והתעמלות קרקע. כל מה שצריך להכיר — החוגים, הסניפים, המופעים, החנות, ההרשמה ויצירת הקשר — עכשיו בעמוד אחד רציף.
                </p>
                <button className="landing-scroll-button" type="button" onClick={() => scrollToSection('about')}>
                  <span>גללי להמשך</span>
                  <span className="landing-scroll-circle"><ChevronDown size={18} /></span>
                </button>
              </div>
            </div>
            <div className="landing-hero-art" aria-hidden="true"><div className="landing-hero-word">MOVE</div></div>
          </div>
        </section>

        <section id="about" data-landing-section className="landing-section">
          <div className="landing-section-label">01 / ABOUT</div>
          <About />
        </section>

        <section id="classes" data-landing-section className="landing-section landing-section--classes">
          <div className="landing-section-label">02 / CLASSES</div>
          <AxtraClassesPreview />
        </section>

        <section id="locations" data-landing-section className="landing-section">
          <div className="landing-section-label">03 / LOCATIONS</div>
          <Locations />
        </section>

        <section id="performances" data-landing-section className="landing-section">
          <div className="landing-section-label">04 / PERFORMANCES</div>
          <Performances />
        </section>

        <section id="shop" data-landing-section className="landing-section">
          <div className="landing-section-label">05 / SHOP</div>
          <Shop />
        </section>

        <section id="contact" data-landing-section className="landing-section">
          <div className="landing-section-label">06 / CONTACT</div>
          <Contact />
        </section>

        <section id="registration" data-landing-section className="landing-section">
          <div className="landing-section-label">07 / REGISTRATION</div>
          <Registration />
        </section>
      </main>

      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <span>ריקוד ברוח הטובה — PREVIEW ONLY</span>
          <span>One-page landing direction</span>
        </div>
      </footer>
    </div>
  );
}
