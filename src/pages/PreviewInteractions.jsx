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

const revealSelector = [
  '#about .about-head',
  '#about .about-story-preview',
  '#about .about-step',
  '#about .about-value',
  '#classes .book-slide',
  '#locations article',
  '#performances .group',
  '#shop .group',
  '#contact .elegant-shadow',
  '#contact form',
  '#registration .group',
  '#registration .elegant-shadow',
].join(',');

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
      rootMargin: '0px 0px -8% 0px',
    });

    const registerRevealItems = () => {
      document.querySelectorAll(revealSelector).forEach((element, index) => {
        if (element.dataset.previewRevealRegistered === 'true') return;
        element.dataset.previewRevealRegistered = 'true';
        element.classList.add('preview-reveal');
        element.style.setProperty('--preview-reveal-delay', `${(index % 4) * 85}ms`);
        if (index % 2) element.classList.add('preview-reveal-alt');
        observer.observe(element);
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
          opacity: 0;
          transform: translate3d(0, 52px, 0) scale(.985);
          filter: blur(8px);
          transition:
            opacity .82s cubic-bezier(.2,.75,.2,1),
            transform .9s cubic-bezier(.2,.75,.2,1),
            filter .8s ease;
          transition-delay: var(--preview-reveal-delay, 0ms);
          will-change: transform, opacity, filter;
        }

        .preview-reveal.preview-reveal-alt {
          transform: translate3d(-34px, 48px, 0) scale(.985);
        }

        .preview-reveal.preview-reveal-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1);
          filter: blur(0);
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
          .preview-reveal,
          .preview-reveal.preview-reveal-alt {
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
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
