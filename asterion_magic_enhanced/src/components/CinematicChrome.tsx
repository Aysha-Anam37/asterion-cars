import React, { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks/useMotionPreferences';
import { PageRoute } from './Navbar';

/** Lightweight global motion language: scroll progress, a soft pointer light, and route-change light sweep. */
export const CinematicChrome: React.FC<{ pageKey: PageRoute }> = ({ pageKey }) => {
  const reducedMotion = usePrefersReducedMotion();
  const pointerLightRef = useRef<HTMLDivElement | null>(null);
  const pointerFrameRef = useRef<number | null>(null);
  const pointerPositionRef = useRef({ x: -500, y: -500 });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const next = scrollable > 0 ? window.scrollY / scrollable : 0;
        setProgress(Math.max(0, Math.min(1, next)));
        raf = 0;
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const node = pointerLightRef.current;
    if (!node || !finePointer.matches) return;

    const onPointerMove = (event: PointerEvent) => {
      pointerPositionRef.current = { x: event.clientX, y: event.clientY };
      if (pointerFrameRef.current !== null) return;
      pointerFrameRef.current = window.requestAnimationFrame(() => {
        const { x, y } = pointerPositionRef.current;
        node.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        pointerFrameRef.current = null;
      });
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      if (pointerFrameRef.current !== null) window.cancelAnimationFrame(pointerFrameRef.current);
      pointerFrameRef.current = null;
    };
  }, [reducedMotion]);

  return (
    <>
      <div className="asterion-scroll-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
      {!reducedMotion && <div ref={pointerLightRef} className="asterion-pointer-light" aria-hidden="true" />}
      {!reducedMotion && (
        <div key={pageKey} className="asterion-route-sweep" aria-hidden="true">
          <span />
        </div>
      )}
    </>
  );
};
