import { useEffect } from 'react';

export default function PreviewMotionGuard() {
  useEffect(() => {
    const visibleClass = 'preview-reveal-visible';

    const revealIfVisible = element => {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.94 && rect.bottom > 0;
      if (isVisible) {
        requestAnimationFrame(() => element.classList.add(visibleClass));
        return true;
      }
      return false;
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add(visibleClass);
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.04,
      rootMargin: '0px 0px -3% 0px',
    });

    const register = () => {
      document.querySelectorAll('.preview-reveal').forEach(element => {
        if (element.classList.contains(visibleClass)) return;
        if (!revealIfVisible(element)) observer.observe(element);
      });
    };

    const onScroll = () => register();
    register();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    const mutationObserver = new MutationObserver(register);
    mutationObserver.observe(document.querySelector('.landing-preview') || document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
    });

    // Never allow content to remain hidden because of a missed observer callback.
    const safetyTimer = window.setTimeout(() => {
      document.querySelectorAll('.preview-reveal').forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 1.15) element.classList.add(visibleClass);
      });
    }, 900);

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.clearTimeout(safetyTimer);
    };
  }, []);

  return null;
}
