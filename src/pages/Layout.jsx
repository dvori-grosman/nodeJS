import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowUpLeft, Mail, Menu, Phone, X } from "lucide-react";

const navLinks = [
  { name: "ראשי", page: "Home" },
  { name: "אודות", page: "About" },
  { name: "חוגים", page: "Classes" },
  { name: "סניפים", page: "Locations" },
  { name: "הופעות", page: "Performances" },
  { name: "חנות", page: "Shop" },
  { name: "יצירת קשר", page: "Contact" },
  { name: "הרשמה", page: "Registration", cta: true },
];

const previewStyles = `
  :root {
    --ax-bg:#0d0d0d;
    --ax-bg-2:#151515;
    --ax-cream:#f2eee7;
    --ax-muted:#999893;
    --ax-line:rgba(255,255,255,.15);
    --ax-accent:#d6ff3f;
    --ax-gold:#d6b34d;
    --ax-pink:#d86b95;
  }

  html { scroll-behavior:smooth; }
  body { margin:0; background:var(--ax-bg)!important; }
  * { box-sizing:border-box; }

  .ax-inner-shell {
    min-height:100vh;
    background:var(--ax-bg);
    color:var(--ax-cream);
    direction:rtl;
    font-family:Arial,Helvetica,sans-serif;
  }

  .ax-inner-container {
    width:min(1440px,calc(100% - 64px));
    margin:0 auto;
  }

  .ax-inner-header {
    position:sticky;
    top:0;
    z-index:50;
    min-height:86px;
    background:rgba(13,13,13,.84);
    backdrop-filter:blur(16px);
    border-bottom:1px solid var(--ax-line);
  }

  .ax-inner-nav {
    min-height:86px;
    display:grid;
    grid-template-columns:auto 1fr auto;
    align-items:center;
    gap:38px;
  }

  .ax-inner-brand {
    display:flex;
    align-items:center;
    gap:12px;
    color:var(--ax-cream);
    text-decoration:none;
  }

  .ax-inner-brand img {
    width:46px;
    height:46px;
    object-fit:contain;
    filter:grayscale(1) brightness(2);
  }

  .ax-inner-brand span { font-size:14px; font-weight:700; }
  .ax-inner-mark { color:#646464; font-size:11px; letter-spacing:.15em; justify-self:center; }

  .ax-inner-links { display:flex; gap:22px; align-items:center; }
  .ax-inner-links a { color:#c4c2bc; font-size:13px; text-decoration:none; transition:.2s; white-space:nowrap; }
  .ax-inner-links a:hover,.ax-inner-links a.active { color:var(--ax-accent); }
  .ax-inner-links a.cta { border:1px solid var(--ax-line); border-radius:999px; padding:12px 18px; }

  .ax-inner-menu { display:none; border:0; background:none; color:white; cursor:pointer; }
  .ax-inner-mobile { border-top:1px solid var(--ax-line); background:#101010; }
  .ax-inner-mobile a { display:block; padding:16px 24px; color:white; text-decoration:none; border-bottom:1px solid var(--ax-line); }

  .ax-preview-main {
    min-height:70vh;
    background:var(--ax-bg);
    color:var(--ax-cream);
  }

  .ax-preview-main > * { margin-top:0!important; }

  .ax-preview-main .dark-bg,
  .ax-preview-main .darker-bg,
  .ax-preview-main .bg-gray-900,
  .ax-preview-main .bg-slate-900,
  .ax-preview-main .bg-gray-800,
  .ax-preview-main .bg-slate-800 {
    background:var(--ax-bg)!important;
    background-color:var(--ax-bg)!important;
  }

  .ax-preview-main section,
  .ax-preview-main .border-gray-700,
  .ax-preview-main .border-gray-800,
  .ax-preview-main .border-slate-700 {
    border-color:var(--ax-line)!important;
  }

  .ax-preview-main h1,
  .ax-preview-main h2,
  .ax-preview-main h3,
  .ax-preview-main h4,
  .ax-preview-main h5,
  .ax-preview-main h6 {
    font-family:Arial,Helvetica,sans-serif!important;
    letter-spacing:-.045em!important;
    color:var(--ax-cream);
  }

  .ax-preview-main h1 {
    font-size:clamp(58px,8vw,126px)!important;
    line-height:.88!important;
    font-weight:500!important;
    margin-bottom:34px!important;
  }

  .ax-preview-main h2 {
    font-size:clamp(42px,5.5vw,82px)!important;
    line-height:.96!important;
    font-weight:500!important;
  }

  .ax-preview-main h3 { font-weight:500!important; }

  .ax-preview-main .gold-text { color:var(--ax-accent)!important; }
  .ax-preview-main .pink-text { color:var(--ax-pink)!important; }
  .ax-preview-main .white-text,.ax-preview-main .text-white { color:var(--ax-cream)!important; }
  .ax-preview-main .text-gray-300,.ax-preview-main .text-gray-400,.ax-preview-main .text-gray-500 { color:var(--ax-muted)!important; }

  .ax-preview-main .elegant-shadow,
  .ax-preview-main [class*="shadow"] { box-shadow:none!important; }

  .ax-preview-main [class*="rounded-xl"],
  .ax-preview-main [class*="rounded-lg"],
  .ax-preview-main [class*="rounded-2xl"] { border-radius:0!important; }

  .ax-preview-main [class*="Card"],
  .ax-preview-main .card,
  .ax-preview-main [class*="bg-gray-700"],
  .ax-preview-main [class*="bg-gray-800"] {
    background:#111!important;
  }

  .ax-preview-main .btn-gold,
  .ax-preview-main button.btn-gold,
  .ax-preview-main a.btn-gold {
    background:var(--ax-accent)!important;
    color:#111!important;
    border:1px solid var(--ax-accent)!important;
    border-radius:999px!important;
    padding:14px 24px!important;
    box-shadow:none!important;
    transform:none!important;
  }

  .ax-preview-main .btn-gold:hover { background:transparent!important; color:var(--ax-accent)!important; }

  .ax-preview-main input,
  .ax-preview-main textarea,
  .ax-preview-main select {
    background:#111!important;
    border:1px solid var(--ax-line)!important;
    color:var(--ax-cream)!important;
    border-radius:0!important;
    box-shadow:none!important;
  }

  .ax-preview-main input:focus,
  .ax-preview-main textarea:focus,
  .ax-preview-main select:focus {
    border-color:var(--ax-accent)!important;
    outline:none!important;
    box-shadow:none!important;
  }

  .ax-preview-main label { color:#d6d3cc!important; }

  .ax-preview-main .max-w-7xl,
  .ax-preview-main .max-w-6xl,
  .ax-preview-main .max-w-5xl {
    max-width:1440px!important;
    padding-left:32px!important;
    padding-right:32px!important;
  }

  .ax-preview-main .py-20,
  .ax-preview-main .py-16,
  .ax-preview-main .py-12 { padding-top:84px!important; padding-bottom:84px!important; }

  .ax-preview-main table { border-color:var(--ax-line)!important; }
  .ax-preview-main tr,.ax-preview-main td,.ax-preview-main th { border-color:var(--ax-line)!important; }

  .ax-inner-footer {
    background:#080808;
    border-top:1px solid var(--ax-line);
    color:var(--ax-cream);
  }

  .ax-inner-footer-top {
    display:grid;
    grid-template-columns:minmax(0,1.2fr) .8fr;
    gap:70px;
    padding:92px 0 72px;
  }

  .ax-inner-footer h2 {
    margin:0;
    font-size:clamp(58px,8vw,126px);
    line-height:.84;
    letter-spacing:-.07em;
    font-weight:500;
  }

  .ax-inner-footer h2 span { color:transparent; -webkit-text-stroke:1px rgba(242,238,231,.55); }

  .ax-inner-footer-meta { display:flex; flex-direction:column; justify-content:flex-end; gap:18px; color:#8d8b86; font-size:13px; }
  .ax-inner-contact { display:flex; align-items:center; gap:11px; }
  .ax-inner-footer-link { margin-top:12px; width:82px; height:82px; border:1px solid var(--ax-line); border-radius:50%; display:grid; place-items:center; color:white; }
  .ax-inner-footer-link:hover { background:var(--ax-accent); color:#111; border-color:var(--ax-accent); }

  .ax-inner-footer-bottom { border-top:1px solid var(--ax-line); padding:24px 0 34px; display:flex; justify-content:space-between; gap:20px; color:#696969; font-size:11px; }

  @media(max-width:1120px){
    .ax-inner-links{display:none}.ax-inner-menu{display:block}.ax-inner-mark{justify-self:end}
  }

  @media(max-width:760px){
    .ax-inner-container{width:min(100% - 28px,1440px)}
    .ax-inner-header,.ax-inner-nav{min-height:72px}.ax-inner-brand span,.ax-inner-mark{display:none}
    .ax-preview-main .max-w-7xl,.ax-preview-main .max-w-6xl,.ax-preview-main .max-w-5xl{padding-left:14px!important;padding-right:14px!important}
    .ax-inner-footer-top{grid-template-columns:1fr;gap:42px;padding-top:70px}
    .ax-inner-footer-bottom{flex-direction:column}
  }
`;

