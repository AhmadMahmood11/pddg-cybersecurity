'use client';

import { useEffect } from 'react';

export function MotionController() {
  useEffect(() => {
    const selector = [
      '.section-intro', '.benefit-grid article', '.service-card', '.industry-card',
      '.resource-card', '.process-item', '.report-preview', '.four-grid article',
      '.related-card', '.panel', '.lead-form', '.article-layout > *', '.credential-logos img'
    ].join(',');
    const items = Array.from(document.querySelectorAll<HTMLElement>(selector));
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    items.forEach((item, index) => {
      item.classList.add('reveal-item');
      item.style.setProperty('--reveal-order', String(index % 6));
    });
    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach(item => item.classList.add('is-revealed'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).classList.add('is-revealed');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  return null;
}
