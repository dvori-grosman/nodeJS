import Layout from "./Layout.jsx";
import Home from "./Home";
import Classes from "./Classes";
import Contact from "./Contact";
import Locations from "./LocationsWithSchedules";
import Performances from "./Performances";
import About from "./About";
import Shop from "./Shop";
import Registration from "./Registration";
import Admin from "./Admin";
import ScheduleAdmin from "./ScheduleAdmin";
import AxtraPreview from "./AxtraPreview";
import AxtraClassesPreview from "./AxtraClassesPreview";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const PAGES = {
    Home: Home,
    Classes: Classes,
    Contact: Contact,
    Locations: Locations,
    Performances: Performances,
    About: About,
    Shop: Shop,
    Registration: Registration,
}

const previewPalette = `
  :root {
    --ax-accent: #D4AF37 !important;
    --ax-gold: #D4AF37 !important;
    --ax-pink: #E8B4CB !important;
    --book-accent: #D4AF37 !important;
  }

  .ax2-links a:hover,
  .ax-inner-links a:hover,
  .ax-inner-links a.active {
    color: #E8B4CB !important;
  }

  .ax2-title .accent-dot,
  .ax2-marquee b,
  .ax2-big-copy em,
  .book-kicker {
    color: #D4AF37 !important;
  }

  .ax2-hero-side::after {
    border-color: rgba(212,175,55,.30) !important;
  }

  .ax2-side-shape::before {
    background:
      radial-gradient(circle at 62% 32%, rgba(232,180,203,.22), transparent 23%),
      linear-gradient(145deg, #242424, #121212 58%) !important;
  }

  .ax2-program-row:hover .ax2-circle-link,
  .ax-inner-footer-link:hover {
    background: #E8B4CB !important;
    border-color: #E8B4CB !important;
    color: #111 !important;
  }

  .ax-preview-main .gold-text { color: #D4AF37 !important; }
  .ax-preview-main .pink-text { color: #E8B4CB !important; }
  .ax-preview-main .btn-gold,
  .ax-preview-main button.btn-gold,
  .ax-preview-main a.btn-gold {
    background: #D4AF37 !important;
    border-color: #D4AF37 !important;
  }
  .ax-preview-main .btn-gold:hover {
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
  .book-visual::after {
    border-color: rgba(212,175,55,.34) !important;
  }

  [class*="text-[#C9F31D]"] { color: #D4AF37 !important; }
  [class*="hover:text-[#C9F31D]"]:hover { color: #E8B4CB !important; }
  [class*="bg-[#C9F31D]"] { background-color: #D4AF37 !important; }
  [class*="border-[#C9F31D]"] { border-color: #D4AF37 !important; }
  [class*="ring-[#C9F31D]"] { --tw-ring-color: #D4AF37 !important; }
  [fill="#C9F31D"] { fill: #D4AF37 !important; }
  [stroke="#C9F31D"] { stroke: #D4AF37 !important; }

  .branch-pin:nth-of-type(even) .pin-button {
    background: #E8B4CB !important;
  }
`;

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

function PreviewPalette() {
    return <style>{previewPalette}</style>;
}

function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    if (location.pathname === '/admin') {
        return <ScheduleAdmin />;
    }

    if (location.pathname === '/admin/legacy') {
        return <Admin />;
    }

    if (location.pathname === '/' || location.pathname === '/Home' || location.pathname === '/PreviewAxtra') {
        return (
            <>
                <AxtraPreview />
                <PreviewPalette />
            </>
        );
    }

    return (
        <>
            <Layout currentPageName={currentPage}>
                <Routes>
                    <Route path="/Classes" element={<AxtraClassesPreview />} />
                    <Route path="/Contact" element={<Contact />} />
                    <Route path="/Locations" element={<Locations />} />
                    <Route path="/Performances" element={<Performances />} />
                    <Route path="/About" element={<About />} />
                    <Route path="/Shop" element={<Shop />} />
                    <Route path="/Registration" element={<Registration />} />
                </Routes>
            </Layout>
            <PreviewPalette />
        </>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}
