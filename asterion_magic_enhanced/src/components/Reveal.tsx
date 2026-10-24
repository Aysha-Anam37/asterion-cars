import React from 'react';
import { useInViewOnce, usePrefersReducedMotion } from '../hooks/useMotionPreferences';

interface RevealProps {
  children: React.ReactNode;
  delayMs?: number;
  variant?: 'fade-up' | 'blur-focus' | 'scale-in';
  className?: string;
  as?: 'div' | 'header' | 'article' | 'section';
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  delayMs = 0,
  variant = 'fade-up',
  className = '',
  as: Component = 'div',
}) => {
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.14);
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return <Component className={className}>{children}</Component>;
  }

  let hiddenStyles = 'opacity-0 translate-y-6';
  let visibleStyles = 'opacity-100 translate-y-0';

  if (variant === 'blur-focus') {
    hiddenStyles = 'opacity-0 translate-y-4 blur-[5px]';
    visibleStyles = 'opacity-100 translate-y-0 blur-0';
  } else if (variant === 'scale-in') {
    hiddenStyles = 'opacity-0 scale-[0.97]';
    visibleStyles = 'opacity-100 scale-100';
  }

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform] ${
        inView ? visibleStyles : hiddenStyles
      } ${className}`}
    >
      {children}
    </div>
  );
};
