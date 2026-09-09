import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const GOLD = "#D4AF37";
const PINK = "#E8B4CB";

const styles = `
  :root {
    --ax-accent: ${GOLD} !important;
    --ax-gold: ${GOLD} !important;
    --ax-pink: ${PINK} !important;
    --preview-gold: ${GOLD};
    --preview-pink: ${PINK};
  }

  .preview-interactive-shell { position: relative; }

  .preview-progress {
    position: fixed;
    top: 86px;
    right: 0;
    z-index: 70;
    height: 2px;
    width: var(--preview-progress, 0%);
    background: linear-gradient(90deg, var(--preview-pink), var(--preview-gold));
    transform-origin: right center;
    pointer-events: none;
    transition: width .12s linear;
  }

  .preview-pointer-glow {
    position: fixed;
    z-index: 2;
    width: 360px;
    height: 360px;
    border-radius: 50%;
    pointer-events: none;
    opacity: .11;
    background: radial-gradient(circle, rgba(212,175,55,.55) 0%, rgba(232,180,203,.2) 38%, transparent 72%);
    filter: blur(16px);
    transform: translate(-50%, -50%);
    left: var(--preview-pointer-x, 50vw);
    top: var(--preview-pointer-y, 50vh);
    transition: opacity .25s ease;
  }

  .preview-section-nav {
    position: fixed;
    left: 22px;
    top: 50%;
    z-index: 45;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 11px;
  }

  .preview-section-dot {
    width: 9px;
    height: 9px;
    padding: 0;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,.38);
    background: transparent;
    cursor: pointer;
    transition: .25s ease;
  }

  .preview-section-dot:hover { border-color: var(--preview-pink); transform: scale(1.3); }
  .preview-section-dot.active {
    background: var(--preview-gold);
    border-color: var(--preview-gold);
    transform: scale(1.5);
  }

  .ax-preview-main .ax-io-reveal {
    opacity: 0;
    transform: translateY(34px);
    transition: opacity .75s cubic-bezier(.2,.75,.25,1), transform .75s cubic-bezier(.2,.75,.25,1);
  }

  .ax-preview-main .ax-io-reveal.ax-io-visible {
    opacity: 1;
    transform: translateY(0);
  }

  .ax-preview-main .group,
  .ax-preview-main .elegant-shadow,
  .ax-preview-main [class*="border-gray-7"] {
    transition: transform .35s cubic-bezier(.2,.75,.25,1), border-color .3s ease, background .3s ease !important;
    transform-style: preserve-3d;
  }

  @media (hover:hover) and (pointer:fine) {
    .ax-preview-main .group:hover,
    .ax-preview-main .elegant-shadow:hover,
    .ax-preview-main [class*="border-gray-7"]:hover {
      transform: translateY(-5px);
      border-color: rgba(212,175,55,.42) !important;
    }
  }

  .ax-preview-main .ax-magnetic {
    will-change: transform;
    transition: transform .18s ease, background .25s ease, color .25s ease, border-color .25s ease !important;
  }

  .ax-preview-main .gold-text { color: var(--preview-gold) !important; }
  .ax-preview-main .pink-text { color: var(--preview-pink) !important; }
  .ax-preview-main .gold-bg { background: var(--preview-gold) !important; }
  .ax-preview-main .pink-bg { background: var(--preview-pink) !important; }

  .ax-preview-main [class*="text-[#C9F31D]"],
  .ax-preview-main [class*="text-[#c9f31d]"],
  .ax-preview-main [class*="text-[#c8ff36]"] { color: var(--preview-gold) !important; }

  .ax-preview-main [class*="bg-[#C9F31D]"],
  .ax-preview-main [class*="bg-[#c9f31d]"],
  .ax-preview-main [class*="bg-[#c8ff36]"] { background: var(--preview-gold) !important; }

  .ax-preview-main [class*="border-[#C9F31D]"],
  .ax-preview-main [class*="border-[#c9f31d]"],
  .ax-preview-main [class*="border-[#c8ff36]"] { border-color: var(--preview-gold) !important; }

  .ax-preview-main input:focus,
  .ax-preview-main textarea:focus,
  .ax-preview-main select:focus {
    border-color: var(--preview-pink) !important;
    box-shadow: 0 0 0 1px rgba(232,180,203,.16) !important;
  }

  .ax-preview-main button:focus-visible,
  .ax-preview-main a:focus-visible {
    outline: 2px solid var(--preview-pink) !important;
    outline-offset: 4px;
  }

  @media (max-width: 760px) {
    .preview-progress { top: 72px; }
    .preview-section-nav { display: none; }
    .preview-pointer-glow { display: none; }
  }

  @media (prefers-reduced-motion: reduce) {
    .ax-preview-main .ax-io-reveal,
    .ax-preview-main .ax-io-reveal.ax-io-visible {
      opacity: 1;
      transform: none;
      transition: none;
    }
    .preview-pointer-glow { display: none; }
    .ax-preview-main .ax-magnetic { transform: none !important; }
  }
`;

