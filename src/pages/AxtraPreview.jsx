import React, { useState } from "react";
import { ArrowLeft, ArrowUpLeft, Menu, X, MoveLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";

const navItems = [
  ["ראשי", "/"],
  ["חוגים", "/Classes"],
  ["סניפים", "/Locations"],
  ["הופעות", "/Performances"],
  ["אודות", "/About"],
  ["יצירת קשר", "/Contact"],
  ["הרשמה", "/Registration"],
];

const styles = `
  :root {
    --ax-bg: #0a0a0a;
    --ax-bg-soft: #111111;
    --ax-line: rgba(255,255,255,.14);
    --ax-text: #f4f0e8;
    --ax-muted: #9c9a95;
    --ax-gold: #d7b451;
    --ax-pink: #d76092;
  }
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin: 0; }
  .ax-page {
    min-height: 100vh;
    background: var(--ax-bg);
    color: var(--ax-text);
    direction: rtl;
    font-family: Arial, Helvetica, sans-serif;
    overflow: hidden;
  }
  .ax-container { width: min(1380px, calc(100% - 48px)); margin: 0 auto; }
  .ax-nav {
    position: sticky; top: 0; z-index: 30;
    background: rgba(10,10,10,.82); backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--ax-line);
  }
  .ax-nav-inner { height: 92px; display:flex; align-items:center; justify-content:space-between; gap:28px; }
  .ax-brand { display:flex; align-items:center; gap:14px; text-decoration:none; color:white; min-width:max-content; }
  .ax-brand img { width:54px; height:54px; object-fit:contain; filter:grayscale(1) brightness(1.9); }
  .ax-brand strong { font-size:17px; letter-spacing:-.02em; }
  .ax-links { display:flex; gap:26px; align-items:center; }
  .ax-links a { color:#d7d3cb; text-decoration:none; font-size:14px; transition:.2s; }
  .ax-links a:hover { color:var(--ax-gold); }
  .ax-register { border:1px solid var(--ax-line); padding:13px 18px; border-radius:999px; }
  .ax-mobile { display:none; background:none; border:0; color:white; }
  .ax-mobile-panel { display:none; }

  .ax-hero { position:relative; min-height:760px; border-bottom:1px solid var(--ax-line); }
  .ax-hero-grid { display:grid; grid-template-columns: .88fr 1.12fr; min-height:760px; }
  .ax-hero-copy { display:flex; flex-direction:column; justify-content:flex-end; padding:80px 0 72px 40px; position:relative; }
  .ax-kicker { font-size:12px; letter-spacing:.22em; color:var(--ax-gold); text-transform:uppercase; margin-bottom:26px; }
  .ax-title { font-size:clamp(66px, 8.4vw, 148px); line-height:.88; letter-spacing:-.065em; font-weight:700; margin:0; }
  .ax-title span { display:block; color:transparent; -webkit-text-stroke:1px rgba(255,255,255,.48); }
  .ax-lead { max-width:560px; color:#b7b3ab; font-size:19px; line-height:1.8; margin:34px 0 0; }
  .ax-hero-cta { display:inline-flex; align-items:center; gap:14px; color:#111; background:var(--ax-gold); text-decoration:none; width:max-content; margin-top:34px; padding:16px 24px; border-radius:999px; font-weight:700; }
  .ax-visual { border-right:1px solid var(--ax-line); position:relative; min-height:760px; overflow:hidden; background:radial-gradient(circle at 66% 32%, rgba(215,180,81,.22), transparent 27%), linear-gradient(145deg,#151515,#090909 58%); }
  .ax-visual::before { content:""; position:absolute; inset:8% 7% 12% 14%; border:1px solid rgba(255,255,255,.14); border-radius:50% 50% 12% 50%; transform:rotate(-8deg); }
  .ax-visual::after { content:"MOVE"; position:absolute; left:-22px; bottom:28px; font-size:clamp(86px, 11vw, 176px); font-weight:800; color:rgba(255,255,255,.04); letter-spacing:-.08em; }
  .ax-figure { position:absolute; inset:12% 12% 10% 18%; border-radius:48% 48% 16% 48%; background:linear-gradient(150deg, rgba(215,180,81,.6), rgba(215,96,146,.16) 43%, rgba(255,255,255,.04)); filter:saturate(.8); box-shadow:0 30px 80px rgba(0,0,0,.5); }
  .ax-figure-line { position:absolute; top:13%; left:18%; width:62%; height:62%; border:1px solid rgba(255,255,255,.28); border-radius:50%; transform:rotate(34deg); }
  .ax-vertical { position:absolute; left:20px; top:50%; transform:translateY(-50%) rotate(-90deg); transform-origin:center; font-size:12px; letter-spacing:.3em; color:#777; white-space:nowrap; }

  .ax-section { border-bottom:1px solid var(--ax-line); }
  .ax-about { display:grid; grid-template-columns:.45fr 1.55fr; min-height:620px; }
  .ax-sideword { border-left:1px solid var(--ax-line); padding:58px 0; font-size:12px; color:#777; writing-mode:vertical-rl; text-orientation:mixed; letter-spacing:.24em; }
  .ax-about-main { padding:84px 0 84px 70px; }
  .ax-overline { color:#888; font-size:13px; letter-spacing:.12em; margin-bottom:24px; }
  .ax-big-copy { font-size:clamp(42px,5.5vw,86px); line-height:1.05; letter-spacing:-.045em; max-width:1050px; margin:0; }
  .ax-big-copy em { color:var(--ax-gold); font-style:normal; }
  .ax-about-bottom { margin-top:68px; display:grid; grid-template-columns:1fr 1fr; gap:50px; }
  .ax-about-bottom p { color:var(--ax-muted); line-height:1.9; font-size:16px; margin:0; }
  .ax-stats { display:grid; grid-template-columns:repeat(3,1fr); border-top:1px solid var(--ax-line); margin-top:72px; }
  .ax-stat { padding:34px 0; border-left:1px solid var(--ax-line); }
  .ax-stat:last-child { border-left:0; }
  .ax-stat strong { display:block; font-size:46px; color:var(--ax-gold); margin-bottom:8px; }
  .ax-stat span { color:#8b8984; font-size:13px; }

  .ax-classes { padding:90px 0; }
  .ax-section-head { display:flex; justify-content:space-between; align-items:flex-end; gap:30px; margin-bottom:54px; }
  .ax-section-head h2 { font-size:clamp(44px,6vw,92px); margin:0; letter-spacing:-.055em; }
  .ax-section-head p { max-width:390px; color:var(--ax-muted); line-height:1.8; margin:0; }
  .ax-class-list { border-top:1px solid var(--ax-line); }
  .ax-class-row { min-height:126px; display:grid; grid-template-columns:90px 1fr 1fr 70px; align-items:center; border-bottom:1px solid var(--ax-line); transition:.25s; }
  .ax-class-row:hover { background:#111; padding-inline:16px; }
  .ax-num { color:#666; font-size:13px; }
  .ax-class-row h3 { font-size:clamp(26px,3vw,48px); margin:0; font-weight:500; letter-spacing:-.035em; }
  .ax-class-row p { color:#8e8b84; margin:0; }
  .ax-arrow { width:48px; height:48px; border:1px solid var(--ax-line); border-radius:50%; display:grid; place-items:center; }

  .ax-locations { display:grid; grid-template-columns:1.06fr .94fr; min-height:610px; }
  .ax-location-visual { border-left:1px solid var(--ax-line); position:relative; background:linear-gradient(145deg,#161616,#0c0c0c); overflow:hidden; }
  .ax-location-visual .ax-ring { position:absolute; width:420px; height:420px; border:1px solid rgba(215,180,81,.35); border-radius:50%; left:50%; top:50%; transform:translate(-50%,-50%); }
  .ax-location-visual .ax-ring::before, .ax-location-visual .ax-ring::after { content:""; position:absolute; inset:16%; border:1px solid rgba(255,255,255,.12); border-radius:50%; }
  .ax-location-visual .ax-ring::after { inset:32%; background:var(--ax-gold); border:0; box-shadow:0 0 70px rgba(215,180,81,.25); }
  .ax-locations-copy { padding:86px 72px 76px 0; display:flex; flex-direction:column; justify-content:center; }
  .ax-locations-copy h2 { font-size:clamp(46px,6vw,92px); line-height:.95; letter-spacing:-.055em; margin:0 0 34px; }
  .ax-city { display:flex; align-items:center; justify-content:space-between; border-top:1px solid var(--ax-line); padding:20px 0; color:#d8d4cb; }
  .ax-city:last-child { border-bottom:1px solid var(--ax-line); }

  .ax-cta { padding:110px 0; background:var(--ax-gold); color:#111; }
  .ax-cta-grid { display:grid; grid-template-columns:1fr auto; align-items:end; gap:30px; }
  .ax-cta h2 { font-size:clamp(54px,8vw,126px); line-height:.88; letter-spacing:-.07em; margin:0; max-width:1050px; }
  .ax-cta a { width:150px; height:150px; border:1px solid rgba(0,0,0,.35); border-radius:50%; display:grid; place-items:center; color:#111; text-decoration:none; transition:.25s; }
  .ax-cta a:hover { background:#111; color:var(--ax-gold); transform:rotate(-8deg); }
  .ax-footer { padding:34px 0 50px; background:#060606; border-top:1px solid rgba(255,255,255,.06); color:#777; font-size:13px; }
  .ax-footer-inner { display:flex; justify-content:space-between; gap:20px; }

  @media (max-width: 980px) {
    .ax-links { display:none; }
    .ax-mobile { display:block; }
    .ax-mobile-panel { display:flex; flex-direction:column; gap:0; border-top:1px solid var(--ax-line); }
    .ax-mobile-panel a { padding:16px 24px; color:white; text-decoration:none; border-bottom:1px solid var(--ax-line); }
    .ax-hero-grid, .ax-locations { grid-template-columns:1fr; }
    .ax-visual { min-height:480px; border-right:0; border-top:1px solid var(--ax-line); }
    .ax-hero-copy { padding-left:0; min-height:600px; }
    .ax-about { grid-template-columns:1fr; }
    .ax-sideword { display:none; }
    .ax-about-main { padding-left:0; }
    .ax-about-bottom { grid-template-columns:1fr; }
    .ax-locations-copy { padding-right:0; }
    .ax-location-visual { min-height:430px; border-left:0; border-bottom:1px solid var(--ax-line); }
  }
  @media (max-width: 720px) {
    .ax-container { width:min(100% - 28px, 1380px); }
    .ax-nav-inner { height:76px; }
    .ax-brand strong { display:none; }
    .ax-brand img { width:44px; height:44px; }
    .ax-hero { min-height:auto; }
    .ax-hero-grid { min-height:auto; }
    .ax-hero-copy { min-height:560px; padding-top:60px; padding-bottom:54px; }
    .ax-lead { font-size:16px; }
    .ax-about-main, .ax-classes { padding-top:64px; padding-bottom:64px; }
    .ax-stats { grid-template-columns:1fr; }
    .ax-stat { border-left:0; border-bottom:1px solid var(--ax-line); }
    .ax-section-head { align-items:flex-start; flex-direction:column; }
    .ax-class-row { grid-template-columns:52px 1fr 54px; min-height:108px; }
    .ax-class-row p { display:none; }
    .ax-cta-grid { grid-template-columns:1fr; }
    .ax-cta a { width:110px; height:110px; }
    .ax-footer-inner { flex-direction:column; }
  }
`;

export default function AxtraPreview() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="ax-page">
      <Helmet>
        <title>Preview — ריקוד ברוח הטובה</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <style>{styles}</style>

      <nav className="ax-nav">
        <div className="ax-container ax-nav-inner">
          <a className="ax-brand" href="/">
            <img src="/logo.png" alt="לוגו ריקוד ברוח הטובה" />
            <strong>ריקוד ברוח הטובה</strong>
          </a>
          <div className="ax-links">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} className={label === "הרשמה" ? "ax-register" : ""}>{label}</a>
            ))}
          </div>
          <button className="ax-mobile" onClick={() => setMenuOpen(v => !v)} aria-label="תפריט">
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
        {menuOpen && (
          <div className="ax-mobile-panel">
            {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          </div>
        )}
      </nav>

      <main>
        <section className="ax-hero">
          <div className="ax-container ax-hero-grid">
            <div className="ax-hero-copy">
              <div className="ax-kicker">Dance • Motion • Acrobatics</div>
              <h1 className="ax-title">ריקוד<br/><span>ברוח הטובה</span></h1>
              <p className="ax-lead">בית ספר למחול, אקרובטיקה ותנועה עם שילוב של מקצועיות, חוויה, ביטחון והתקדמות אישית.</p>
              <a className="ax-hero-cta" href="/Registration">להרשמה <ArrowLeft size={18}/></a>
            </div>
            <div className="ax-visual" aria-hidden="true">
              <div className="ax-figure" />
              <div className="ax-figure-line" />
              <div className="ax-vertical">Rikud Baruach Hatova • Since Movement Matters</div>
            </div>
          </div>
        </section>

        <section className="ax-section">
          <div className="ax-container ax-about">
            <div className="ax-sideword">ABOUT THE STUDIO</div>
            <div className="ax-about-main">
              <div className="ax-overline">01 — מי אנחנו</div>
              <h2 className="ax-big-copy">מקום שבו <em>תנועה</em> הופכת לדרך להתפתח, להתחזק וליהנות.</h2>
              <div className="ax-about-bottom">
                <p>השיעורים בנויים לפי גיל ורמה, עם דגש על בסיס טכני נכון, התקדמות מדורגת ותחושת הצלחה לאורך הדרך.</p>
                <p>המערכת משלבת מחול, בלט, אקרובטיקה ואקרודאנס במספר סניפים, כדי לאפשר לכל תלמידה למצוא את המסלול שמתאים לה.</p>
              </div>
              <div className="ax-stats">
                <div className="ax-stat"><strong>4</strong><span>תחומי לימוד מרכזיים</span></div>
                <div className="ax-stat"><strong>3</strong><span>ערים עם סניפים</span></div>
                <div className="ax-stat"><strong>1</strong><span>דרך מקצועית ומדויקת</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="ax-section ax-classes">
          <div className="ax-container">
            <div className="ax-section-head">
              <div>
                <div className="ax-overline">02 — התחומים שלנו</div>
                <h2>MOVE<br/>WITH US</h2>
              </div>
              <p>Preview לעיצוב שבו התוכן מקבל הרבה אוויר, טיפוגרפיה גדולה וקצב ויזואלי חזק במקום כרטיסים קטנים וצפופים.</p>
            </div>
            <div className="ax-class-list">
              {[
                ["01","מחול","טכניקה, קצב, מוזיקליות ותנועה"],
                ["02","בלט קלאסי","בסיס מדויק, יציבה וקווים"],
                ["03","אקרובטיקה","כוח, גמישות ושליטה בגוף"],
                ["04","אקרודאנס","חיבור בין תנועה לאלמנטים אקרובטיים"],
              ].map(([n,title,desc]) => (
                <div className="ax-class-row" key={n}>
                  <div className="ax-num">{n}</div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                  <div className="ax-arrow"><ArrowUpLeft size={20}/></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="ax-section">
          <div className="ax-container ax-locations">
            <div className="ax-location-visual"><div className="ax-ring" /></div>
            <div className="ax-locations-copy">
              <div className="ax-overline">03 — סניפים</div>
              <h2>קרוב.<br/>נוח.<br/>מקצועי.</h2>
              {['ירושלים','ביתר','בית שמש'].map(city => (
                <div className="ax-city" key={city}><span>{city}</span><MoveLeft size={18}/></div>
              ))}
            </div>
          </div>
        </section>

        <section className="ax-cta">
          <div className="ax-container ax-cta-grid">
            <h2>מוכנה להתחיל לזוז?</h2>
            <a href="/Registration" aria-label="להרשמה"><ArrowUpLeft size={44}/></a>
          </div>
        </section>
      </main>

      <footer className="ax-footer">
        <div className="ax-container ax-footer-inner">
          <span>Preview עיצוב בלבד — branch נפרד, ללא שינוי באתר החי.</span>
          <span>ריקוד ברוח הטובה</span>
        </div>
      </footer>
    </div>
  );
}
