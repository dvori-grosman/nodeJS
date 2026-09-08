import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronDown, Clock, Users } from "lucide-react";
import { createPageUrl } from "@/utils";

const classes = [
  {
    title: "בלט קלאסי",
    subtitle: "עשירה, רכה, חכמה, אומנותית ואצילית",
    description: "שפת התנועה של הבלט הקלאסי בנויה על דיוק, יציבה, קווים נקיים ותחושת ריחוף. שיעור שמפתח טכניקה, שליטה וגמישות לצד חיבור עמוק לתנועה.",
    features: ["תרגילי בר", "תרגילי אמצע ופינה", "וריאציות", "פוינט למתקדמות"],
    duration: "60 דקות",
    ages: "יסודי, תיכון, נשים",
    levels: "מתחילות · ממשיכות · מתקדמות",
    image: "/02.png"
  },
  {
    title: "מחול מודרני",
    subtitle: "תנועה, הבעה, יצירתיות וזרימה",
    description: "מחול מודרני נותן מקום לגוף לזוז, ליצור ולהביע. משלבים טכניקה, עבודת רצפה, קומבינציות ואימפרוביזציה בתוך שיעור זורם ודינמי.",
    features: ["טכניקה", "עבודת רצפה", "קומבינציות", "אימפרוביזציה"],
    duration: "60 דקות",
    ages: "יסודי, תיכון, נשים",
    levels: "מתחילות · ממשיכות · מתקדמות",
    image: "/01.png"
  },
  {
    title: "מחול לגיל הרך",
    subtitle: "התחלה רכה לעולם התנועה",
    description: "שעה של תנועה, משחק ודמיון. הילדות לומדות צעדי בסיס, פוזיציות וקואורדינציה בדרך שמחברת את עולם המחול לעולם שלהן.",
    features: ["מוטוריקה", "קואורדינציה", "חיזוק", "ביטוי וביטחון"],
    duration: "45 דקות",
    ages: "3–6 שנים",
    levels: "גיל הרך",
    image: "/04.png"
  },
  {
    title: "אקרודאנס",
    subtitle: "מחול ואקרובטיקה בתנועה אחת",
    description: "שילוב בין טכניקות מחול לבין אלמנטים אקרובטיים. שיעור מאתגר, קצבי וייחודי שמפתח כוח, גמישות, שליטה ואומץ.",
    features: ["גלגלונים", "עמידות ידיים", "עבודת רצפה", "אלמנטים מתקדמים"],
    duration: "60 דקות",
    ages: "יסודי, תיכון, נשים",
    levels: "בסיס · מתקדמות",
    image: "/03.png"
  },
  {
    title: "התעמלות קרקע",
    subtitle: "כוח, גמישות, אומץ ואנרגיה",
    description: "שיעור אנרגטי שמפתח שיווי משקל, כוח מתפרץ, התמצאות במרחב, גמישות ומהירות — מרמת בסיס ועד ביצועים מתקדמים.",
    features: ["עמידות ידיים", "גלגלונים וגשרים", "פליק פלאקים", "סלטות"],
    duration: "60 דקות",
    ages: "מקטנטנות ועד נשים",
    levels: "מתחילות · ממשיכות · מתקדמות · נבחרת",
    image: "/01.png"
  }
];

