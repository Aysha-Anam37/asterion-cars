import React, { useState } from 'react';

interface ResilientImageProps {
  src: string;
  alt: string;
  fallbackLabel?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  fallbackLabel = 'ASTERION CONCEPT VISUAL',
  className = '',
  imgClassName = '',
  priority = false,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#131519] via-[#0B0D10] to-[#08090B] border border-white/[0.08] p-8 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <svg
          viewBox="0 0 160 56"
          className="w-32 h-12 text-[#C7AD7A]/60 mb-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          aria-hidden="true"
        >
          <path d="M12 40 C28 38, 42 20, 76 18 C108 16, 128 26, 148 38 L152 40 L8 40 Z" />
          <circle cx="38" cy="40" r="9" />
          <circle cx="122" cy="40" r="9" />
        </svg>
        <span className="text-xs tracking-[0.22em] uppercase text-[#9A9A96]">
          {fallbackLabel}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#0E1014] ${className}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
      {!isLoaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-[#131519] to-[#08090B]"
        />
      )}
    </div>
  );
};
