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
  }

  body,
  .landing-preview {
    background: var(--preview-cream) !important;
    color: var(--preview-ink) !important;
  }

  .landing-nav {
    background: rgba(255,249,244,.93) !important;
    border-bottom-color: rgba(43,35,39,.1) !important;
  }
  .landing-brand,
  .landing-link,
  .landing-menu-button { color: var(--preview-ink) !important; }
  .landing-brand img { filter: none !important; }
  .landing-link:hover,
  .landing-link.active { color: #9A7420 !important; }
  .landing-link.cta {
    background: var(--preview-gold) !important;
    border-color: var(--preview-gold) !important;
    color: #241d16 !important;
  }
  .landing-mobile-menu { background: var(--preview-cream) !important; }
  .landing-mobile-link { color: var(--preview-ink) !important; }

  /* Hero remains the main pink statement. */
  #home.landing-hero {
    background:
      radial-gradient(circle at 78% 22%, rgba(212,175,55,.2), transparent 24%),
      linear-gradient(180deg, #F3D9E4 0%, #F8E8EF 100%) !important;
  }
  #home .landing-title,
  #home .landing-hero-description,
  #home .landing-scroll-button { color: var(--preview-ink) !important; }
  #home .landing-title .outline { -webkit-text-stroke: 1px rgba(43,35,39,.56) !important; }
  #home .landing-eyebrow { color: #7D5C68 !important; }
  #home .landing-hero-copy { border-left-color: rgba(43,35,39,.1) !important; }
  #home .landing-scroll-circle { border-color: rgba(43,35,39,.18) !important; }
  #home .landing-hero-art::before,
  #home .landing-hero-art::after { border-color: rgba(154,116,32,.28) !important; }
  #home .landing-hero-word { color: rgba(43,35,39,.05) !important; }

  /* Most sections go back to cream/white. */
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

  /* ABOUT: subtle pink hero and alternating soft cards. */
  #about .about-hero { background: var(--preview-white) !important; }
  #about .about-hero-copy { background: #F9E8EF !important; border-color: rgba(43,35,39,.1) !important; }
  #about .about-hero-art {
    background:
      radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(212,175,55,.24), transparent 23%),
      linear-gradient(145deg,#FFF9F4,#F5E7C8) !important;
  }
  #about .about-story-preview,
  #about .about-value { background: var(--preview-white) !important; }
  #about .about-value:nth-child(2),
  #about .about-value:nth-child(4) { background: #FAEDF2 !important; }
  #about .about-cta {
    background: linear-gradient(110deg, #E8B4CB, #F0D8E3 52%, #E8D9A5) !important;
  }
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
  #about .about-values,
  #about .about-value,
  #about .about-section,
  #about .about-hero { border-color: rgba(43,35,39,.1) !important; }

  /* CLASSES: calm cream base, only every second copy block gets colour. */
  #classes .book-shell,
  #classes .book-scroller { background: var(--preview-cream) !important; color: var(--preview-ink) !important; }
  #classes .book-slide { border-color: rgba(43,35,39,.1) !important; }
  #classes .book-copy { background: var(--preview-white) !important; }
  #classes .book-slide:nth-child(2n) .book-copy { background: #F9E8EF !important; }
  #classes .book-visual { background: #F5EFEA !important; }
  #classes .book-slide:nth-child(3n) .book-visual { background: #F5E9C7 !important; }
  #classes .book-copy,
  #classes .book-meta { border-color: rgba(43,35,39,.12) !important; }
  #classes .book-title,
  #classes .book-subtitle,
  #classes .book-meta-item { color: var(--preview-ink) !important; }
  #classes .book-description,
  #classes .book-levels { color: var(--preview-muted) !important; }
  #classes .book-chip {
    color: var(--preview-ink) !important;
    border-color: rgba(43,35,39,.14) !important;
    background: rgba(255,255,255,.58) !important;
  }
  #classes .book-word { color: rgba(43,35,39,.045) !important; }
  #classes .book-bottom { background: var(--preview-gold-soft) !important; color: var(--preview-ink) !important; }

  /* LOCATIONS: neutral cards, with soft pink accents only. */
  #locations article {
    background: var(--preview-white) !important;
    border-color: rgba(43,35,39,.1) !important;
  }
  #locations article:nth-child(3n+2) { background: #FAEDF2 !important; }
  #locations [class*="text-white"] { color: var(--preview-ink) !important; }
  #locations [class*="text-white/"] { color: var(--preview-muted) !important; }
  #locations [class*="border-white/"] { border-color: rgba(43,35,39,.1) !important; }
  #locations .pin-popover { background: rgba(255,249,244,.96) !important; color: var(--preview-ink) !important; }

  /* PERFORMANCES: mostly white cards, one gold-accent strip through the section heading. */
  #performances .relative.darker-bg.py-20,
  #performances .border-y { background: var(--preview-gold-soft) !important; }
  #performances .group {
    background: var(--preview-white) !important;
    border-color: rgba(43,35,39,.1) !important;
  }
  #performances .group:nth-child(even) { background: #FAEDF2 !important; }
  #performances .white-text,
  #performances [class*="text-white"] { color: var(--preview-ink) !important; }
  #performances [class*="text-gray-"] { color: var(--preview-muted) !important; }

  /* SHOP: neutral base with a pink section header. */
  #shop section:first-of-type { background: #F9E8EF !important; }
  #shop .group {
    background: var(--preview-white) !important;
    border-color: rgba(43,35,39,.1) !important;
  }
  #shop .group:nth-child(3n+2) { background: #F8F1E1 !important; }
  #shop .white-text,
  #shop [class*="text-white"] { color: var(--preview-ink) !important; }
  #shop [class*="text-gray-"] { color: var(--preview-muted) !important; }

  /* CONTACT: white page, only form card pink. */
  #contact .elegant-shadow {
    background: var(--preview-white) !important;
    border-color: rgba(43,35,39,.1) !important;
  }
  #contact form { background: transparent !important; }
  #contact .max-w-7xl > .elegant-shadow:first-child { background: #FAEDF2 !important; }
  #contact .white-text,
  #contact [class*="text-white"] { color: var(--preview-ink) !important; }
  #contact [class*="text-gray-"] { color: var(--preview-muted) !important; }
  #contact input,
  #contact textarea {
    background: var(--preview-white) !important;
    color: var(--preview-ink) !important;
    border-color: rgba(43,35,39,.14) !important;
  }
  #contact .bg-pink-600 { background: var(--preview-pink-strong) !important; color: var(--preview-ink) !important; }

  /* REGISTRATION: only intro and selected cards carry colour. */
  #registration section:first-of-type { background: var(--preview-gold-soft) !important; }
  #registration .group,
  #registration .elegant-shadow {
    background: var(--preview-white) !important;
    border-color: rgba(43,35,39,.1) !important;
  }
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
  }
  .btn-gold:hover {
    background: var(--preview-pink-strong) !important;
    border-color: var(--preview-pink-strong) !important;
    color: var(--preview-ink) !important;
  }
  .btn-outline-pink {
    border-color: #B76C8B !important;
    color: #7E435A !important;
    background: rgba(255,255,255,.54) !important;
  }
  .btn-outline-pink:hover { background: var(--preview-pink-strong) !important; color: var(--preview-ink) !important; }

  [class*="text-[#C9F31D]"] { color: #9A7420 !important; }
  [class*="hover:text-[#C9F31D]"]:hover { color: #B76C8B !important; }
  [class*="bg-[#C9F31D]"] { background-color: var(--preview-gold) !important; }
  [class*="border-[#C9F31D]"] { border-color: var(--preview-gold) !important; }
  [class*="ring-[#C9F31D]"] { --tw-ring-color: var(--preview-gold) !important; }
  [fill="#C9F31D"] { fill: var(--preview-gold) !important; }
  [stroke="#C9F31D"] { stroke: var(--preview-gold) !important; }

  .landing-section { border-bottom-color: rgba(43,35,39,.1) !important; }
  .landing-section-label { color: #8D6817 !important; }
  .landing-footer { background: #F3D9E4 !important; color: var(--preview-ink) !important; }

  /* Keep dark only where it helps photos/map contrast. */
  #performances .relative.h-80,
  #shop .relative.h-56,
  #locations .relative.min-h-\[620px\],
  #locations .relative.min-h-\[700px\],
  #locations .relative.min-h-\[760px\] { background: #171214 !important; }

  @media (max-width: 760px) {
    .landing-nav { background: rgba(255,249,244,.97) !important; }
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
