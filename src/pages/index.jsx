import OnePagePreview from "./OnePagePreview";
import PreviewInteractions from "./PreviewInteractions";
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
  }

  .gold-text { color: #D4AF37 !important; }
  .pink-text { color: #E8B4CB !important; }
  .btn-gold,
  button.btn-gold,
  a.btn-gold {
    background: #D4AF37 !important;
    border-color: #D4AF37 !important;
  }
  .btn-gold:hover {
    background: #E8B4CB !important;
    border-color: #E8B4CB !important;
    color: #111 !important;
  }

  .book-dot.active,
  .book-bottom {
    background: #D4AF37 !important;
    border-color: #D4AF37 !important;
  }

  .book-visual {
    background:
      radial-gradient(circle at 55% 38%, rgba(232,180,203,.14), transparent 25%),
      linear-gradient(145deg,#151515,#090909 64%) !important;
  }

  [class*="text-[#C9F31D]"] { color: #D4AF37 !important; }
  [class*="hover:text-[#C9F31D]"]:hover { color: #E8B4CB !important; }
  [class*="bg-[#C9F31D]"] { background-color: #D4AF37 !important; }
  [class*="border-[#C9F31D]"] { border-color: #D4AF37 !important; }
  [class*="ring-[#C9F31D]"] { --tw-ring-color: #D4AF37 !important; }
  [fill="#C9F31D"] { fill: #D4AF37 !important; }
  [stroke="#C9F31D"] { stroke: #D4AF37 !important; }
  .branch-pin:nth-of-type(even) .pin-button { background: #E8B4CB !important; }
`;

function PagesContent() {
  const location = useLocation();
  const initialSection = legacySectionMap[location.pathname] || 'home';

  return (
    <>
      <OnePagePreview initialSection={initialSection} />
      <PreviewInteractions />
      <style>{previewPalette}</style>
    </>
  );
}

export default function Pages() {
  return <Router><PagesContent /></Router>;
}
