import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, ArrowUpLeft, ChevronDown, Sparkles } from "lucide-react";
import { Helmet } from "react-helmet-async";

const storySteps = [
  {
    num: "01",
    title: "החזון שלנו",
    text: "לבנות מקום שבו תנועה, מקצועיות וחוויה נפגשות — ולתת לכל תלמידה מרחב להתפתח, להתקדם וליהנות מהדרך."
  },
  {
    num: "02",
    title: "כוחה של התנועה",
    text: "התנועה מפתחת ביטחון, קואורדינציה, גמישות, משמעת עצמית ותחושת מסוגלות — דרך תהליך עקבי, מדויק ומהנה."
  },
  {
    num: "03",
    title: "הגישה שלנו",
    text: "יחס אישי, למידה מתוך אמון והעצמה, ושאיפה מתמדת לרמה מקצועית גבוהה — בלי לוותר על האנרגיה והכיף שבסטודיו."
  },
  {
    num: "04",
    title: "הדרך שלנו",
    text: "אנחנו מאמינות בתהליך: צעד אחר צעד, שיעור אחר שיעור, עם מקום לצמיחה, אתגר, התמדה והישגים שמרגישים באמת."
  }
];

const values = [
  ["01", "דיוק", "טכניקה, יציבה ועבודה נכונה"],
  ["02", "ביטחון", "מרחב שמאפשר להתנסות ולהתקדם"],
  ["03", "תנועה", "כוח, גמישות, קואורדינציה וזרימה"],
  ["04", "חוויה", "שיעור מקצועי שנעים לחזור אליו"],
];

