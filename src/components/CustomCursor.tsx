import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top = e.clientY + 'px';
      }
    };

    const animate = () => {
      ringPos.current.x += (posRef.current.x - ringPos.current.x) * 0.1;
      ringPos.current.y += (posRef.current.y - ringPos.current.y) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.left = ringPos.current.x + 'px';
        ringRef.current.style.top = ringPos.current.y + 'px';
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const onEnterLink = () => {
      if (ringRef.current) ringRef.current.style.transform = 'translate(-50%, -50%) scale(1.8)';
      if (dotRef.current) dotRef.current.style.opacity = '0';
    };
    const onLeaveLink = () => {
      if (ringRef.current) ringRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
      if (dotRef.current) dotRef.current.style.opacity = '1';
    };

    document.addEventListener('mousemove', onMove);
    rafRef.current = requestAnimationFrame(animate);

    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] w-1.5 h-1.5 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'linear-gradient(135deg, #a78bfa, #60a5fa)' }}
      />
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998] w-8 h-8 rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-300"
        style={{
          border: '1px solid rgba(167, 139, 250, 0.5)',
          boxShadow: '0 0 8px rgba(167,139,250,0.2)',
        }}
      />
    </>
  );
}
