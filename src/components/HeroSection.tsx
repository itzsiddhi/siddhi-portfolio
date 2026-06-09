import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useThreeScene } from '../hooks/useThreeScene';

const SUBTITLES = [
  'Full Stack Engineer',
  'Founder of Xhalee',
  'Embedded Systems Researcher',
  'B.Tech EEE · 2027',
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [typeText, setTypeText] = useState('');
  const [showScroll, setShowScroll] = useState(false);

  useThreeScene(containerRef);

  useEffect(() => {
    let phraseIdx = 0, charIdx = 0, deleting = false, paused = 0;
    const tick = () => {
      const phrase = SUBTITLES[phraseIdx];
      if (paused > 0) { paused--; return; }
      if (!deleting) {
        setTypeText(phrase.slice(0, charIdx + 1));
        charIdx++;
        if (charIdx === phrase.length) { deleting = true; paused = 55; }
      } else {
        setTypeText(phrase.slice(0, charIdx - 1));
        charIdx--;
        if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % SUBTITLES.length; paused = 8; }
      }
    };
    const id = setInterval(tick, deleting ? 40 : 70);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowScroll(true), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <div ref={containerRef} className="absolute inset-0" aria-hidden="true" />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(0,0,8,0.65) 100%)' }}
      />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-mono text-xs tracking-[0.35em] text-text-secondary mb-6"
        >
          MULTI-DISCIPLINARY ENGINEER · BENGALURU, INDIA
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-grotesk font-bold leading-none mb-6 tracking-tight"
          style={{ fontSize: 'clamp(3rem, 10vw, 7rem)' }}
        >
          <span className="holo-text">SIDDHI TIWARI</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="font-inter text-lg md:text-xl text-text-secondary mb-10 h-8 flex items-center justify-center"
        >
          <span style={{ color: '#f0f0ff' }}>{typeText}</span>
          <span className="animate-pulse ml-0.5" style={{ color: '#a78bfa' }}>|</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#work"
            className="holo-btn relative font-mono text-xs tracking-[0.25em] px-8 py-3.5 rounded-sm transition-all duration-300"
            style={{ border: '1px solid rgba(167,139,250,0.5)', background: 'rgba(167,139,250,0.05)', color: '#f0f0ff' }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(167,139,250,0.9)'; el.style.background = 'rgba(167,139,250,0.12)'; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(167,139,250,0.5)'; el.style.background = 'rgba(167,139,250,0.05)'; }}
          >
            VIEW WORK
          </a>
          <a
            href="#contact"
            className="group flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-text-secondary hover:text-text-primary transition-colors duration-300 py-3.5 relative"
          >
            <span>GET IN TOUCH</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            <span
              className="absolute bottom-2 left-0 h-px transition-all duration-300 group-hover:w-full w-0"
              style={{ background: 'linear-gradient(90deg, #a78bfa, #34d399)' }}
            />
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showScroll ? 1 : 0 }}
        transition={{ duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-4 h-4 border-b border-r border-text-secondary rotate-45 opacity-50"
        />
      </motion.div>
    </section>
  );
}
