import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpLeft, Menu, MoveDown, X } from "lucide-react";
import { Helmet } from "react-helmet-async";

const navItems = [
  ["ראשי", "/"],
  ["חוגים", "/Classes"],
  ["סניפים", "/Locations"],
  ["הופעות", "/Performances"],
  ["אודות", "/About"],
  ["חנות", "/Shop"],
  ["יצירת קשר", "/Contact"],
  ["הרשמה", "/Registration"],
];

const programs = [
  ["01", "מחול", "קלאסי • מודרני • יסודות תנועה"],
  ["02", "אקרודאנס", "כוח • גמישות • טכניקה"],
  ["03", "התעמלות קרקע", "מתחילות • ממשיכות • נבחרת"],
  ["04", "מסלולים וקבוצות", "חלוקה לפי גיל ורמה"],
];

const branches = ["ירושלים", "בית שמש", "ביתר עילית", "סניפים נוספים"];

const styles = `
  :root {
    --ax-bg: #0d0d0d;
    --ax-bg-2: #151515;
    --ax-cream: #f2eee7;
    --ax-muted: #9a9994;
    --ax-line: rgba(255,255,255,.16);
    --ax-accent: #d6ff3f;
    --ax-gold: #d6b34d;
    --ax-pink: #d86b95;
  }

  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin: 0; background: var(--ax-bg); }

  .ax2-page {
    min-height: 100vh;
    color: var(--ax-cream);
    background: var(--ax-bg);
    direction: rtl;
    font-family: Arial, Helvetica, sans-serif;
    overflow-x: hidden;
  }

  .ax2-container {
    width: min(1440px, calc(100% - 64px));
    margin: 0 auto;
  }

  .ax2-nav {
    position: fixed;
    inset: 0 0 auto 0;
    z-index: 50;
    background: rgba(13,13,13,.82);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--ax-line);
  }

  .ax2-nav-inner {
    min-height: 86px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 40px;
  }

  .ax2-brand {
    display: inline-flex;
    align-items: center;
    gap: 13px;
    color: var(--ax-cream);
    text-decoration: none;
    min-width: max-content;
  }

  .ax2-brand img {
    width: 46px;
    height: 46px;
    object-fit: contain;
    filter: grayscale(1) contrast(1.1) brightness(2);
  }

  .ax2-brand span {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: -.02em;
  }

  .ax2-nav-index {
    color: #696969;
    font-size: 11px;
    letter-spacing: .18em;
    justify-self: center;
  }

  .ax2-links {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .ax2-links a {
    color: #c7c5bf;
    text-decoration: none;
    font-size: 13px;
    transition: color .2s ease;
    white-space: nowrap;
  }

  .ax2-links a:hover { color: var(--ax-accent); }

  .ax2-links .ax2-register {
    width: 112px;
    height: 42px;
    border: 1px solid var(--ax-line);
    border-radius: 999px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  .ax2-menu-btn {
    display: none;
    color: white;
    border: 0;
    background: transparent;
    cursor: pointer;
  }

  .ax2-mobile-panel {
    border-top: 1px solid var(--ax-line);
    background: #101010;
  }

  .ax2-mobile-panel a {
    display: block;
    padding: 16px 24px;
    color: white;
    text-decoration: none;
    border-bottom: 1px solid var(--ax-line);
  }

  .ax2-hero {
    min-height: 100vh;
    padding-top: 86px;
    border-bottom: 1px solid var(--ax-line);
    position: relative;
  }

  .ax2-hero-grid {
    min-height: calc(100vh - 86px);
    display: grid;
    grid-template-columns: minmax(0,1.3fr) minmax(300px,.7fr);
  }

  .ax2-hero-main {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 74px 54px 56px 0;
    border-left: 1px solid var(--ax-line);
    position: relative;
  }

  .ax2-hero-eyebrow {
    display: grid;
    grid-template-columns: 74px minmax(0,1fr);
    gap: 18px;
    align-items: center;
    margin-bottom: 36px;
    color: #aaa7a1;
    font-size: 12px;
  }

  .ax2-hero-eyebrow::before {
    content: "";
    height: 1px;
    background: #737373;
  }

  .ax2-title {
    margin: 0;
    font-weight: 500;
    letter-spacing: -.075em;
    line-height: .79;
    font-size: clamp(86px, 12.2vw, 190px);
    max-width: 1060px;
  }

  .ax2-title .outline {
    display: block;
    color: transparent;
    -webkit-text-stroke: 1px rgba(242,238,231,.72);
    transform: translateX(-4%);
  }

  .ax2-title .accent-dot { color: var(--ax-accent); }

  .ax2-hero-bottom {
    margin-top: 54px;
    display: grid;
    grid-template-columns: minmax(0,1fr) 230px;
    gap: 40px;
    align-items: end;
  }

  .ax2-hero-copy {
    color: #a9a7a1;
    line-height: 1.8;
    font-size: 15px;
    max-width: 620px;
    margin: 0;
  }

  .ax2-scroll {
    justify-self: end;
    display: inline-flex;
    align-items: center;
    gap: 14px;
    color: #a9a7a1;
    font-size: 11px;
    letter-spacing: .1em;
  }

  .ax2-scroll-circle {
    width: 58px;
    height: 58px;
    border: 1px solid var(--ax-line);
    border-radius: 50%;
    display: grid;
    place-items: center;
  }

  .ax2-hero-side {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 42px 0 52px 38px;
    position: relative;
    overflow: hidden;
  }

  .ax2-hero-side::after {
    content: "";
    position: absolute;
    width: 410px;
    height: 410px;
    border: 1px solid rgba(214,255,63,.25);
    border-radius: 50%;
    bottom: 11%;
    left: -45%;
  }

  .ax2-side-number {
    font-size: 11px;
    letter-spacing: .16em;
    color: #707070;
  }

  .ax2-side-shape {
    min-height: 430px;
    position: relative;
    margin-top: 40px;
  }

  .ax2-side-shape::before {
    content: "";
    position: absolute;
    inset: 4% 2% 0 14%;
    background:
      radial-gradient(circle at 62% 32%, rgba(214,255,63,.33), transparent 23%),
      linear-gradient(145deg, #242424, #121212 58%);
    border-radius: 54% 34% 48% 18%;
    border: 1px solid rgba(255,255,255,.08);
    transform: rotate(-5deg);
  }

  .ax2-side-shape::after {
    content: "MOVE";
    position: absolute;
    left: -24px;
    bottom: 4px;
    font-size: 96px;
    font-weight: 800;
    letter-spacing: -.08em;
    color: rgba(255,255,255,.055);
  }

  .ax2-marquee {
    border-bottom: 1px solid var(--ax-line);
    overflow: hidden;
    white-space: nowrap;
    padding: 20px 0 18px;
    background: #101010;
  }

  .ax2-marquee-track {
    width: max-content;
    display: flex;
    gap: 36px;
    align-items: center;
    animation: ax2Marquee 28s linear infinite;
  }

  .ax2-marquee span {
    font-size: clamp(28px, 3.8vw, 54px);
    color: #d7d4cd;
    letter-spacing: -.04em;
  }

  .ax2-marquee b {
    color: var(--ax-accent);
    font-weight: 400;
  }

  @keyframes ax2Marquee {
    to { transform: translateX(50%); }
  }

  .ax2-section {
    border-bottom: 1px solid var(--ax-line);
  }

  .ax2-section-grid {
    display: grid;
    grid-template-columns: 120px minmax(0,1fr);
  }

  .ax2-section-index {
    border-left: 1px solid var(--ax-line);
    padding: 84px 0;
    color: #777;
    font-size: 11px;
    letter-spacing: .16em;
    writing-mode: vertical-rl;
    text-orientation: mixed;
  }

  .ax2-about-main {
    padding: 96px 0 96px 74px;
  }

  .ax2-label {
    color: #83827e;
    font-size: 12px;
    letter-spacing: .12em;
    margin-bottom: 30px;
  }

  .ax2-big-copy {
    margin: 0;
    font-size: clamp(46px, 6.2vw, 94px);
    line-height: 1.03;
    letter-spacing: -.055em;
    font-weight: 500;
    max-width: 1100px;
  }

  .ax2-big-copy em {
    color: var(--ax-accent);
    font-style: normal;
  }

  .ax2-about-cols {
    margin-top: 68px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 70px;
    max-width: 1050px;
  }

  .ax2-about-cols p {
    color: var(--ax-muted);
    margin: 0;
    line-height: 1.9;
    font-size: 15px;
  }

  .ax2-stats {
    display: grid;
    grid-template-columns: repeat(3,1fr);
    border-top: 1px solid var(--ax-line);
    margin-top: 76px;
  }

  .ax2-stat {
    min-height: 150px;
    padding: 28px 0;
    border-left: 1px solid var(--ax-line);
  }

  .ax2-stat:last-child { border-left: 0; }
  .ax2-stat strong { display:block; font-size: 52px; font-weight: 400; color: var(--ax-cream); letter-spacing: -.05em; }
  .ax2-stat span { display:block; margin-top: 9px; color: #777; font-size: 12px; }

  .ax2-programs {
    padding: 92px 0 104px;
  }

  .ax2-heading-row {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 30px;
    margin-bottom: 48px;
  }

  .ax2-heading-row h2 {
    margin: 0;
    font-size: clamp(52px, 7vw, 108px);
    line-height: .9;
    letter-spacing: -.065em;
    font-weight: 500;
  }

  .ax2-heading-row p {
    margin: 0 0 8px;
    color: var(--ax-muted);
    max-width: 380px;
    line-height: 1.8;
    font-size: 14px;
  }

  .ax2-program-list { border-top: 1px solid var(--ax-line); }

  .ax2-program-row {
    min-height: 128px;
    display: grid;
    grid-template-columns: 74px minmax(260px,.8fr) minmax(0,1fr) 66px;
    gap: 22px;
    align-items: center;
    border-bottom: 1px solid var(--ax-line);
    transition: background .2s ease, padding .25s ease;
  }

  .ax2-program-row:hover {
    background: #121212;
    padding-inline: 14px;
  }

  .ax2-program-num { color: #6d6d6d; font-size: 12px; }
  .ax2-program-row h3 { margin: 0; font-size: clamp(28px, 3.6vw, 56px); letter-spacing: -.045em; font-weight: 400; }
  .ax2-program-row p { margin: 0; color: #83817d; font-size: 14px; }

  .ax2-circle-link {
    width: 52px;
    height: 52px;
    border: 1px solid var(--ax-line);
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: white;
    transition: .25s ease;
  }

  .ax2-program-row:hover .ax2-circle-link {
    background: var(--ax-accent);
    color: #111;
    border-color: var(--ax-accent);
    transform: rotate(-8deg);
  }

  .ax2-showcase {
    background: var(--ax-cream);
    color: #111;
    padding: 104px 0;
  }

  .ax2-showcase-head {
    display: grid;
    grid-template-columns: 120px minmax(0,1fr);
    margin-bottom: 60px;
  }

  .ax2-showcase-index {
    color: #777;
    font-size: 11px;
    letter-spacing: .18em;
  }

  .ax2-showcase h2 {
    font-size: clamp(58px, 8vw, 126px);
    line-height: .86;
    letter-spacing: -.07em;
    font-weight: 500;
    margin: 0;
    max-width: 1100px;
  }

  .ax2-showcase-grid {
    display: grid;
    grid-template-columns: 1.1fr .9fr;
    gap: 22px;
    align-items: start;
  }

  .ax2-project {
    min-height: 520px;
    position: relative;
    overflow: hidden;
    background: #d8d3c8;
  }

  .ax2-project.small { min-height: 380px; margin-top: 130px; }

  .ax2-project::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 68% 32%, rgba(214,255,63,.64), transparent 18%),
      linear-gradient(140deg,#111 0 31%,#3a3a3a 31% 49%,#efe9df 49% 64%,#111 64%);
    transform: scale(1.04);
  }

  .ax2-project.small::before {
    background:
      radial-gradient(circle at 34% 66%, rgba(216,107,149,.44), transparent 20%),
      linear-gradient(50deg,#161616 0 42%,#d9b54e 42% 53%,#eee8dc 53% 68%,#111 68%);
  }

  .ax2-project-tag {
    position: absolute;
    top: 24px;
    right: 24px;
    z-index: 2;
    background: #111;
    color: white;
    padding: 9px 13px;
    font-size: 11px;
  }

  .ax2-project-title {
    position: absolute;
    bottom: 22px;
    right: 24px;
    left: 24px;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: end;
    gap: 20px;
    color: white;
  }

  .ax2-project-title strong {
    font-size: clamp(30px, 4vw, 62px);
    letter-spacing: -.055em;
    font-weight: 500;
  }

  .ax2-branches {
    background: var(--ax-accent);
    color: #111;
  }

  .ax2-branches-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 660px;
  }

  .ax2-branches-copy {
    padding: 92px 70px 78px 0;
    border-left: 1px solid rgba(0,0,0,.22);
  }

  .ax2-branches-copy h2 {
    margin: 0 0 46px;
    font-size: clamp(56px, 7.2vw, 110px);
    line-height: .88;
    letter-spacing: -.07em;
    font-weight: 500;
  }

  .ax2-branch {
    border-top: 1px solid rgba(0,0,0,.28);
    padding: 19px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
  }

  .ax2-branch:last-child { border-bottom: 1px solid rgba(0,0,0,.28); }

  .ax2-branches-art {
    position: relative;
    overflow: hidden;
  }

  .ax2-branches-art::before,
  .ax2-branches-art::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,.28);
  }

  .ax2-branches-art::before { width: 480px; height: 480px; left: 50%; top: 50%; transform: translate(-50%,-50%); }
  .ax2-branches-art::after { width: 270px; height: 270px; left: 50%; top: 50%; transform: translate(-50%,-50%); background: #111; }

  .ax2-branches-word {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    color: var(--ax-accent);
    z-index: 2;
    font-size: clamp(72px, 10vw, 150px);
    font-weight: 800;
    letter-spacing: -.08em;
    transform: rotate(-90deg);
  }

  .ax2-final {
    padding: 116px 0 96px;
    background: #0b0b0b;
  }

  .ax2-final-grid {
    display: grid;
    grid-template-columns: minmax(0,1fr) 180px;
    gap: 42px;
    align-items: end;
  }

  .ax2-final h2 {
    margin: 0;
    font-size: clamp(70px, 10vw, 156px);
    line-height: .8;
    letter-spacing: -.075em;
    font-weight: 500;
  }

  .ax2-final h2 span { color: transparent; -webkit-text-stroke: 1px rgba(242,238,231,.55); }

  .ax2-final-button {
    width: 162px;
    height: 162px;
    border: 1px solid var(--ax-line);
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: var(--ax-cream);
    text-decoration: none;
    transition: .25s ease;
  }

  .ax2-final-button:hover {
    background: var(--ax-accent);
    border-color: var(--ax-accent);
    color: #111;
    transform: rotate(-8deg);
  }

  .ax2-footer {
    padding: 30px 0 44px;
    border-top: 1px solid var(--ax-line);
    background: #080808;
    color: #747474;
    font-size: 12px;
  }

  .ax2-footer-inner {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }

  .ax2-reveal {
    opacity: 0;
    transform: translateY(36px);
    transition: opacity .8s ease, transform .8s cubic-bezier(.2,.65,.2,1);
  }

  .ax2-reveal.visible { opacity: 1; transform: translateY(0); }

  @media (max-width: 1120px) {
    .ax2-links { display: none; }
    .ax2-menu-btn { display: block; }
    .ax2-nav-index { justify-self: end; }
    .ax2-nav-inner { grid-template-columns: auto 1fr auto; }
    .ax2-hero-grid { grid-template-columns: 1fr; }
    .ax2-hero-main { border-left: 0; padding-left: 0; min-height: 720px; }
    .ax2-hero-side { min-height: 500px; border-top: 1px solid var(--ax-line); padding-left: 0; }
    .ax2-side-shape { width: min(640px,100%); }
  }

  @media (max-width: 820px) {
    .ax2-container { width: min(100% - 30px, 1440px); }
    .ax2-nav-inner { min-height: 72px; }
    .ax2-brand span { display: none; }
    .ax2-nav-index { display: none; }
    .ax2-hero { padding-top: 72px; }
    .ax2-hero-main { padding-top: 60px; padding-right: 0; min-height: 650px; }
    .ax2-hero-bottom { grid-template-columns: 1fr; }
    .ax2-scroll { justify-self: start; }
    .ax2-section-grid { grid-template-columns: 1fr; }
    .ax2-section-index { display: none; }
    .ax2-about-main { padding: 72px 0; }
    .ax2-about-cols { grid-template-columns: 1fr; gap: 24px; }
    .ax2-stats { grid-template-columns: 1fr; }
    .ax2-stat { border-left: 0; border-bottom: 1px solid var(--ax-line); }
    .ax2-heading-row { align-items: flex-start; flex-direction: column; }
    .ax2-program-row { grid-template-columns: 48px 1fr 56px; min-height: 110px; }
    .ax2-program-row p { display: none; }
    .ax2-showcase-head { grid-template-columns: 1fr; gap: 18px; }
    .ax2-showcase-grid { grid-template-columns: 1fr; }
    .ax2-project.small { margin-top: 0; }
    .ax2-branches-grid { grid-template-columns: 1fr; }
    .ax2-branches-copy { padding: 72px 0; border-left: 0; }
    .ax2-branches-art { min-height: 440px; border-top: 1px solid rgba(0,0,0,.22); }
    .ax2-final-grid { grid-template-columns: 1fr; }
    .ax2-final-button { width: 118px; height: 118px; }
    .ax2-footer-inner { flex-direction: column; }
  }
`;