export default function AxtraClassesPreview() {
  const scrollerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const slides = [...root.querySelectorAll("[data-class-slide]")];
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveIndex(Number(entry.target.dataset.index));
          }
        });
      },
      { root, threshold: 0.58 }
    );

    slides.forEach(slide => observer.observe(slide));
    return () => observer.disconnect();
  }, []);

  const goTo = index => {
    const root = scrollerRef.current;
    const slide = root?.querySelector(`[data-index="${index}"]`);
    slide?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="book-shell">
      <style>{`
        :root {
          --book-bg:#090909;
          --book-panel:#111111;
          --book-line:rgba(255,255,255,.14);
          --book-text:#f1eee8;
          --book-muted:#9b9891;
          --book-accent:#c8ff36;
        }

        .book-shell {
          background:var(--book-bg);
          color:var(--book-text);
          min-height:100vh;
          position:relative;
          overflow:hidden;
        }

        .book-scroller {
          height:calc(100vh - 86px);
          overflow-y:auto;
          scroll-snap-type:y mandatory;
          scroll-behavior:smooth;
          scrollbar-width:none;
          overscroll-behavior-y:auto;
          perspective:1400px;
        }
        .book-scroller::-webkit-scrollbar { display:none; }

        .book-slide {
          min-height:calc(100vh - 86px);
          scroll-snap-align:start;
          scroll-snap-stop:always;
          display:grid;
          grid-template-columns:minmax(0,1.1fr) minmax(360px,.9fr);
          border-bottom:1px solid var(--book-line);
          position:relative;
          background:var(--book-bg);
          transform-origin:center top;
          transition:transform .7s cubic-bezier(.2,.75,.25,1), opacity .6s ease;
        }

        .book-slide::after {
          content:"";
          position:absolute;
          inset:0;
          pointer-events:none;
          background:linear-gradient(180deg, transparent 72%, rgba(255,255,255,.025));
          box-shadow:inset 0 -24px 45px rgba(0,0,0,.34);
        }

        .book-copy {
          padding:clamp(48px,6vw,92px);
          display:flex;
          flex-direction:column;
          justify-content:center;
          border-left:1px solid var(--book-line);
          position:relative;
          z-index:2;
        }

        .book-index {
          position:absolute;
          top:34px;
          right:clamp(24px,4vw,56px);
          font-size:12px;
          letter-spacing:.22em;
          color:#777;
        }

        .book-kicker {
          color:var(--book-accent);
          letter-spacing:.18em;
          font-size:12px;
          text-transform:uppercase;
          margin-bottom:24px;
        }

        .book-title {
          font-size:clamp(58px,7.7vw,128px);
          line-height:.88;
          letter-spacing:-.065em;
          margin:0;
          max-width:900px;
        }

        .book-subtitle {
          font-size:clamp(20px,2vw,30px);
          margin:26px 0 0;
          color:#d6d2cb;
          max-width:650px;
          line-height:1.45;
        }

        .book-description {
          color:var(--book-muted);
          line-height:1.9;
          font-size:16px;
          max-width:690px;
          margin:26px 0 0;
        }

        .book-meta {
          display:grid;
          grid-template-columns:repeat(2,minmax(0,1fr));
          gap:0;
          border-top:1px solid var(--book-line);
          border-bottom:1px solid var(--book-line);
          margin-top:38px;
        }

        .book-meta-item {
          padding:18px 0;
          border-left:1px solid var(--book-line);
          display:flex;
          align-items:center;
          gap:10px;
          color:#c5c1b9;
          font-size:14px;
        }
        .book-meta-item:last-child { border-left:0; padding-right:20px; }

        .book-levels {
          color:#79766f;
          font-size:13px;
          margin-top:16px;
          letter-spacing:.03em;
        }

        .book-visual {
          min-height:100%;
          position:relative;
          overflow:hidden;
          display:flex;
          align-items:center;
          justify-content:center;
          background:
            radial-gradient(circle at 55% 38%, rgba(200,255,54,.12), transparent 25%),
            linear-gradient(145deg,#151515,#090909 64%);
        }

        .book-visual::before {
          content:"";
          position:absolute;
          width:min(64%,540px);
          aspect-ratio:1;
          border:1px solid rgba(255,255,255,.12);
          border-radius:50%;
          transform:rotate(-16deg);
        }

        .book-visual::after {
          content:"";
          position:absolute;
          width:min(46%,380px);
          aspect-ratio:1;
          border:1px solid rgba(200,255,54,.28);
          border-radius:50%;
          transform:translate(13%,-8%);
        }

        .book-icon {
          width:min(38vw,320px);
          max-height:320px;
          object-fit:contain;
          filter:grayscale(1) brightness(1.3) contrast(1.06);
          opacity:.88;
          position:relative;
          z-index:2;
          transform:scale(1.18);
        }

        .book-word {
          position:absolute;
          left:-14px;
          bottom:18px;
          font-size:clamp(82px,10vw,170px);
          font-weight:800;
          letter-spacing:-.08em;
          color:rgba(255,255,255,.035);
          direction:ltr;
        }

        .book-features {
          position:absolute;
          bottom:40px;
          right:38px;
          z-index:3;
          display:flex;
          flex-wrap:wrap;
          gap:8px;
          max-width:72%;
        }

        .book-chip {
          padding:8px 12px;
          border:1px solid var(--book-line);
          border-radius:999px;
          font-size:12px;
          color:#c9c5bd;
          background:rgba(0,0,0,.26);
          backdrop-filter:blur(8px);
        }

        .book-dots {
          position:fixed;
          left:24px;
          top:50%;
          transform:translateY(-50%);
          z-index:35;
          display:flex;
          flex-direction:column;
          gap:12px;
        }

        .book-dot {
          width:9px;
          height:9px;
          border-radius:50%;
          border:1px solid rgba(255,255,255,.45);
          background:transparent;
          padding:0;
          cursor:pointer;
          transition:.25s;
        }
        .book-dot.active {
          background:var(--book-accent);
          border-color:var(--book-accent);
          transform:scale(1.45);
        }

        .book-scroll-hint {
          position:fixed;
          left:20px;
          bottom:18px;
          z-index:35;
          color:#75726c;
          font-size:11px;
          display:flex;
          align-items:center;
          gap:7px;
          writing-mode:vertical-rl;
        }

        .book-bottom {
          min-height:calc(100vh - 86px);
          scroll-snap-align:start;
          display:grid;
          place-items:center;
          padding:70px 24px;
          text-align:center;
          background:var(--book-accent);
          color:#111;
        }

        .book-bottom h2 {
          font-size:clamp(52px,8vw,120px);
          line-height:.92;
          letter-spacing:-.065em;
          margin:0;
        }

        .book-bottom p { font-size:18px; margin:28px auto; max-width:640px; }
        .book-bottom a {
          display:inline-flex;
          align-items:center;
          gap:10px;
          width:max-content;
          border:1px solid rgba(0,0,0,.45);
          border-radius:999px;
          padding:14px 22px;
          color:#111;
          font-weight:700;
        }

        @media (max-width:900px) {
          .book-scroller { height:calc(100vh - 78px); }
          .book-slide { min-height:calc(100vh - 78px); grid-template-columns:1fr; }
          .book-copy { border-left:0; border-bottom:1px solid var(--book-line); padding:62px 22px 42px; }
          .book-visual { min-height:38vh; }
          .book-title { font-size:clamp(50px,14vw,88px); }
          .book-icon { width:min(54vw,240px); max-height:220px; }
          .book-dots { left:10px; }
          .book-scroll-hint { display:none; }
          .book-features { right:18px; bottom:18px; max-width:86%; }
          .book-meta { grid-template-columns:1fr; }
          .book-meta-item { border-left:0; border-bottom:1px solid var(--book-line); }
          .book-meta-item:last-child { border-bottom:0; padding-right:0; }
        }
      `}</style>

      <div className="book-dots" aria-label="ניווט בין שיעורים">
        {classes.map((item, index) => (
          <button
            key={item.title}
            className={`book-dot ${activeIndex === index ? "active" : ""}`}
            onClick={() => goTo(index)}
            aria-label={`מעבר ל${item.title}`}
          />
        ))}
      </div>

      <div className="book-scroll-hint">
        גללי לדפדוף <ChevronDown size={14} />
      </div>

      <div className="book-scroller" ref={scrollerRef}>
        {classes.map((item, index) => (
          <section
            key={item.title}
            className="book-slide"
            data-class-slide
            data-index={index}
          >
            <div className="book-copy">
              <div className="book-index">0{index + 1} / 0{classes.length}</div>
              <div className="book-kicker">Dance class</div>
              <h1 className="book-title">{item.title}</h1>
              <p className="book-subtitle">{item.subtitle}</p>
              <p className="book-description">{item.description}</p>

              <div className="book-meta">
                <div className="book-meta-item"><Clock size={17} /> {item.duration}</div>
                <div className="book-meta-item"><Users size={17} /> {item.ages}</div>
              </div>
              <div className="book-levels">{item.levels}</div>
            </div>

            <div className="book-visual">
              <img className="book-icon" src={item.image} alt={item.title} />
              <div className="book-word">MOVE</div>
              <div className="book-features">
                {item.features.map(feature => <span key={feature} className="book-chip">{feature}</span>)}
              </div>
            </div>
          </section>
        ))}

        <section className="book-bottom">
          <div>
            <h2>מצאת את השיעור שלך?</h2>
            <p>אפשר להמשיך להרשמה או לדבר איתנו כדי לבחור את הקבוצה והרמה המתאימות.</p>
            <Link to={createPageUrl("Contact")}>דברי איתנו <ArrowLeft size={18} /></Link>
          </div>
        </section>
      </div>
    </div>
  );
}
