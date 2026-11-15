// Aurora.jsx — React Bits: subtle animated gradient background for Hero
// Low-contrast, theme-aware. On mobile it renders a static gradient fallback.
import { useEffect, useRef } from 'react';

export default function Aurora({ isMobile = false, className = '' }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (isMobile) return; // skip canvas on mobile
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);

    let t = 0;

    // Check if dark mode
    const isDark = () => document.documentElement.classList.contains('dark');

    function getColors() {
      return isDark()
        ? ['rgba(196,98,45,0.07)', 'rgba(100,60,30,0.05)', 'rgba(30,20,10,0)']
        : ['rgba(196,98,45,0.06)', 'rgba(240,180,140,0.07)', 'rgba(247,244,239,0)'];
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const colors = getColors();

      // Three slow drifting blobs
      const blobs = [
        { x: w * 0.3 + Math.sin(t * 0.5) * w * 0.15, y: h * 0.4 + Math.cos(t * 0.4) * h * 0.1, r: w * 0.45, color: colors[0] },
        { x: w * 0.7 + Math.cos(t * 0.3) * w * 0.1, y: h * 0.6 + Math.sin(t * 0.6) * h * 0.12, r: w * 0.35, color: colors[1] },
        { x: w * 0.5 + Math.sin(t * 0.7) * w * 0.08, y: h * 0.3 + Math.cos(t * 0.5) * h * 0.08, r: w * 0.3, color: colors[2] },
      ];

      blobs.forEach(({ x, y, r, color }) => {
        const grd = ctx.createRadialGradient(x, y, 0, x, y, r);
        grd.addColorStop(0, color);
        grd.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, w, h);
      });

      t += 0.003;
      rafRef.current = requestAnimationFrame(draw);
    }

    draw();

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [isMobile]);

  if (isMobile) {
    // Static gradient fallback
    return (
      <div
        className={`absolute inset-0 ${className}`}
        style={{
          background: 'linear-gradient(135deg, var(--color-accent-muted) 0%, var(--color-bg) 60%)',
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}