export default function AboutPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [pointer, setPointer] = useState({ x: 50, y: 50 });
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = [...root.querySelectorAll("[data-reveal]")];
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.16 }
    );

    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const handlePointerMove = event => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setPointer({ x, y });
  };

  return (
    <>
      <Helmet>
        <title>אודות - ריקוד ברוח הטובה</title>
        <meta name="description" content="הכירו את הדרך, הגישה והחזון של ריקוד ברוח הטובה." />
        <meta property="og:title" content="אודות - ריקוד ברוח הטובה" />
        <meta property="og:url" content="https://rikud.netlify.app/About" />
      </Helmet>

      <div ref={rootRef} className="aboutx" dir="rtl">
        <style>{`
          :root {
            --about-bg:#090909;
            --about-panel:#111;
            --about-line:rgba(255,255,255,.13);
            --about-text:#f3efe8;
            --about-muted:#9c9992;
            --about-gold:#D4AF37;
            --about-pink:#E8B4CB;
          }

          .aboutx { background:var(--about-bg); color:var(--about-text); overflow:hidden; }
          .aboutx * { box-sizing:border-box; }
          .aboutx a { color:inherit; text-decoration:none; }

          .about-reveal {
            opacity:0;
            transform:translateY(34px);
            transition:opacity .8s ease, transform .8s cubic-bezier(.2,.7,.2,1);
          }
          .about-reveal.is-visible { opacity:1; transform:none; }

          .about-hero {
            min-height:720px;
            position:relative;
            border-bottom:1px solid var(--about-line);
            display:grid;
            grid-template-columns:minmax(0,1.15fr) minmax(360px,.85fr);
          }

          .about-hero-copy {
            padding:100px clamp(28px,6vw,90px) 70px;
            display:flex;
            flex-direction:column;
            justify-content:flex-end;
            border-left:1px solid var(--about-line);
            position:relative;
            z-index:2;
          }

          .about-kicker {
            display:flex;
            align-items:center;
            gap:16px;
            color:var(--about-gold);
            font-size:11px;
            letter-spacing:.22em;
            margin-bottom:28px;
          }
          .about-kicker::before { content:""; width:54px; height:1px; background:var(--about-pink); }

          .about-title {
            margin:0;
            font-size:clamp(72px,10vw,156px)!important;
            line-height:.84!important;
            letter-spacing:-.075em!important;
            font-weight:500!important;
            color:var(--about-text)!important;
          }
          .about-title span {
            display:block;
            color:transparent;
            -webkit-text-stroke:1px rgba(232,180,203,.72);
          }

          .about-lead {
            max-width:650px;
            margin:34px 0 0;
            color:var(--about-muted);
            font-size:17px;
            line-height:1.9;
          }

          .about-hero-art {
            min-height:720px;
            position:relative;
            overflow:hidden;
            background:
              radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(212,175,55,.20), transparent 20%),
              radial-gradient(circle at 70% 26%, rgba(232,180,203,.13), transparent 25%),
              linear-gradient(145deg,#171717,#0a0a0a 66%);
          }

          .about-orbit,
          .about-orbit::before,
          .about-orbit::after {
            position:absolute;
            border:1px solid rgba(255,255,255,.13);
            border-radius:50%;
            content:"";
          }
          .about-orbit { width:62%; aspect-ratio:1; left:18%; top:16%; }
          .about-orbit::before { inset:16%; border-color:rgba(212,175,55,.32); }
          .about-orbit::after { inset:32%; border-color:rgba(232,180,203,.32); }

          .about-logo-wrap {
            position:absolute;
            inset:0;
            display:grid;
            place-items:center;
          }
          .about-logo-wrap img {
            width:min(42%,260px);
            filter:grayscale(1) brightness(1.8);
            opacity:.84;
            transition:transform .55s ease, filter .55s ease;
          }
          .about-hero-art:hover .about-logo-wrap img {
            transform:scale(1.08) rotate(-3deg);
            filter:grayscale(.25) brightness(1.45);
          }

          .about-vertical {
            position:absolute;
            left:20px;
            bottom:28px;
            writing-mode:vertical-rl;
            color:#666;
            font-size:10px;
            letter-spacing:.25em;
          }

          .about-section {
            border-bottom:1px solid var(--about-line);
            padding:100px clamp(24px,6vw,88px);
          }

          .about-head {
            display:grid;
            grid-template-columns:110px minmax(0,1fr);
            gap:36px;
            align-items:start;
            margin-bottom:58px;
          }
          .about-index { color:#696969; font-size:11px; letter-spacing:.18em; padding-top:12px; }
          .about-head h2 {
            margin:0!important;
            font-size:clamp(50px,7vw,104px)!important;
            line-height:.92!important;
            letter-spacing:-.06em!important;
            font-weight:500!important;
          }
          .about-head h2 em { color:var(--about-gold); font-style:normal; }

          .about-story {
            display:grid;
            grid-template-columns:minmax(0,.9fr) minmax(420px,1.1fr);
            border-top:1px solid var(--about-line);
          }

          .about-story-preview {
            min-height:520px;
            border-left:1px solid var(--about-line);
            padding:48px;
            display:flex;
            flex-direction:column;
            justify-content:space-between;
            background:
              radial-gradient(circle at 70% 25%, rgba(232,180,203,.10), transparent 25%),
              #0d0d0d;
          }

          .about-preview-num {
            font-size:clamp(84px,12vw,174px);
            line-height:.8;
            letter-spacing:-.08em;
            color:transparent;
            -webkit-text-stroke:1px rgba(212,175,55,.55);
          }
          .about-story-preview p {
            color:var(--about-muted);
            max-width:540px;
            line-height:1.9;
            font-size:16px;
          }

          .about-accordion { border-bottom:1px solid var(--about-line); }
          .about-step {
            border-bottom:1px solid var(--about-line);
            transition:background .25s ease;
          }
          .about-step:hover,.about-step.active { background:#101010; }
          .about-step button {
            width:100%;
            border:0;
            background:transparent;
            color:inherit;
            display:grid;
            grid-template-columns:72px 1fr 44px;
            align-items:center;
            gap:20px;
            padding:28px 0;
            text-align:right;
            cursor:pointer;
          }
          .about-step-num { color:var(--about-pink); font-size:12px; letter-spacing:.14em; }
          .about-step-title { font-size:clamp(24px,3vw,42px); letter-spacing:-.04em; }
          .about-step-icon {
            width:42px;
            height:42px;
            border:1px solid var(--about-line);
            border-radius:50%;
            display:grid;
            place-items:center;
            transition:.25s;
          }
          .about-step.active .about-step-icon {
            background:var(--about-gold);
            color:#111;
            border-color:var(--about-gold);
            transform:rotate(180deg);
          }
          .about-step-body {
            max-height:0;
            overflow:hidden;
            color:var(--about-muted);
            line-height:1.9;
            padding:0 92px 0 64px;
            transition:max-height .45s ease, padding .45s ease;
          }
          .about-step.active .about-step-body {
            max-height:180px;
            padding-bottom:28px;
          }

          .about-values {
            display:grid;
            grid-template-columns:repeat(4,1fr);
            border-top:1px solid var(--about-line);
          }
          .about-value {
            min-height:270px;
            padding:30px 24px;
            border-left:1px solid var(--about-line);
            display:flex;
            flex-direction:column;
            justify-content:space-between;
            position:relative;
            overflow:hidden;
            transition:background .3s ease, transform .3s ease;
          }
          .about-value:last-child { border-left:0; }
          .about-value::after {
            content:"";
            position:absolute;
            width:140px;
            height:140px;
            border:1px solid rgba(232,180,203,.24);
            border-radius:50%;
            left:-54px;
            bottom:-58px;
            transition:.4s ease;
          }
          .about-value:hover { background:#111; transform:translateY(-6px); }
          .about-value:hover::after { transform:scale(1.45); border-color:rgba(212,175,55,.42); }
          .about-value-num { color:#6c6c6c; font-size:11px; letter-spacing:.18em; }
          .about-value h3 { margin:0 0 10px!important; font-size:34px!important; font-weight:500!important; }
          .about-value p { margin:0; color:var(--about-muted); line-height:1.7; font-size:14px; }

          .about-cta {
            min-height:520px;
            display:grid;
            grid-template-columns:minmax(0,1fr) 260px;
            align-items:end;
            gap:40px;
            background:linear-gradient(115deg,var(--about-gold),#b88724 60%,#d68da9);
            color:#111;
            padding:90px clamp(24px,6vw,88px);
          }
          .about-cta h2 {
            margin:0!important;
            color:#111!important;
            font-size:clamp(58px,9vw,138px)!important;
            line-height:.86!important;
            letter-spacing:-.07em!important;
            font-weight:600!important;
          }
          .about-cta p { max-width:700px; line-height:1.8; font-size:17px; margin:28px 0 0; }
          .about-cta-links { display:flex; flex-direction:column; align-items:flex-end; gap:14px; }
          .about-round-link {
            width:148px;
            height:148px;
            border:1px solid rgba(0,0,0,.38);
            border-radius:50%;
            display:grid;
            place-items:center;
            transition:.3s ease;
          }
          .about-round-link:hover { background:#111; color:var(--about-gold); transform:rotate(-9deg); }
          .about-text-link { display:flex; align-items:center; gap:8px; font-size:14px; font-weight:700; }

          @media(max-width:980px) {
            .about-hero { grid-template-columns:1fr; }
            .about-hero-copy { border-left:0; border-bottom:1px solid var(--about-line); min-height:570px; }
            .about-hero-art { min-height:480px; }
            .about-story { grid-template-columns:1fr; }
            .about-story-preview { border-left:0; border-bottom:1px solid var(--about-line); min-height:380px; }
            .about-values { grid-template-columns:repeat(2,1fr); }
            .about-value:nth-child(2) { border-left:0; }
            .about-value:nth-child(-n+2) { border-bottom:1px solid var(--about-line); }
            .about-cta { grid-template-columns:1fr; }
            .about-cta-links { align-items:flex-start; }
          }

          @media(max-width:640px) {
            .about-hero { min-height:auto; }
            .about-hero-copy { min-height:500px; padding:74px 20px 48px; }
            .about-hero-art { min-height:360px; }
            .about-section { padding:72px 20px; }
            .about-head { grid-template-columns:1fr; gap:12px; }
            .about-story-preview { padding:30px 20px; }
            .about-step button { grid-template-columns:46px 1fr 42px; gap:10px; }
            .about-step-body { padding-right:56px; padding-left:10px; }
            .about-values { grid-template-columns:1fr; }
            .about-value { border-left:0; border-bottom:1px solid var(--about-line); min-height:220px; }
            .about-cta { padding:72px 20px; }
            .about-round-link { width:116px; height:116px; }
          }

          @media (prefers-reduced-motion: reduce) {
            .about-reveal { opacity:1; transform:none; transition:none; }
            .aboutx * { scroll-behavior:auto!important; animation:none!important; transition-duration:.01ms!important; }
          }
        `}</style>

        <section
          className="about-hero"
          onMouseMove={handlePointerMove}
          style={{ "--mx": `${pointer.x}%`, "--my": `${pointer.y}%` }}
        >
          <div className="about-hero-copy about-reveal" data-reveal>
            <div className="about-kicker">ABOUT / 01</div>
            <h1 className="about-title">אודות <span>ברוח הטובה.</span></h1>
            <p className="about-lead">
              המקום שבו תנועה, דיוק, התפתחות ואנרגיה טובה נפגשים — בדרך מקצועית, אישית ומלאת קצב.
            </p>
          </div>

          <div className="about-hero-art" aria-hidden="true">
            <div className="about-orbit" />
            <div className="about-logo-wrap"><img src="/logo.png" alt="" /></div>
            <div className="about-vertical">MOVE • GROW • DANCE</div>
          </div>
        </section>

        <section className="about-section">
          <div className="about-head about-reveal" data-reveal>
            <div className="about-index">02 / STORY</div>
            <h2>הסיפור שלנו<br/><em>נפתח תוך כדי תנועה.</em></h2>
          </div>

          <div className="about-story about-reveal" data-reveal>
            <div className="about-story-preview">
              <div className="about-preview-num">{storySteps[activeStep].num}</div>
              <div>
                <h3>{storySteps[activeStep].title}</h3>
                <p>{storySteps[activeStep].text}</p>
              </div>
            </div>

            <div className="about-accordion">
              {storySteps.map((step, index) => (
                <div key={step.num} className={`about-step ${activeStep === index ? "active" : ""}`}>
                  <button type="button" onClick={() => setActiveStep(index)} aria-expanded={activeStep === index}>
                    <span className="about-step-num">{step.num}</span>
                    <span className="about-step-title">{step.title}</span>
                    <span className="about-step-icon"><ChevronDown size={18}/></span>
                  </button>
                  <div className="about-step-body">{step.text}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="about-head about-reveal" data-reveal>
            <div className="about-index">03 / VALUES</div>
            <h2>מה חשוב לנו<br/><em>בכל שיעור.</em></h2>
          </div>

          <div className="about-values about-reveal" data-reveal>
            {values.map(([num, title, text]) => (
              <article key={num} className="about-value">
                <span className="about-value-num">{num}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about-cta about-reveal" data-reveal>
          <div>
            <div className="about-kicker" style={{ color: "#111" }}><Sparkles size={14}/> NEXT STEP</div>
            <h2>מכאן<br/>עוברים לתנועה.</h2>
            <p>אפשר להמשיך מכאן לשיעורים, לראות מה מתאים לך ולהכיר את המסלולים והאפשרויות.</p>
          </div>
          <div className="about-cta-links">
            <Link className="about-round-link" to={createPageUrl("Classes")} aria-label="לשיעורים">
              <ArrowUpLeft size={30}/>
            </Link>
            <Link className="about-text-link" to={createPageUrl("Classes")}>
              גלי את השיעורים <ArrowLeft size={16}/>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
