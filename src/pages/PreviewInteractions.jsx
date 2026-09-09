import React, { useEffect, useState } from 'react';
import { ArrowUp, ClipboardCheck, MessageCircle } from 'lucide-react';

const routeToSection = {
  '/': 'home',
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

const animationRules = [
  {
    kind: 'title',
    selector: [
      '.landing-section h1',
      '.landing-section h2',
      '.about-head',
    ].join(','),
  },
  {
    kind: 'image',
    selector: [
      '#performances img',
      '#shop img',
      '#about .about-logo-wrap img',
      '#classes .book-icon',
    ].join(','),
  },
  {
    kind: 'class-slide',
    selector: '#classes .book-slide',
  },
  {
    kind: 'card',
    selector: [
      '#locations article',
      '#performances .group',
      '#shop .group',
      '#registration .group',
      '#about .about-value',
    ].join(','),
  },
  {
    kind: 'step',
    selector: '#about .about-step',
  },
  {
    kind: 'panel',
    selector: [
      '#about .about-story-preview',
      '#contact .elegant-shadow',
      '#registration .elegant-shadow',
    ].join(','),
  },
  {
    kind: 'form',
    selector: '#contact form',
  },
  {
    kind: 'pin',
    selector: '#locations .branch-pin, #locations .pin-button',
  },
  {
    kind: 'chip',
    selector: [
      '#classes .book-chip',
      '#classes .book-meta-item',
      '#performances [class*="Badge"],',
      '#registration button',
    ].join(','),
  },
  {
    kind: 'label',
    selector: '.landing-section-label, .landing-eyebrow, .book-kicker',
  },
  {
    kind: 'cta',
    selector: [
      '#about .about-round-link',
      '#classes .book-bottom a',
      '#shop a',
      '#registration a',
      '#contact button[type="submit"]',
    ].join(','),
  },
];

function goToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;

  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const nextUrl = id === 'home' ? '/' : `/#${id}`;
  window.history.replaceState({}, '', nextUrl);
}

