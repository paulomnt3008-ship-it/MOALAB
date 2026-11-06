import { useEffect, useRef } from 'react';

// Marks a group with data-reveal and switches it to "visible" the first time it enters the screen.
// The animation itself lives in styles/utilities.css.
export function useReveal({ threshold = 0.2 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    element.dataset.reveal = 'hidden';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.dataset.reveal = 'visible';
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
