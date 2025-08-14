
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Phone, Mail, MapPin, Menu, X } from "lucide-react";

// --- קומפוננטות עזר של הלייאאוט --- //

// קומפוננטת כותרת עליונה (Header)
function AppHeader() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "בית", page: "Home" },
    { name: "אודות", page: "About" },
    { name: "שיעורים", page: "Classes" },
    { name: "סניפים", page: "Locations" },
    { name: "מופעים", page: "Performances" },
    { name: "חנות", page: "Shop" },
    { name: "הרשמה", page: "Registration", extraClass: "gentle-text-glow" },
    { name: "צור קשר", page: "Contact", extraClass: "gentle-pink-transition" },
  ];

  // פונקציה לבדיקה אם הקישור פעיל
  const isActiveLink = (pageName) => {
    return location.pathname === createPageUrl(pageName) || (pageName === "Home" && location.pathname === "/");
  };

  return (
    <header className="sticky top-0 z-50 darker-bg elegant-shadow border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* לוגו */}
          <Link to={createPageUrl("Home")} className="flex-shrink-0">
            <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/debe541b7_.png" alt="לוגו ריקוד ברוח הטובה" className="h-16 w-auto" />
          </Link>

          {/* ניווט למסך רחב */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map(link => (
              <Link
                key={link.page}
                to={createPageUrl(link.page)}
                className={`font-medium text-lg transition-colors duration-300 ${isActiveLink(link.page) ? "active-nav" : "white-text hover-gold"} ${link.extraClass || ''}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* כפתור תפריט למובייל */}
          <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>

      {/* תפריט נפתח למובייל */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-darker-bg/95 backdrop-blur-sm absolute top-20 left-0 w-full">
          <nav className="flex flex-col items-center gap-6 py-8">
            {navLinks.map(link => (
              <Link
                key={link.page}
                to={createPageUrl(link.page)}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-medium text-2xl transition-colors duration-300 ${isActiveLink(link.page) ? "active-nav" : "white-text hover-gold"} ${link.extraClass || ''}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

// קומפוננטת כותרת תחתונה (Footer)
function AppFooter() {
  return (
    <footer className="darker-bg text-white mt-20 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* מידע על החברה */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/debe541b7_.png" alt="לוגו ריקוד ברוח הטובה" className="h-20 w-auto" />
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              ריקוד ברוח הטובה הוקם מתוך חזון, אהבה ושליחות להביא לכל בת במגזר החרדי את מתנת המחול.
            </p>
          </div>

          {/* קישורים מהירים */}
          <div>
            <h4 className="text-lg font-semibold mb-6 gold-text">קישורים</h4>
            <div className="space-y-4">
              <Link to={createPageUrl("About")} className="block text-gray-400 hover:text-white transition-colors">אודות</Link>
              <Link to={createPageUrl("Classes")} className="block text-gray-400 hover:text-white transition-colors">שיעורים</Link>
              <Link to={createPageUrl("Locations")} className="block text-gray-400 hover:text-white transition-colors">סניפים</Link>
              <Link to={createPageUrl("Performances")} className="block text-gray-400 hover:text-white transition-colors">מופעים</Link>
              <Link to={createPageUrl("Shop")} className="block text-gray-400 hover:text-white transition-colors">חנות</Link>
            </div>
          </div>

          {/* פרטי יצירת קשר */}
          <div>
            <h4 className="text-lg font-semibold mb-6 gold-text">יצירת קשר</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-400"><Phone className="w-5 h-5 pink-text" /><span>03-3130656</span></div>
              <div className="flex items-center gap-3 text-gray-400"><Mail className="w-5 h-5 pink-text" /><span>b0527182273@gmail.com</span></div>
              <div className="flex items-center gap-3 text-gray-400"><MapPin className="w-5 h-5 pink-text" /><span>סניפים ברחבי ירושלים והסביבה</span></div>
            </div>
          </div>
        </div>

        {/* זכויות יוצרים */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; 2024 ריקוד ברוח הטובה. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
}

// הגדרת Schema.org לקידום אתרים
const schemaData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "ריקוד ברוח הטובה",
  "description": "חוגי מחול, אקרובטיקה והתעמלות קרקע בירושלים, ביתר ובית שמש. מגוון חוגי מחול לילדות קטנות, נערות ונשים.",
  "image": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/debe541b7_.png",
  "telephone": "03-3130656",
  "email": "b0527182273@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "ירושלים",
    "addressCountry": "IL"
  },
  "serviceType": ["חוג מחול בירושלים", "חוג מחול בביתר", "חוג מחול בבית שמש", "אקרובטיקה", "התעמלות קרקע בירושלים", "חוג מחול לילדות קטנות"]
};


// --- הקומפוננטה הראשית של הלייאאוט --- //

export default function AppLayout({ children, currentPageName }) {
  // useEffect לקביעת כותרת העמוד בדפדפן
  useEffect(() => {
    document.title = "ריקוד ברוח הטובה";
  }, []);

  return (
    <div className="min-h-screen bg-gray-900" dir="rtl" style={{
      minHeight: '100vh',
      backgroundColor: '#111827',
      width: '100%'
    }}>
      {/* הגדרת Schema וסגנונות גלובליים */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <style>{`
        /* ... (הסגנונות הקיימים נשארים כאן) ... */
        @import url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@700&family=Open+Sans:wght@300;400;600;700&display=swap');
          
        :root {
          --gold: #D4AF37;
          --deep-black: #1A1A1A;
          --soft-pink: #E8B4CB;
          --dark-bg: #111827;
          --darker-bg: #0F172A;
        }
        
        * {
          font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: 'Amatic SC', cursive;
          letter-spacing: 0.05em;
        }
        
        .gold-text { color: var(--gold); }
        .pink-text { color: var(--soft-pink); }
        .white-text { color: white; }
        .gold-bg { background-color: var(--gold); }
        .pink-bg { background-color: var(--soft-pink); }
        .dark-bg { background-color: var(--dark-bg); }
        .darker-bg { background-color: var(--darker-bg); }
        .elegant-shadow { box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); }
        
        .active-nav {
          color: var(--gold) !important;
          position: relative;
        }
        
        .active-nav::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 8px;
          height: 8px;
          background-color: var(--gold);
          border-radius: 50%;
        }

        @media (max-width: 767px) {
          .active-nav::after {
            bottom: -2px;
            right: -12px;
            left: auto;
            transform: none;
            width: 6px;
            height: 6px;
          }
        }
        
        .gentle-text-glow { animation: gentleTextGlow 3s ease-in-out infinite; }
        .gentle-pink-transition { animation: gentlePinkTransition 4s ease-in-out infinite; }
        
        @keyframes gentleTextGlow {
          0%, 100% { text-shadow: 0 0 4px rgba(212, 175, 55, 0.4); }
          50% { text-shadow: 0 0 12px rgba(212, 175, 55, 0.8); }
        }
        
        @keyframes gentlePinkTransition {
          0%, 100% { color: white; }
          50% { color: var(--soft-pink); }
        }
        
        .btn-gold { background: var(--gold); color: var(--deep-black); border: none; font-weight: 600; padding: 12px 32px; transition: all 0.3s ease; }
        .btn-gold:hover { background: #B8941F; color: var(--deep-black); transform: translateY(-2px); }
        .btn-outline-pink { background: transparent; border: 2px solid var(--soft-pink); color: var(--soft-pink); font-weight: 600; padding: 10px 30px; transition: all 0.3s ease; }
        .btn-outline-pink:hover { background: var(--soft-pink); color: white; transform: translateY(-2px); }
        
        .sparkles { position: absolute; width: 4px; height: 4px; background: var(--gold); border-radius: 50%; opacity: 0.7; animation: sparkle 2s infinite; }
        @keyframes sparkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>

      {/* מבנה העמוד */}
      <AppHeader />
      <main className="flex-1">{children}</main>
      <AppFooter />
    </div>
  );
}