export default function AppLayout({ children }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "ריקוד ברוח הטובה — Preview";
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const active = (page) => location.pathname === createPageUrl(page) || (page === "Home" && location.pathname === "/");

  return (
    <div className="ax-inner-shell">
      <style>{previewStyles}</style>

      <header className="ax-inner-header">
        <div className="ax-inner-container ax-inner-nav">
          <Link to="/" className="ax-inner-brand">
            <img src="/logo.png" alt="לוגו ריקוד ברוח הטובה" />
            <span>ריקוד ברוח הטובה</span>
          </Link>
          <div className="ax-inner-mark">AXTRA DIRECTION / PREVIEW</div>
          <nav className="ax-inner-links">
            {navLinks.map(link => (
              <Link
                key={link.page}
                to={createPageUrl(link.page)}
                className={`${active(link.page) ? "active" : ""} ${link.cta ? "cta" : ""}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <button className="ax-inner-menu" onClick={() => setMenuOpen(v => !v)} aria-label="תפריט">
            {menuOpen ? <X size={25}/> : <Menu size={25}/>} 
          </button>
        </div>
        {menuOpen && (
          <div className="ax-inner-mobile">
            {navLinks.map(link => <Link key={link.page} to={createPageUrl(link.page)}>{link.name}</Link>)}
          </div>
        )}
      </header>

      <main className="ax-preview-main">{children}</main>

      <footer className="ax-inner-footer">
        <div className="ax-inner-container ax-inner-footer-top">
          <h2>בואי<br/><span>לרקוד.</span></h2>
          <div className="ax-inner-footer-meta">
            <div className="ax-inner-contact"><Phone size={17}/> <span>03-3130565</span></div>
            <div className="ax-inner-contact"><Mail size={17}/> <span>b0527182273@gmail.com</span></div>
            <Link className="ax-inner-footer-link" to="/Registration"><ArrowUpLeft size={24}/></Link>
          </div>
        </div>
        <div className="ax-inner-container ax-inner-footer-bottom">
          <span>ריקוד ברוח הטובה — PREVIEW ONLY</span>
          <span>Axtra React inspired visual direction</span>
        </div>
      </footer>
    </div>
  );
}
