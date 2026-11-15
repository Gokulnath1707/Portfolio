// ScrollReveal.jsx — React Bits: fade+slide on scroll entry
// Uses Intersection Observer. Respects prefers-reduced-motion.
import { useRef, useEffect, useState } from 'react';

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,       // ms
  direction = 'up', // 'up' | 'left' | 'right' | 'none'
  reducedMotion = false,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reducedMotion) { setVisible(true); return; }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const translateMap = { up: 'translateY(24px)', left: 'translateX(-24px)', right: 'translateX(24px)', none: 'none' };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : translateMap[direction],
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
