'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Revelado al hacer scroll. Observa todo lo que lleve la clase .rev
 * y le añade .visto con un pequeño retardo escalonado, igual que la
 * versión original en HTML. Se vuelve a ejecutar en cada cambio de ruta.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>('.rev'));
    if (items.length === 0) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('visto'));
      return;
    }

    const io = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((x) => {
          if (!x.isIntersecting) return;
          const el = x.target as HTMLElement;
          const hermanos = el.parentElement ? Array.from(el.parentElement.children) : [];
          const i = Math.max(0, hermanos.indexOf(el));
          el.style.transitionDelay = `${Math.min(i, 5) * 70}ms`;
          el.classList.add('visto');
          io.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    items.forEach((el) => {
      if (!el.classList.contains('visto')) io.observe(el);
    });

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
