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
    --preview-cream: #FFF8F2;
    --preview-pink: #F3D3E0;
    --preview-pink-strong: #E8B4CB;
    --preview-gold: #D4AF37;
    --preview-gold-soft: #E9D28C;
  }

  body,
  .landing-preview {
    background: var(--preview-cream) !important;
    color: var(--preview-ink) !important;
  }

  /* Navigation: light, airy and readable. */
  .landing-nav {
    background: rgba(255, 248, 242, .9) !important;
    border-bottom-color: rgba(43,35,39,.12) !important;
  }
  .landing-brand,
  .landing-link,
  .landing-menu-button { color: var(--preview-ink) !important; }
  .landing-brand img { filter: none !important; }
  .landing-mark { color: #8b777f !important; }
  .landing-link:hover,
  .landing-link.active { color: #9A7420 !important; }
  .landing-link.cta {
    background: var(--preview-gold) !important;
    border-color: var(--preview-gold) !important;
    color: #241d16 !important;
  }
  .landing-mobile-menu { background: var(--preview-cream) !important; }
  .landing-mobile-link {
    color: var(--preview-ink) !important;
    border-bottom-color: rgba(43,35,39,.1) !important;
  }

  /* Hero: full light pink instead of black. */
  #home.landing-hero {
    background:
      radial-gradient(circle at 82% 22%, rgba(212,175,55,.32), transparent 25%),
      radial-gradient(circle at 18% 70%, rgba(255,255,255,.7), transparent 30%),
      var(--preview-pink) !important;
  }
  #home .landing-title,
  #home .landing-hero-description,
  #home .landing-scroll-button { color: var(--preview-ink) !important; }
  #home .landing-title .outline {
    -webkit-text-stroke: 1px rgba(43,35,39,.62) !important;
  }
  #home .landing-eyebrow { color: #7D5C68 !important; }
  #home .landing-hero-copy { border-left-color: rgba(43,35,39,.12) !important; }
  #home .landing-scroll-circle { border-color: rgba(43,35,39,.25) !important; }
  #home .landing-hero-art::before,
  #home .landing-hero-art::after { border-color: rgba(154,116,32,.35) !important; }
  #home .landing-hero-word { color: rgba(43,35,39,.06) !important; }

  /* ABOUT: cream base, pink values, gold CTA. */
  #about,
  #about .aboutx,
  #about .about-section,
  #about .about-story,
  #about .about-accordion { background: var(--preview-cream) !important; color: var(--preview-ink) !important; }
  #about .about-hero { background: var(--preview-cream) !important; }
  #about .about-hero-copy { background: var(--preview-pink) !important; border-color: rgba(43,35,39,.12) !important; }
  #about .about-hero-art {
    background:
      radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(212,175,55,.35), transparent 24%),
      linear-gradient(145deg,#f7e7ee,#ead09a) !important;
  }
  #about .about-title,
  #about .about-head h2,
  #about .about-value h3,
  #about .about-step-title { color: var(--preview-ink) !important; }
  #about .about-title span { -webkit-text-stroke: 1px rgba(43,35,39,.55) !important; }
  #about .about-lead,
  #about .about-story-preview p,
  #about .about-value p,
  #about .about-step-body { color: var(--preview-muted) !important; }
  #about .about-story-preview { background: #FCECF3 !important; border-color: rgba(43,35,39,.12) !important; }
  #about .about-step,
  #about .about-values,
  #about .about-value,
  #about .about-section,
  #about .about-hero { border-color: rgba(43,35,39,.12) !important; }
  #about .about-value { background: var(--preview-pink) !important; }
  #about .about-value:nth-child(even) { background: var(--preview-gold-soft) !important; }
  #about .about-step:hover,
  #about .about-step.active { background: #F8E4EC !important; }
  #about .about-cta {
    background: linear-gradient(110deg, #D4AF37, #E9D28C 52%, #E8B4CB) !important;
  }

  /* CLASSES: alternating full colour panels. */
  #classes .book-shell,
  #classes .book-scroller { background: var(--preview-cream) !important; color: var(--preview-ink) !important; }
  #classes .book-slide { border-color: rgba(43,35,39,.12) !important; }
  #classes .book-slide:nth-child(3n+1) .book-copy { background: var(--preview-pink) !important; }
  #classes .book-slide:nth-child(3n+2) .book-copy { background: var(--preview-gold-soft) !important; }
  #classes .book-slide:nth-child(3n) .book-copy { background: var(--preview-cream) !important; }
  #classes .book-slide:nth-child(3n+1) .book-visual { background: #F9E8EF !important; }
  #classes .book-slide:nth-child(3n+2) .book-visual { background: #F4E5B8 !important; }
  #classes .book-slide:nth-child(3n) .book-visual { background: #FFF2E7 !important; }
  #classes .book-copy,
  #classes .book-meta { border-color: rgba(43,35,39,.14) !important; }
  #classes .book-title,
  #classes .book-subtitle,
  #classes .book-meta-item { color: var(--preview-ink) !important; }
  #classes .book-description,
  #classes .book-levels { color: var(--preview-muted) !important; }
  #classes .book-chip {
    color: var(--preview-ink) !important;
    border-color: rgba(43,35,39,.18) !important;
    background: rgba(255,255,255,.42) !important;
  }
  #classes .book-word { color: rgba(43,35,39,.055) !important; }
  #classes .book-bottom {
    background: var(--preview-pink-strong) !important;
    color: var(--preview-ink) !important;
  }

  /* LOCATIONS: cream section, pink cards, map stays as one intentional dark accent. */
  #locations,
  #locations main,
  #locations section { background: var(--preview-cream) !important; color: var(--preview-ink) !important; }
  #locations article {
    background: var(--preview-pink) !important;
    border-color: rgba(43,35,39,.12) !important;
  }
  #locations article:nth-child(3n+2) { background: var(--preview-gold-soft) !important; }
  #locations article:nth-child(3n) { background: #FFF1E7 !important; }
  #locations [class*="text-white"] { color: var(--preview-ink) !important; }
  #locations [class*="text-white/"] { color: var(--preview-muted) !important; }
  #locations [class*="border-white/"] { border-color: rgba(43,35,39,.12) !important; }
  #locations .pin-popover {
    background: rgba(255,248,242,.96) !important;
    color: var(--preview-ink) !important;
  }
  #locations .relative.min-h-\[620px\],
  #locations .relative.min-h-\[700px\],
  #locations .relative.min-h-\[760px\] {
    background: #171214 !important;
  }

  /* PERFORMANCES: a bold full gold section with pale cards. */
  #performances,
  #performances .dark-bg,
  #performances .darker-bg,
  #performances section { background: var(--preview-gold-soft) !important; color: var(--preview-ink) !important; }
  #performances .group {
    background: var(--preview-cream) !important;
    border-color: rgba(43,35,39,.13) !important;
  }
  #performances .group:nth-child(even) { background: var(--preview-pink) !important; }
  #performances .white-text,
  #performances [class*="text-white"] { color: var(--preview-ink) !important; }
  #performances [class*="text-gray-"] { color: var(--preview-muted) !important; }
  #performances [class*="border-white/"] { border-color: rgba(43,35,39,.13) !important; }

  /* SHOP: full pink section with cream/gold cards. */
  #shop,
  #shop .dark-bg,
  #shop .darker-bg,
  #shop section { background: var(--preview-pink) !important; color: var(--preview-ink) !important; }
  #shop .group {
    background: var(--preview-cream) !important;
    border-color: rgba(43,35,39,.13) !important;
  }
  #shop .group:nth-child(3n+2) { background: var(--preview-gold-soft) !important; }
  #shop .white-text,
  #shop [class*="text-white"] { color: var(--preview-ink) !important; }
  #shop [class*="text-gray-"] { color: var(--preview-muted) !important; }

  /* CONTACT: light cream background, pink form and gold contact panel. */
  #contact,
  #contact .dark-bg,
  #contact .darker-bg,
  #contact section { background: var(--preview-cream) !important; color: var(--preview-ink) !important; }
  #contact .elegant-shadow { background: var(--preview-pink) !important; border-color: rgba(43,35,39,.13) !important; }
  #contact .space-y-8 .elegant-shadow { background: var(--preview-gold-soft) !important; }
  #contact .white-text,
  #contact [class*="text-white"] { color: var(--preview-ink) !important; }
  #contact [class*="text-gray-"] { color: var(--preview-muted) !important; }
  #contact input,
  #contact textarea {
    background: rgba(255,255,255,.6) !important;
    color: var(--preview-ink) !important;
    border-color: rgba(43,35,39,.16) !important;
  }
  #contact .bg-pink-600 { background: var(--preview-pink-strong) !important; color: var(--preview-ink) !important; }

  /* REGISTRATION: gold foundation, pink cards, cream pricing areas. */
  #registration,
  #registration .dark-bg,
  #registration .darker-bg,
  #registration section { background: var(--preview-gold-soft) !important; color: var(--preview-ink) !important; }
  #registration .group,
  #registration .elegant-shadow {
    background: var(--preview-cream) !important;
    border-color: rgba(43,35,39,.13) !important;
  }
  #registration .group:nth-child(even) { background: var(--preview-pink) !important; }
  #registration .white-text,
  #registration [class*="text-white"] { color: var(--preview-ink) !important; }
  #registration [class*="text-gray-"] { color: var(--preview-muted) !important; }
  #registration [class*="bg-gray-"] { background: rgba(255,255,255,.45) !important; }

  /* General colour utilities. */
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
    background: rgba(255,255,255,.42) !important;
  }
  .btn-outline-pink:hover {
    background: var(--preview-pink-strong) !important;
    color: var(--preview-ink) !important;
  }

  [class*="text-[#C9F31D]"] { color: #9A7420 !important; }
  [class*="hover:text-[#C9F31D]"]:hover { color: #B76C8B !important; }
  [class*="bg-[#C9F31D]"] { background-color: var(--preview-gold) !important; }
  [class*="border-[#C9F31D]"] { border-color: var(--preview-gold) !important; }
  [class*="ring-[#C9F31D]"] { --tw-ring-color: var(--preview-gold) !important; }
  [fill="#C9F31D"] { fill: var(--preview-gold) !important; }
  [stroke="#C9F31D"] { stroke: var(--preview-gold) !important; }
  .branch-pin:nth-of-type(even) .pin-button { background: var(--preview-pink-strong) !important; }

  .landing-section { border-bottom-color: rgba(43,35,39,.12) !important; }
  .landing-section-label { color: #8D6817 !important; }

  .landing-footer {
    background: var(--preview-pink-strong) !important;
    color: var(--preview-ink) !important;
  }

  /* Keep only intentional dark accents: image overlays and the interactive map. */
  #performances .relative.h-80,
  #shop .relative.h-56 { background: #171214 !important; }

  @media (max-width: 760px) {
    .landing-nav { background: rgba(255,248,242,.96) !important; }
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
