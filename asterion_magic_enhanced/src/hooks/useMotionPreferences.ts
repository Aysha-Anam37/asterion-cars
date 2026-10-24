import { useEffect, useRef, useState } from 'react';

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return reduced;
}

export function useInViewOnce<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.2,
  rootMargin = '0px 0px -8% 0px'
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, threshold, rootMargin]);

  return { ref, inView };
}

interface CounterOptions {
  target: number;
  decimals?: number;
  durationMs?: number;
  startWhen: boolean;
}

export function useAnimatedCounter({
  target,
  decimals = 0,
  durationMs = 1650,
  startWhen,
}: CounterOptions): string {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [currentValue, setCurrentValue] = useState<number>(0);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    if (!startWhen) return;
    if (hasCompletedRef.current) {
      setCurrentValue(target);
      return;
    }

    if (prefersReducedMotion) {
      hasCompletedRef.current = true;
      setCurrentValue(target);
      return;
    }

    let animationFrameId = 0;
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (startTimestamp === null) {
        startTimestamp = timestamp;
      }
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / durationMs, 1);
      // Smooth easeOutQuart curve for crisp luxury deceleration
      const eased = 1 - Math.pow(1 - progress, 4);
      const nextVal = target * eased;

      setCurrentValue(nextVal);

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        hasCompletedRef.current = true;
        setCurrentValue(target);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [startWhen, target, durationMs, prefersReducedMotion]);

  if (!startWhen && !hasCompletedRef.current) {
    return (0).toFixed(decimals);
  }

  return currentValue.toFixed(decimals);
}

export function useSubtleParallax(maxOffsetPx = 28) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setOffsetY(0);
      return;
    }

    let ticking = false;

    const updateParallax = () => {
      const el = containerRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const viewportHeight = window.innerHeight || 1;
        const centerOffset = (rect.top + rect.height / 2 - viewportHeight / 2) / viewportHeight;
        const clamped = Math.max(-1, Math.min(1, centerOffset));
        // Reduce intensity on narrow mobile screens
        const scaleFactor = window.innerWidth < 768 ? 0.35 : 1;
        setOffsetY(clamped * maxOffsetPx * scaleFactor);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    updateParallax();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [maxOffsetPx, prefersReducedMotion]);

  return { containerRef, offsetY };
}
