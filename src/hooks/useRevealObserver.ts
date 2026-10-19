import { useEffect, useRef } from 'react';

/**
 * useRevealObserver
 * Watches elements and adds class "show" when they cross the viewport
 * at a 12% threshold.  Returns a ref-setter function.
 */
export function useRevealObserver() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementsRef = useRef<Set<Element>>(new Set());

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('show');
            observerRef.current?.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    // Observe any elements already registered
    elementsRef.current.forEach((el) => observerRef.current!.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  /** Call this as a ref callback on any element you want to reveal */
  const observe = (el: Element | null) => {
    if (!el) return;
    elementsRef.current.add(el);
    observerRef.current?.observe(el);
  };

  return { observe };
}
