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
    --gold: #d7b451;
    --deep-black: #080808;
    --soft-pink: #d76092;
    --dark-bg: #0a0a0a;
    --darker-bg: #0e0e0e;
    --ax-line: rgba(255,255,255,.13);
    --ax-muted: #9d9a93;
  }

  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin: 0; background: #080808 !important; color: #f3efe6; }
  body, button, input, textarea, select { font-family: Arial, Helvetica, sans-serif !important; }
  h1, h2, h3, h4, h5, h6 { font-family: Arial, Helvetica, sans-serif !important; letter-spacing: -.035em !important; }

  .ax-site { min-height:100vh; background:#080808; color:#f3efe6; direction:rtl; }
  .ax-container { width:min(1380px, calc(100% - 48px)); margin:0 auto; }

  .ax-header {
    position:sticky; top:0; z-index:60; border-bottom:1px solid var(--ax-line);
    background:rgba(8,8,8,.86); backdrop-filter:blur(14px);
  }
  .ax-header-inner { height:90px; display:flex; align-items:center; justify-content:space-between; gap:28px; }
  .ax-brand { display:flex; align-items:center; gap:13px; color:#fff; text-decoration:none; min-width:max-content; }
  .ax-brand img { width:52px; height:52px; object-fit:contain; filter:grayscale(1) brightness(1.85); }
  .ax-brand strong { font-size:15px; }
  .ax-nav { display:flex; align-items:center; gap:23px; }
  .ax-nav a { color:#cbc7be; text-decoration:none; font-size:14px; transition:.2s; position:relative; }
  .ax-nav a:hover, .ax-nav a.ax-active { color:var(--gold); }
  .ax-nav a.ax-active::after { content:""; width:5px; height:5px; border-radius:50%; background:var(--gold); position:absolute; right:50%; transform:translateX(50%); bottom:-12px; }
  .ax-nav .ax-nav-cta { border:1px solid rgba(215,180,81,.55); border-radius:999px; padding:11px 18px; color:var(--gold); }
  .ax-menu-btn { display:none; background:none; color:#fff; border:0; padding:8px; }
  .ax-mobile-nav { display:none; }

  .ax-main { min-height:70vh; background:#080808; }

  /* Global redesign for the existing pages */
  .dark-bg, .darker-bg, .bg-gray-900, .bg-slate-900 { background:#080808 !important; }
  .bg-gray-800, .bg-gray-700, .bg-slate-800 { background:#101010 !important; }
  .border-gray-700, .border-gray-800, .border-gray-600 { border-color:var(--ax-line) !important; }
  .text-gray-300 { color:#bbb7ae !important; }
  .text-gray-400, .text-gray-500 { color:#88857f !important; }
  .gold-text { color:var(--gold) !important; }
  .pink-text { color:var(--soft-pink) !important; }
  .white-text { color:#f5f1e9 !important; }

  .ax-main > * { background:#080808 !important; }
  .ax-main section { border-color:var(--ax-line) !important; }
  .ax-main h1 {
    font-size:clamp(54px, 7.2vw, 112px) !important;
    line-height:.92 !important; letter-spacing:-.055em !important;
    color:#f4f0e8 !important; margin-bottom:34px !important;
  }
  .ax-main h2 { letter-spacing:-.045em !important; }

  .ax-main [class*="max-w-7xl"], .ax-main [class*="max-w-6xl"] { max-width:1380px !important; }
  .ax-main [class*="rounded-lg"], .ax-main [class*="rounded-xl"] { border-radius:2px !important; }

  .ax-main [class*="shadow"], .ax-main .elegant-shadow {
    box-shadow:none !important; border:1px solid var(--ax-line) !important;
  }

  .ax-main button:not([role="combobox"]), .ax-main a.btn-gold, .ax-main .btn-gold {
    border-radius:999px !important; background:var(--gold) !important; color:#0a0a0a !important;
    border:1px solid var(--gold) !important; font-weight:700 !important;
    box-shadow:none !important;
  }
  .ax-main button:not([role="combobox"]):hover, .ax-main .btn-gold:hover {
    transform:translateY(-2px); background:#e2c467 !important;
  }

  .ax-main input, .ax-main textarea, .ax-main select, .ax-main [role="combobox"] {
    background:#0d0d0d !important; color:#f5f1e9 !important; border:1px solid var(--ax-line) !important;
    border-radius:2px !important; box-shadow:none !important;
  }
  .ax-main input:focus, .ax-main textarea:focus { border-color:rgba(215,180,81,.65) !important; }

  .ax-main [class*="Card"], .ax-main .card { background:#0d0d0d !important; }

  /* Give page headers an editorial Axtra feel */
  .ax-main > div > section:first-child, .ax-main > section:first-child {
    border-bottom:1px solid var(--ax-line) !important;
  }

  .ax-footer { border-top:1px solid var(--ax-line); background:#050505; }
  .ax-footer-top { padding:72px 0 56px; display:grid; grid-template-columns:1.2fr .8fr .8fr; gap:60px; }
  .ax-footer-title { font-size:clamp(34px,4vw,64px); line-height:1; margin:0 0 20px; letter-spacing:-.05em; }
  .ax-footer p, .ax-footer a { color:#8d8a84; text-decoration:none; line-height:1.8; }
  .ax-footer a:hover { color:var(--gold); }
  .ax-footer h4 { color:var(--gold); font-size:13px; letter-spacing:.13em !important; margin:0 0 22px; }
  .ax-footer-links { display:flex; flex-direction:column; gap:12px; }
  .ax-contact-row { display:flex; align-items:center; gap:10px; margin-bottom:13px; color:#9d9992; }
  .ax-footer-bottom { border-top:1px solid var(--ax-line); min-height:68px; display:flex; align-items:center; justify-content:space-between; gap:20px; color:#666; font-size:12px; }
  .ax-footer-mark { color:var(--gold); display:flex; align-items:center; gap:9px; }

  @media (max-width: 1000px) {
    .ax-nav { display:none; }
    .ax-menu-btn { display:block; }
    .ax-mobile-nav { display:flex; flex-direction:column; border-top:1px solid var(--ax-line); }
    .ax-mobile-nav a { color:#f3efe6; text-decoration:none; padding:16px 24px; border-bottom:1px solid var(--ax-line); }
    .ax-footer-top { grid-template-columns:1fr 1fr; }
  }
  @media (max-width: 700px) {
    .ax-container { width:min(100% - 28px, 1380px); }
    .ax-header-inner { height:74px; }
    .ax-brand img { width:43px; height:43px; }
    .ax-brand strong { display:none; }
    .ax-main h1 { font-size:clamp(46px, 14vw, 76px) !important; }
    .ax-footer-top { grid-template-columns:1fr; gap:38px; padding-top:54px; }
    .ax-footer-bottom { align-items:flex-start; flex-direction:column; padding:22px 0; }
  }
`;

function PreviewHeader() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (page) =>
    location.pathname === createPageUrl(page) || (page === "Home" && location.pathname === "/");

  return (
    <header className="ax-header">
      <div className="ax-container ax-header-inner">
        <Link to="/" className="ax-brand">
          <img src="/logo.png" alt="לוגו ריקוד ברוח הטובה" />
          <strong>ריקוד ברוח הטובה</strong>
        </Link>
        <nav className="ax-nav">
          {navLinks.map((link) => (
            <Link
              key={link.page}
              to={createPageUrl(link.page)}
              className={`${isActive(link.page) ? "ax-active" : ""} ${link.cta ? "ax-nav-cta" : ""}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <button className="ax-menu-btn" onClick={() => setOpen((v) => !v)} aria-label="תפריט">
          {open ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>
      {open && (
        <nav className="ax-mobile-nav">
          {navLinks.map((link) => (
            <Link key={link.page} to={createPageUrl(link.page)} onClick={() => setOpen(false)}>
              {link.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

function PreviewFooter() {
  return (
    <footer className="ax-footer">
      <div className="ax-container">
        <div className="ax-footer-top">
          <div>
            <h2 className="ax-footer-title">לרקוד. להתקדם.<br />להרגיש בבית.</h2>
            <p>בית ספר למחול, תנועה ואקרודאנס באווירה מקצועית, איכותית ושמורה.</p>
          </div>
          <div>
            <h4>ניווט</h4>
            <div className="ax-footer-links">
              <Link to="/Classes">חוגים</Link>
              <Link to="/Locations">סניפים</Link>
              <Link to="/Performances">הופעות</Link>
              <Link to="/About">אודות</Link>
              <Link to="/Registration">הרשמה</Link>
            </div>
          </div>
          <div>
            <h4>יצירת קשר</h4>
            <div className="ax-contact-row"><Phone size={16} /><span>03-3130565</span></div>
            <div className="ax-contact-row"><Mail size={16} /><span>b0527182273@gmail.com</span></div>
          </div>
        </div>
        <div className="ax-footer-bottom">
          <span>© ריקוד ברוח הטובה</span>
          <Link className="ax-footer-mark" to="/Contact">דברי איתנו <ArrowUpLeft size={16} /></Link>
        </div>
      </div>
    </footer>
  );
}

export default function AppLayout({ children }) {
  useEffect(() => {
    document.title = "ריקוד ברוח הטובה — Preview";
  }, []);

  return (
    <div className="ax-site">
      <style>{previewStyles}</style>
      <PreviewHeader />
      <main className="ax-main">{children}</main>
      <PreviewFooter />
    </div>
  );
}
