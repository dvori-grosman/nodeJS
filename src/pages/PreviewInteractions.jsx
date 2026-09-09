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
      '#about .about-title',
      '#about .about-head h2',
      '#classes .book-title',
      '#locations section:first-of-type h1',
      '#locations h2',
      '#performances section:first-of-type h1',
      '#performances section:last-of-type h2',
      '#shop section:first-of-type h1',
      '#contact section:first-of-type h1',
      '#registration section:first-of-type h1',
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
      '#performances article',
      '#shop article',
      '#about .about-value',
      '#registration .group',
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
    selector: '#locations .pin-button',
  },
  {
    kind: 'chip',
    selector: '#classes .book-chip, #classes .book-meta-item',
  },
  {
    kind: 'label',
    selector: '.landing-section-label, .book-kicker',
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
  window.history.replaceState({}, '', id === 'home' ? '/' : `/#${id}`);
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
      threshold: 0.03,
      rootMargin: '0px 0px -10% 0px',
    });

    const registerElement = (element, kind, index) => {
      if (element.dataset.previewRevealRegistered === 'true') return;
      element.dataset.previewRevealRegistered = 'true';
      element.classList.add('preview-reveal', `preview-reveal-${kind}`);
      element.style.setProperty('--preview-reveal-delay', `${Math.min(index, 4) * 75}ms`);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => observer.observe(element));
      });
    };

    const registerRevealItems = () => {
      animationRules.forEach(rule => {
        document.querySelectorAll(rule.selector).forEach((element, index) => registerElement(element, rule.kind, index));
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
      setProgress(scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(updateProgress); };

    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <style>{`
        .preview-reveal {
          transition-delay: var(--preview-reveal-delay, 0ms) !important;
          will-change: transform, opacity, filter, clip-path;
        }

        /* Headlines: clean masked rise. No parent/child nesting. */
        .preview-reveal-title {
          opacity: 0;
          transform: translateY(42px);
          clip-path: inset(0 0 32% 0);
          transition: opacity .65s ease, transform .9s cubic-bezier(.16,1,.3,1), clip-path .9s cubic-bezier(.16,1,.3,1) !important;
        }
        .preview-reveal-title.preview-reveal-visible {
          opacity: 1;
          transform: translateY(0);
          clip-path: inset(0 0 0 0);
        }

        /* Images gently zoom back into position. */
        .preview-reveal-image {
          opacity: 0;
          transform: scale(1.06);
          transition: opacity .8s ease, transform 1.05s cubic-bezier(.16,1,.3,1) !important;
        }
        .preview-reveal-image.preview-reveal-visible { opacity: 1; transform: scale(1); }

        /* Lesson blocks rise as complete editorial panels. */
        .preview-reveal-class-slide {
          opacity: 0;
          transform: translateY(54px);
          transition: opacity .72s ease, transform .95s cubic-bezier(.16,1,.3,1) !important;
        }
        .preview-reveal-class-slide.preview-reveal-visible { opacity: 1; transform: translateY(0); }

        /* Cards always stay straight. */
        .preview-reveal-card {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity .62s ease, transform .78s cubic-bezier(.16,1,.3,1), box-shadow .3s ease !important;
        }
        .preview-reveal-card.preview-reveal-visible { opacity: 1; transform: translateY(0); }

        /* Accordion rows slide softly from RTL direction. */
        .preview-reveal-step {
          opacity: 0;
          transform: translateX(38px);
          transition: opacity .55s ease, transform .75s cubic-bezier(.16,1,.3,1) !important;
        }
        .preview-reveal-step.preview-reveal-visible { opacity: 1; transform: translateX(0); }

        /* Panels fade and rise. */
        .preview-reveal-panel {
          opacity: 0;
          transform: translateY(46px);
          transition: opacity .7s ease, transform .9s cubic-bezier(.16,1,.3,1) !important;
        }
        .preview-reveal-panel.preview-reveal-visible { opacity: 1; transform: translateY(0); }

        /* Form opens subtly without perspective distortion. */
        .preview-reveal-form {
          opacity: 0;
          transform: translateY(30px) scale(.985);
          transition: opacity .7s ease, transform .85s cubic-bezier(.16,1,.3,1) !important;
        }
        .preview-reveal-form.preview-reveal-visible { opacity: 1; transform: translateY(0) scale(1); }

        /* Map pins get a small pop, never move their positioning wrapper. */
        .preview-reveal-pin {
          opacity: 0;
          transform: scale(.55);
          transition: opacity .35s ease, transform .58s cubic-bezier(.34,1.56,.64,1) !important;
        }
        .preview-reveal-pin.preview-reveal-visible { opacity: 1; transform: scale(1); }

        .preview-reveal-chip {
          opacity: 0;
          transform: translateY(14px);
          transition: opacity .4s ease, transform .55s cubic-bezier(.16,1,.3,1) !important;
        }
        .preview-reveal-chip.preview-reveal-visible { opacity: 1; transform: translateY(0); }

        .preview-reveal-label {
          opacity: 0;
          transform: translateX(22px);
          transition: opacity .5s ease, transform .65s cubic-bezier(.16,1,.3,1) !important;
        }
        .preview-reveal-label.preview-reveal-visible { opacity: 1; transform: translateX(0); }

        .preview-reveal-cta {
          opacity: 0;
          transform: translateY(18px) scale(.94);
          transition: opacity .45s ease, transform .6s cubic-bezier(.34,1.3,.64,1) !important;
        }
        .preview-reveal-cta.preview-reveal-visible { opacity: 1; transform: translateY(0) scale(1); }

        .preview-progress {
          position: fixed;
          z-index: 130;
          top: 82px;
          left: 0;
          width: 3px;
          height: calc(100vh - 82px);
          background: rgba(43,35,39,.07);
          pointer-events: none;
        }
        .preview-progress-fill {
          width: 100%;
          background: linear-gradient(to bottom, #E8B4CB, #D4AF37);
          transform-origin: top;
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
          border: 1px solid rgba(43,35,39,.14);
          min-height: 48px;
          padding: 0 17px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          border-radius: 999px;
          background: rgba(255,249,244,.9);
          color: #2B2327;
          backdrop-filter: blur(16px);
          box-shadow: 0 10px 30px rgba(43,35,39,.08);
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: transform .25s ease, border-color .25s ease, background .25s ease;
        }
        .preview-action-button:hover { transform: translateY(-2px); border-color: rgba(183,108,139,.5); }
        .preview-action-button.primary { background: #D4AF37; border-color: #D4AF37; color: #251d12; }
        .preview-action-button.primary:hover { background: #E8B4CB; border-color: #E8B4CB; }

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
          border: 1px solid rgba(43,35,39,.12);
          background: rgba(255,249,244,.88);
          color: #6E6066;
          backdrop-filter: blur(14px);
          cursor: pointer;
          opacity: ${progress > 0.08 ? 1 : 0};
          transform: translateY(${progress > 0.08 ? 0 : 12}px);
          pointer-events: ${progress > 0.08 ? 'auto' : 'none'};
          transition: .25s ease;
        }
        .preview-back-top:hover { color: #9A7420; border-color: rgba(212,175,55,.55); }

        @media (prefers-reduced-motion: reduce) {
          .preview-reveal { opacity: 1 !important; transform: none !important; clip-path: none !important; transition: none !important; }
        }

        @media (max-width: 760px) {
          .preview-progress { top: 72px; height: calc(100vh - 72px); }
          .preview-action-dock { left: 12px; right: 12px; bottom: 12px; display: grid; grid-template-columns: 1fr 1fr; }
          .preview-action-button { padding: 0 12px; min-height: 46px; font-size: 12px; }
          .preview-back-top { right: 14px; bottom: 70px; width: 42px; height: 42px; }
        }
      `}</style>

      <div className="preview-progress" aria-hidden="true">
        <div className="preview-progress-fill" style={{ height: `${progress * 100}%` }} />
      </div>

      <div className="preview-action-dock" aria-label="פעולות מהירות">
        <button type="button" className="preview-action-button" onClick={() => goToSection('contact')}>
          <MessageCircle size={17} /> יצירת קשר
        </button>
        <button type="button" className="preview-action-button primary" onClick={() => goToSection('registration')}>
          <ClipboardCheck size={17} /> להרשמה
        </button>
      </div>

      <button type="button" className="preview-back-top" onClick={() => goToSection('home')} aria-label="חזרה לראש העמוד">
        <ArrowUp size={18} />
      </button>
    </>
  );
}