function Reveal({ children, className = "" }) {
  const [visible, setVisible] = useState(false);
  const id = React.useId();

  useEffect(() => {
    const el = document.querySelector(`[data-reveal="${CSS.escape(id)}"]`);
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: .12 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [id]);

  return <div data-reveal={id} className={`ax2-reveal ${visible ? "visible" : ""} ${className}`}>{children}</div>;
}

export default function AxtraPreview() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="ax2-page">
      <Helmet>
        <title>Preview — ריקוד ברוח הטובה</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <style>{styles}</style>

      <header className="ax2-nav">
        <div className="ax2-container ax2-nav-inner">
          <Link className="ax2-brand" to="/">
            <img src="/logo.png" alt="לוגו ריקוד ברוח הטובה" />
            <span>ריקוד ברוח הטובה</span>
          </Link>
          <div className="ax2-nav-index">CREATIVE DANCE STUDIO / 2026</div>
          <nav className="ax2-links">
            {navItems.map(([label, href]) => (
              <Link key={href} to={href} className={label === "הרשמה" ? "ax2-register" : ""}>{label}</Link>
            ))}
          </nav>
          <button className="ax2-menu-btn" onClick={() => setMenuOpen(v => !v)} aria-label="פתיחת תפריט">
            {menuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>
        {menuOpen && (
          <div className="ax2-mobile-panel">
            {navItems.map(([label, href]) => (
              <Link key={href} to={href} onClick={() => setMenuOpen(false)}>{label}</Link>
            ))}
          </div>
        )}
      </header>

      <main>
        <section className="ax2-hero">
          <div className="ax2-container ax2-hero-grid">
            <div className="ax2-hero-main">
              <div className="ax2-hero-eyebrow">DANCE / MOTION / STUDIO</div>
              <h1 className="ax2-title">
                ריקוד<span className="accent-dot">.</span>
                <span className="outline">ברוח הטובה</span>
              </h1>
              <div className="ax2-hero-bottom">
                <p className="ax2-hero-copy">
                  בית ספר למחול, אקרודאנס והתעמלות קרקע — מקצועיות, תנועה ואווירה איכותית בעיצוב חדש ומדויק יותר בסגנון Axtra.
                </p>
                <a href="#about-preview" className="ax2-scroll">
                  <span>SCROLL TO EXPLORE</span>
                  <span className="ax2-scroll-circle"><MoveDown size={18} /></span>
                </a>
              </div>
            </div>
            <aside className="ax2-hero-side">
              <div className="ax2-side-number">00 — SELECTED DIRECTION</div>
              <div className="ax2-side-shape" />
            </aside>
          </div>
        </section>

        <div className="ax2-marquee">
          <div className="ax2-marquee-track">
            <span>מחול <b>✦</b> אקרודאנס <b>✦</b> בלט <b>✦</b> התעמלות קרקע <b>✦</b> תנועה <b>✦</b></span>
            <span>מחול <b>✦</b> אקרודאנס <b>✦</b> בלט <b>✦</b> התעמלות קרקע <b>✦</b> תנועה <b>✦</b></span>
          </div>
        </div>

        <section id="about-preview" className="ax2-section">
          <div className="ax2-container ax2-section-grid">
            <div className="ax2-section-index">01 / ABOUT THE STUDIO</div>
            <div className="ax2-about-main">
              <Reveal>
                <div className="ax2-label">מי אנחנו</div>
                <h2 className="ax2-big-copy">
                  תנועה מדויקת. דרך מקצועית. <em>חוויה שנשארת.</em>
                </h2>
              </Reveal>
              <div className="ax2-about-cols">
                <Reveal><p>אנחנו בונות תהליך שמחבר טכניקה, ביטחון, יציבה, כוח וגמישות — עם יחס אישי וקבוצות שמאפשרות לכל תלמידה להתקדם בקצב הנכון לה.</p></Reveal>
                <Reveal><p>העיצוב החדש שומר על התוכן והפונקציונליות של האתר, אבל נותן להם שפה ויזואלית יותר חדה, טיפוגרפית ומודרנית.</p></Reveal>
              </div>
              <div className="ax2-stats">
                <div className="ax2-stat"><strong>4+</strong><span>תחומי לימוד מרכזיים</span></div>
                <div className="ax2-stat"><strong>3</strong><span>אזורי פעילות עיקריים</span></div>
                <div className="ax2-stat"><strong>1</strong><span>דרך מקצועית אחת</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="ax2-programs ax2-section">
          <div className="ax2-container">
            <Reveal className="ax2-heading-row">
              <h2>מה לומדים</h2>
              <p>סקירה נקייה ומדויקת של התחומים, עם מבנה שורות מינימליסטי בסגנון עמודי השירות של Axtra.</p>
            </Reveal>
            <div className="ax2-program-list">
              {programs.map(([num, title, desc]) => (
                <Link key={num} to="/Classes" className="ax2-program-row">
                  <span className="ax2-program-num">{num}</span>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                  <span className="ax2-circle-link"><ArrowUpLeft size={18} /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="ax2-showcase">
          <div className="ax2-container">
            <div className="ax2-showcase-head">
              <div className="ax2-showcase-index">02 / EXPERIENCE</div>
              <Reveal><h2>תנועה היא השפה שלנו.</h2></Reveal>
            </div>
            <div className="ax2-showcase-grid">
              <Reveal className="ax2-project">
                <span className="ax2-project-tag">DANCE / 01</span>
                <div className="ax2-project-title"><strong>מחול</strong><ArrowUpLeft size={30}/></div>
              </Reveal>
              <Reveal className="ax2-project small">
                <span className="ax2-project-tag">ACRO / 02</span>
                <div className="ax2-project-title"><strong>אקרודאנס</strong><ArrowUpLeft size={28}/></div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="ax2-branches">
          <div className="ax2-container ax2-branches-grid">
            <div className="ax2-branches-copy">
              <div className="ax2-label" style={{color:"#343434"}}>03 / LOCATIONS</div>
              <h2>הסניף שלך.<br/>הקבוצה שלך.</h2>
              <div>
                {branches.map((branch, index) => (
                  <Link key={branch} className="ax2-branch" to="/Locations">
                    <span>{branch}</span>
                    <span>0{index + 1} ↗</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="ax2-branches-art"><div className="ax2-branches-word">MOVE</div></div>
          </div>
        </section>

        <section className="ax2-final">
          <div className="ax2-container ax2-final-grid">
            <Reveal>
              <h2>מוכנה<br/><span>להתחיל?</span></h2>
            </Reveal>
            <Link className="ax2-final-button" to="/Registration">
              <ArrowLeft size={30} />
            </Link>
          </div>
        </section>
      </main>

      <footer className="ax2-footer">
        <div className="ax2-container ax2-footer-inner">
          <span>ריקוד ברוח הטובה — PREVIEW ONLY</span>
          <span>Axtra-inspired visual direction</span>
        </div>
      </footer>
    </div>
  );
}