export default function InteractivePreviewEnhancer({ children }) {
  const location = useLocation();
  const shellRef = useRef(null);
  const [sectionCount, setSectionCount] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const main = shell.querySelector(".ax-preview-main");
    if (!main) return;

    let cleanupFns = [];
    let revealObserver;
    let sectionObserver;

    const setup = () => {
      const sections = [...main.querySelectorAll("section")];
      setSectionCount(sections.length);

      sections.forEach((section, index) => {
        section.dataset.previewSection = String(index);
        section.classList.add("ax-io-reveal");
      });

      if (!reducedMotion) {
        revealObserver = new IntersectionObserver(
          entries => entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add("ax-io-visible");
          }),
          { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
        );
        sections.forEach(section => revealObserver.observe(section));
      } else {
        sections.forEach(section => section.classList.add("ax-io-visible"));
      }

      sectionObserver = new IntersectionObserver(
        entries => {
          const visible = entries
            .filter(entry => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (visible) setActiveSection(Number(visible.target.dataset.previewSection || 0));
        },
        { threshold: [0.2, 0.45, 0.7] }
      );
      sections.forEach(section => sectionObserver.observe(section));

      const magnets = [...main.querySelectorAll("button, a")].filter(el =>
        !el.closest(".preview-section-nav") &&
        (el.className?.toString().includes("btn") || el.tagName === "BUTTON")
      );

      magnets.forEach(el => {
        el.classList.add("ax-magnetic");
        if (reducedMotion) return;

        const onMove = event => {
          const rect = el.getBoundingClientRect();
          const dx = (event.clientX - (rect.left + rect.width / 2)) * 0.08;
          const dy = (event.clientY - (rect.top + rect.height / 2)) * 0.08;
          el.style.transform = `translate(${dx}px, ${dy}px)`;
        };
        const onLeave = () => { el.style.transform = ""; };
        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
        cleanupFns.push(() => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
          el.style.transform = "";
        });
      });
    };

    const raf = requestAnimationFrame(setup);

    const onScroll = () => {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const progress = Math.min(100, Math.max(0, (window.scrollY / max) * 100));
      shell.style.setProperty("--preview-progress", `${progress}%`);
    };

    const onPointer = event => {
      shell.style.setProperty("--preview-pointer-x", `${event.clientX}px`);
      shell.style.setProperty("--preview-pointer-y", `${event.clientY}px`);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    if (!reducedMotion) window.addEventListener("pointermove", onPointer, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(raf);
      revealObserver?.disconnect();
      sectionObserver?.disconnect();
      cleanupFns.forEach(fn => fn());
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, [location.pathname]);

  const jumpToSection = index => {
    const main = shellRef.current?.querySelector(".ax-preview-main");
    const target = main?.querySelector(`[data-preview-section="${index}"]`);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={shellRef} className="preview-interactive-shell">
      <style>{styles}</style>
      <div className="preview-progress" aria-hidden="true" />
      <div className="preview-pointer-glow" aria-hidden="true" />
      {sectionCount > 1 && (
        <nav className="preview-section-nav" aria-label="ניווט בין אזורי העמוד">
          {Array.from({ length: sectionCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              className={`preview-section-dot ${activeSection === index ? "active" : ""}`}
              onClick={() => jumpToSection(index)}
              aria-label={`מעבר לאזור ${index + 1}`}
            />
          ))}
        </nav>
      )}
      {children}
    </div>
  );
}
