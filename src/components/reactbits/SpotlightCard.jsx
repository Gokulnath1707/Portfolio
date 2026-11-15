// SpotlightCard.jsx — React Bits: cursor-following spotlight on card hover
// Spotlight is disabled on touch devices (pointer: coarse).
import { useRef } from 'react';

export default function SpotlightCard({ children, className = '' }) {
  const cardRef = useRef(null);
  const spotRef = useRef(null);

  const isTouch =
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: coarse)').matches;

  const handleMouseMove = (e) => {
    if (isTouch || !cardRef.current || !spotRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotRef.current.style.left = `${x}px`;
    spotRef.current.style.top = `${y}px`;
    spotRef.current.style.opacity = '1';
  };

  const handleMouseLeave = () => {
    if (spotRef.current) spotRef.current.style.opacity = '0';
  };

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-xl border border-border bg-surface shadow-card
        transition-shadow duration-200 hover:shadow-card-hover ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Spotlight blob */}
      {!isTouch && (
        <div
          ref={spotRef}
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full
            bg-accent/10 blur-2xl opacity-0 transition-opacity duration-300"
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}
