import OnePagePreview from "./OnePagePreview";
import PreviewInteractions from "./PreviewInteractions";
import PreviewMotionGuard from "./PreviewMotionGuard";
import { BrowserRouter as Router, useLocation } from 'react-router-dom';

const legacySectionMap = {
  '/Home': 'home',
  '/PreviewAxtra': 'home',
  '/About': 'about',
  '/Classes': 'classes',
  '/Locations': 'locations',
  '/Performances': 'performances',
  '/Shop': 'shop',
  '/Contact': 'contact',
  '/Registration': 'registration',
};

const previewPalette = `
  :root {
    --ax-accent: #D4AF37 !important;
    --ax-gold: #D4AF37 !important;
    --ax-pink: #E8B4CB !important;
    --book-accent: #D4AF37 !important;
    --preview-ink: #2B2327;
    --preview-muted: #6E6066;
    --preview-cream: #FFF9F4;
    --preview-white: #FFFFFF;
    --preview-pink: #F3D9E4;
    --preview-pink-strong: #E8B4CB;
    --preview-gold: #D4AF37;
    --preview-gold-soft: #F0E2B8;
    --preview-line: rgba(43,35,39,.10);
    --preview-shadow: 0 18px 50px rgba(74,53,61,.08);
  }

  body,
  .landing-preview {
    background: var(--preview-cream) !important;
    color: var(--preview-ink) !important;
  }

  /* Boutique-style top navigation */
  .landing-nav {
    background: rgba(255,249,244,.94) !important;
    border-bottom: 1px solid var(--preview-line) !important;
    box-shadow: 0 5px 24px rgba(63,43,51,.035);
  }
  .landing-brand,
  .landing-link,
  .landing-menu-button { color: var(--preview-ink) !important; }
  .landing-brand img { filter: none !important; }
  .landing-link { font-size: 13px !important; font-weight: 600; }
  .landing-link:hover,
  .landing-link.active { color: #9A7420 !important; }
  .landing-link.cta {
    background: var(--preview-gold) !important;
    border-color: var(--preview-gold) !important;
    color: #241d16 !important;
    padding-inline: 22px !important;
  }
  .landing-mobile-menu { background: var(--preview-cream) !important; }
  .landing-mobile-link { color: var(--preview-ink) !important; }

  /* Large editorial headings are always visible and dominant. */
  .landing-section h1,
  .landing-section h2 {
    color: var(--preview-ink);
  }
  #about .about-title,
  #about .about-head h2,
  #classes .book-title,
  #locations section:first-of-type h1,
  #performances section:first-of-type h1,
  #shop section:first-of-type h1,
  #contact section:first-of-type h1,
  #registration section:first-of-type h1 {
    font-size: clamp(58px, 8vw, 118px) !important;
    line-height: .91 !important;
    letter-spacing: -.055em !important;
    font-weight: 600 !important;
  }
  #locations h2,
  #performances section:last-of-type h2 {
    font-size: clamp(42px, 5.3vw, 78px) !important;
    line-height: .98 !important;
    letter-spacing: -.045em !important;
  }

  /* Hero remains the strongest pink statement. */
  #home.landing-hero {
    background:
      radial-gradient(circle at 80% 20%, rgba(212,175,55,.18), transparent 24%),
      linear-gradient(180deg, #F3D9E4 0%, #F8E8EF 100%) !important;
  }
  #home .landing-title,
  #home .landing-hero-description,
  #home .landing-scroll-button { color: var(--preview-ink) !important; }
  #home .landing-title .outline { -webkit-text-stroke: 1px rgba(43,35,39,.56) !important; }
  #home .landing-eyebrow { color: #7D5C68 !important; }
  #home .landing-hero-copy { border-left-color: var(--preview-line) !important; }
  #home .landing-scroll-circle { border-color: rgba(43,35,39,.18) !important; }
  #home .landing-hero-art::before,
  #home .landing-hero-art::after { border-color: rgba(154,116,32,.28) !important; }
  #home .landing-hero-word { color: rgba(43,35,39,.05) !important; }

  /* More whitespace between editorial sections. */
  #about .about-section,
  #locations > main > section,
  #performances section,
  #shop section,
  #contact section,
  #registration section {
    padding-top: clamp(72px, 8vw, 120px) !important;
    padding-bottom: clamp(72px, 8vw, 120px) !important;
  }

  /* Neutral canvas */
  #about,
  #about .aboutx,
  #about .about-section,
  #about .about-story,
  #about .about-accordion,
  #locations,
  #locations main,
  #locations section,
  #performances,
  #performances .dark-bg,
  #performances .darker-bg,
  #performances section,
  #shop,
  #shop .dark-bg,
  #shop .darker-bg,
  #shop section,
  #contact,
  #contact .dark-bg,
  #contact .darker-bg,
  #contact section,
  #registration,
  #registration .dark-bg,
  #registration .darker-bg,
  #registration section {
    background: var(--preview-cream) !important;
    color: var(--preview-ink) !important;
  }

  /* About: editorial split with soft colour panels. */
  #about .about-hero { background: var(--preview-white) !important; }
  #about .about-hero-copy { background: #F9E8EF !important; border-color: var(--preview-line) !important; }
  #about .about-hero-art {
    background: radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(212,175,55,.24), transparent 23%), linear-gradient(145deg,#FFF9F4,#F5E7C8) !important;
  }
  #about .about-story-preview,
  #about .about-value { background: var(--preview-white) !important; }
  #about .about-value:nth-child(2),
  #about .about-value:nth-child(4) { background: #FAEDF2 !important; }
  #about .about-value {
    border-radius: 18px !important;
    border: 1px solid var(--preview-line) !important;
    margin: 8px !important;
    box-shadow: none !important;
  }
  #about .about-values { gap: 8px; border: 0 !important; background: transparent !important; }
  #about .about-story-preview { border-radius: 22px !important; box-shadow: var(--preview-shadow); }
  #about .about-cta { background: linear-gradient(110deg, #E8B4CB, #F0D8E3 52%, #E8D9A5) !important; }
  #about .about-title,
  #about .about-head h2,
  #about .about-value h3,
  #about .about-step-title { color: var(--preview-ink) !important; }
  #about .about-lead,
  #about .about-story-preview p,
  #about .about-value p,
  #about .about-step-body { color: var(--preview-muted) !important; }
  #about .about-step:hover,
  #about .about-step.active { background: #FBEEF3 !important; }
  #about .about-step,
  #about .about-section,
  #about .about-hero { border-color: var(--preview-line) !important; }

  /* Classes become straight catalogue/editorial blocks. */
  #classes .book-shell,
  #classes .book-scroller { background: var(--preview-cream) !important; color: var(--preview-ink) !important; }
  #classes .book-slide {
    width: min(1380px, calc(100% - 40px));
    margin: 26px auto !important;
    border: 1px solid var(--preview-line) !important;
    border-radius: 24px !important;
    overflow: hidden;
    background: var(--preview-white) !important;
    box-shadow: var(--preview-shadow);
  }
  #classes .book-copy { background: var(--preview-white) !important; }
  #classes .book-slide:nth-child(2n) .book-copy { background: #FAEDF2 !important; }
  #classes .book-visual { background: #F5EFEA !important; }
  #classes .book-slide:nth-child(3n) .book-visual { background: #F5E9C7 !important; }
  #classes .book-copy,
  #classes .book-meta { border-color: var(--preview-line) !important; }
  #classes .book-title,
  #classes .book-subtitle,
  #classes .book-meta-item { color: var(--preview-ink) !important; }
  #classes .book-description,
  #classes .book-levels { color: var(--preview-muted) !important; }
  #classes .book-chip {
    color: var(--preview-ink) !important;
    border-color: rgba(43,35,39,.12) !important;
    background: rgba(255,255,255,.72) !important;
  }
  #classes .book-word { color: rgba(43,35,39,.04) !important; }
  #classes .book-bottom {
    width: min(1380px, calc(100% - 40px));
    margin: 26px auto 70px !important;
    border-radius: 24px !important;
    background: var(--preview-gold-soft) !important;
    color: var(--preview-ink) !important;
  }

  /* Shared product/card language inspired by airy boutique catalogues. */
  #locations article,
  #performances article,
  #shop article,
  #registration .group,
  #contact .elegant-shadow {
    border: 1px solid var(--preview-line) !important;
    border-radius: 22px !important;
    overflow: hidden;
    box-shadow: 0 10px 34px rgba(74,53,61,.055) !important;
    transform: none !important;
  }

  #locations article {
    background: var(--preview-white) !important;
    min-height: 285px !important;
  }
  #locations article:nth-child(3n+2) { background: #FAEDF2 !important; }
  #locations [class*="text-white"] { color: var(--preview-ink) !important; }
  #locations [class*="text-white/"] { color: var(--preview-muted) !important; }
  #locations [class*="border-white/"] { border-color: var(--preview-line) !important; }
  #locations .pin-popover { background: rgba(255,249,244,.97) !important; color: var(--preview-ink) !important; border-radius: 16px !important; }

  #performances .relative.darker-bg.py-20,
  #performances .border-y { background: var(--preview-gold-soft) !important; }
  #performances article { background: var(--preview-white) !important; }
  #performances article:nth-child(even) { background: #FAEDF2 !important; }
  #performances article .relative.h-80 { border-radius: 0 !important; }
  #performances .white-text,
  #performances [class*="text-white"] { color: var(--preview-ink) !important; }
  #performances [class*="text-gray-"] { color: var(--preview-muted) !important; }

  #shop section:first-of-type { background: #F9E8EF !important; }
  #shop article { background: var(--preview-white) !important; }
  #shop article:nth-child(3n+2) { background: #F8F1E1 !important; }
  #shop .white-text,
  #shop [class*="text-white"] { color: var(--preview-ink) !important; }
  #shop [class*="text-gray-"] { color: var(--preview-muted) !important; }

  #contact .elegant-shadow { background: var(--preview-white) !important; }
  #contact .max-w-7xl > .elegant-shadow:first-child { background: #FAEDF2 !important; }
  #contact .white-text,
  #contact [class*="text-white"] { color: var(--preview-ink) !important; }
  #contact [class*="text-gray-"] { color: var(--preview-muted) !important; }
  #contact input,
  #contact textarea {
    background: var(--preview-white) !important;
    color: var(--preview-ink) !important;
    border-color: rgba(43,35,39,.14) !important;
    border-radius: 12px !important;
  }
  #contact .bg-pink-600 { background: var(--preview-pink-strong) !important; color: var(--preview-ink) !important; }

  #registration section:first-of-type { background: var(--preview-gold-soft) !important; }
  #registration .group,
  #registration .elegant-shadow { background: var(--preview-white) !important; }
  #registration .group:nth-child(2) { background: #FAEDF2 !important; }
  #registration .white-text,
  #registration [class*="text-white"] { color: var(--preview-ink) !important; }
  #registration [class*="text-gray-"] { color: var(--preview-muted) !important; }
  #registration [class*="bg-gray-"] { background: #F6F1ED !important; }

  .gold-text { color: #9A7420 !important; }
  .pink-text { color: #B76C8B !important; }
  .btn-gold,
  button.btn-gold,
  a.btn-gold {
    background: var(--preview-gold) !important;
    border-color: var(--preview-gold) !important;
    color: #251d12 !important;
    border-radius: 999px !important;
  }
  .btn-gold:hover {
    background: var(--preview-pink-strong) !important;
    border-color: var(--preview-pink-strong) !important;
    color: var(--preview-ink) !important;
  }
  .btn-outline-pink {
    border-color: #B76C8B !important;
    color: #7E435A !important;
    background: rgba(255,255,255,.62) !important;
    border-radius: 999px !important;
  }
  .btn-outline-pink:hover { background: var(--preview-pink-strong) !important; color: var(--preview-ink) !important; }

  [class*="text-[#C9F31D]"] { color: #9A7420 !important; }
  [class*="hover:text-[#C9F31D]"]:hover { color: #B76C8B !important; }
  [class*="bg-[#C9F31D]"] { background-color: var(--preview-gold) !important; }
  [class*="border-[#C9F31D]"] { border-color: var(--preview-gold) !important; }
  [class*="ring-[#C9F31D]"] { --tw-ring-color: var(--preview-gold) !important; }
  [fill="#C9F31D"] { fill: var(--preview-gold) !important; }
  [stroke="#C9F31D"] { stroke: var(--preview-gold) !important; }

  .landing-section { border-bottom-color: var(--preview-line) !important; }
  .landing-section-label { color: #8D6817 !important; }
  .landing-footer { background: #F3D9E4 !important; color: var(--preview-ink) !important; }

  /* Keep dark only where photos/map need contrast. */
  #performances .relative.h-80,
  #shop .relative.h-56,
  #locations .relative.min-h-\[620px\],
  #locations .relative.min-h-\[700px\],
  #locations .relative.min-h-\[760px\] { background: #171214 !important; }

  @media (max-width: 760px) {
    .landing-nav { background: rgba(255,249,244,.97) !important; }
    #classes .book-slide,
    #classes .book-bottom { width: calc(100% - 20px) !important; border-radius: 18px !important; }
    #about .about-title,
    #about .about-head h2,
    #classes .book-title,
    #locations section:first-of-type h1,
    #performances section:first-of-type h1,
    #shop section:first-of-type h1,
    #contact section:first-of-type h1,
    #registration section:first-of-type h1 { font-size: clamp(48px, 15vw, 76px) !important; }
  }
`;

function PagesContent() {
  const location = useLocation();
  const initialSection = legacySectionMap[location.pathname] || 'home';

  return (
    <>
      <OnePagePreview initialSection={initialSection} />
      <PreviewInteractions />
      <PreviewMotionGuard />
      <style>{previewPalette}</style>
    </>
  );
}

export default function Pages() {
  return <Router><PagesContent /></Router>;
}