export default function PreviewInteractions() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleInternalLinks = event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = event.target.closest?.('a[href]');
      if (!anchor || anchor.hasAttribute('download')) return;

      const rawHref = anchor.getAttribute('href');
      if (!rawHref || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:')) return;

      let sectionId = null;

      if (rawHref.startsWith('#')) {
        sectionId = rawHref.slice(1);
      } else {
        const url = new URL(rawHref, window.location.href);
        if (url.origin !== window.location.origin) return;
        sectionId = routeToSection[url.pathname] || (url.hash ? url.hash.slice(1) : null);
      }

      if (!sectionId || !document.getElementById(sectionId)) return;

      event.preventDefault();
      goToSection(sectionId);
    };

    document.addEventListener('click', handleInternalLinks, true);
    return () => document.removeEventListener('click', handleInternalLinks, true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('preview-reveal-visible');
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -7% 0px',
    });

    const registerRevealItems = () => {
      animationRules.forEach(rule => {
        document.querySelectorAll(rule.selector).forEach((element, index) => {
          if (element.dataset.previewRevealRegistered === 'true') return;

          element.dataset.previewRevealRegistered = 'true';
          element.dataset.previewRevealKind = rule.kind;
          element.classList.add('preview-reveal', `preview-reveal-${rule.kind}`);
          element.style.setProperty('--preview-reveal-delay', `${(index % 5) * 90}ms`);
          element.style.setProperty('--preview-reveal-index', index);

          if (rule.kind === 'card') {
            element.classList.add(index % 2 === 0 ? 'preview-from-right' : 'preview-from-left');
          }

          observer.observe(element);
        });
      });
    };

    registerRevealItems();
    const mutationObserver = new MutationObserver(registerRevealItems);
    mutationObserver.observe(document.querySelector('.landing-preview') || document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    let raf = 0;
    const updateProgress = () => {
      raf = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const next = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      setProgress(next);
    };

    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <style>{`
        .preview-reveal {
          transition-delay: var(--preview-reveal-delay, 0ms) !important;
          will-change: transform, opacity, filter, clip-path;
        }

        /* Titles: masked vertical reveal with a slight skew. */
        .preview-reveal-title {
          opacity: 0;
          transform: translate3d(0, 58px, 0) skewY(2.2deg);
          clip-path: inset(0 0 100% 0);
          transition:
            opacity .7s ease,
            transform .95s cubic-bezier(.16,1,.3,1),
            clip-path 1s cubic-bezier(.16,1,.3,1) !important;
        }
        .preview-reveal-title.preview-reveal-visible {
          opacity: 1;
          transform: none;
          clip-path: inset(0 0 0 0);
        }

        /* Images: start close, then breathe outward into place. */
        .preview-reveal-image {
          opacity: 0;
          transform: scale(1.14);
          filter: grayscale(.5) contrast(1.08) brightness(.72);
          transition:
            opacity .9s ease,
            transform 1.35s cubic-bezier(.16,1,.3,1),
            filter 1.15s ease !important;
        }
        .preview-reveal-image.preview-reveal-visible {
          opacity: 1;
          transform: scale(1);
          filter: grayscale(0) contrast(1) brightness(1);
        }

        /* Class sections: soft cinematic scale-up. */
        .preview-reveal-class-slide {
          opacity: 0;
          transform: translate3d(0, 38px, 0) scale(.94);
          filter: blur(10px);
          transition:
            opacity .85s ease,
            transform 1.05s cubic-bezier(.16,1,.3,1),
            filter .9s ease !important;
        }
        .preview-reveal-class-slide.preview-reveal-visible {
          opacity: 1;
          transform: translate3d(0,0,0) scale(1);
          filter: blur(0);
        }

        /* Cards: alternate sides, with a very small rotation. */
        .preview-reveal-card {
          opacity: 0;
          filter: blur(5px);
          transition:
            opacity .72s ease,
            transform .9s cubic-bezier(.2,.82,.2,1),
            filter .75s ease !important;
        }
        .preview-reveal-card.preview-from-right { transform: translate3d(64px, 22px, 0) rotate(1.4deg); }
        .preview-reveal-card.preview-from-left { transform: translate3d(-64px, 22px, 0) rotate(-1.4deg); }
        .preview-reveal-card.preview-reveal-visible {
          opacity: 1;
          transform: none;
          filter: blur(0);
        }

        /* About accordion rows: horizontal wipe. */
        .preview-reveal-step {
          opacity: 0;
          transform: translateX(72px);
          clip-path: inset(0 100% 0 0);
          transition:
            opacity .65s ease,
            transform .85s cubic-bezier(.16,1,.3,1),
            clip-path .95s cubic-bezier(.16,1,.3,1) !important;
        }
        .preview-reveal-step.preview-reveal-visible {
          opacity: 1;
          transform: none;
          clip-path: inset(0 0 0 0);
        }

        /* Large panels: rise gently and sharpen. */
        .preview-reveal-panel {
          opacity: 0;
          transform: translateY(76px);
          filter: blur(12px);
          transition:
            opacity .82s ease,
            transform 1.05s cubic-bezier(.16,1,.3,1),
            filter .9s ease !important;
        }
        .preview-reveal-panel.preview-reveal-visible {
          opacity: 1;
          transform: none;
          filter: blur(0);
        }

        /* Forms: subtle perspective opening, like a sheet unfolding. */
        .preview-reveal-form {
          opacity: 0;
          transform-origin: top center;
          transform: perspective(1000px) rotateX(9deg) translateY(34px) scale(.97);
          transition:
            opacity .75s ease,
            transform 1s cubic-bezier(.16,1,.3,1) !important;
        }
        .preview-reveal-form.preview-reveal-visible {
          opacity: 1;
          transform: perspective(1000px) rotateX(0deg) translateY(0) scale(1);
        }

        /* Map pins: elastic pop. */
        .preview-reveal-pin {
          opacity: 0;
          transform: scale(.15) rotate(-18deg);
          transform-origin: center;
          transition:
            opacity .25s ease,
            transform .72s cubic-bezier(.34,1.56,.64,1) !important;
        }
        .preview-reveal-pin.preview-reveal-visible {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }

        /* Small chips/meta: quick staggered rise. */
        .preview-reveal-chip {
          opacity: 0;
          transform: translateY(20px) scale(.82);
          transition:
            opacity .4s ease,
            transform .58s cubic-bezier(.34,1.56,.64,1) !important;
        }
        .preview-reveal-chip.preview-reveal-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* Eyebrows and section labels: tracking + lateral reveal. */
        .preview-reveal-label {
          opacity: 0;
          transform: translateX(34px);
          letter-spacing: .5em !important;
          transition:
            opacity .65s ease,
            transform .8s cubic-bezier(.16,1,.3,1),
            letter-spacing .9s cubic-bezier(.16,1,.3,1) !important;
        }
        .preview-reveal-label.preview-reveal-visible {
          opacity: 1;
          transform: none;
          letter-spacing: .18em !important;
        }

        /* CTA elements: compact pop with rotation. */
        .preview-reveal-cta {
          opacity: 0;
          transform: translateY(22px) scale(.72) rotate(-5deg);
          transition:
            opacity .45s ease,
            transform .72s cubic-bezier(.34,1.56,.64,1) !important;
        }
        .preview-reveal-cta.preview-reveal-visible {
          opacity: 1;
          transform: translateY(0) scale(1) rotate(0deg);
        }

        .preview-progress {
          position: fixed;
          z-index: 130;
          top: 82px;
          left: 0;
          width: 3px;
          height: calc(100vh - 82px);
          background: rgba(255,255,255,.06);
          pointer-events: none;
        }

        .preview-progress-fill {
          width: 100%;
          background: linear-gradient(to bottom, #E8B4CB, #D4AF37);
          transform-origin: top;
          box-shadow: 0 0 18px rgba(212,175,55,.45);
        }

        .preview-action-dock {
          position: fixed;
          z-index: 120;
          left: 22px;
          bottom: 22px;
          display: flex;
          gap: 10px;
          direction: rtl;
        }

        .preview-action-button {
          border: 1px solid rgba(255,255,255,.16);
          min-height: 48px;
          padding: 0 17px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          border-radius: 999px;
          background: rgba(12,12,12,.84);
          color: #f2eee7;
          backdrop-filter: blur(16px);
          box-shadow: 0 12px 34px rgba(0,0,0,.28);
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: transform .25s ease, border-color .25s ease, background .25s ease, color .25s ease;
        }

        .preview-action-button:hover {
          transform: translateY(-3px);
          border-color: rgba(232,180,203,.65);
          color: #E8B4CB;
        }

        .preview-action-button.primary {
          background: #D4AF37;
          border-color: #D4AF37;
          color: #111;
        }

        .preview-action-button.primary:hover {
          background: #E8B4CB;
          border-color: #E8B4CB;
          color: #111;
        }

        .preview-back-top {
          position: fixed;
          z-index: 119;
          right: 20px;
          bottom: 22px;
          width: 48px;
          height: 48px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,.14);
          background: rgba(12,12,12,.78);
          color: #aaa;
          backdrop-filter: blur(14px);
          cursor: pointer;
          opacity: ${progress > 0.08 ? 1 : 0};
          transform: translateY(${progress > 0.08 ? 0 : 12}px);
          pointer-events: ${progress > 0.08 ? 'auto' : 'none'};
          transition: .25s ease;
        }

        .preview-back-top:hover { color: #D4AF37; border-color: rgba(212,175,55,.55); }

        @media (prefers-reduced-motion: reduce) {
          .preview-reveal {
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
            clip-path: none !important;
            transition: none !important;
          }
        }

        @media (max-width: 760px) {
          .preview-progress { top: 72px; height: calc(100vh - 72px); }
          .preview-action-dock {
            left: 12px;
            right: 12px;
            bottom: 12px;
            display: grid;
            grid-template-columns: 1fr 1fr;
          }
          .preview-action-button { padding: 0 12px; min-height: 46px; font-size: 12px; }
          .preview-back-top { right: 14px; bottom: 70px; width: 42px; height: 42px; }
        }
      `}</style>

      <div className="preview-progress" aria-hidden="true">
        <div className="preview-progress-fill" style={{ height: `${progress * 100}%` }} />
      </div>

      <div className="preview-action-dock" aria-label="פעולות מהירות">
        <button type="button" className="preview-action-button" onClick={() => goToSection('contact')}>
          <MessageCircle size={17} />
          יצירת קשר
        </button>
        <button type="button" className="preview-action-button primary" onClick={() => goToSection('registration')}>
          <ClipboardCheck size={17} />
          להרשמה
        </button>
      </div>

      <button type="button" className="preview-back-top" onClick={() => goToSection('home')} aria-label="חזרה לראש העמוד">
        <ArrowUp size={18} />
      </button>
    </>
  );
}
