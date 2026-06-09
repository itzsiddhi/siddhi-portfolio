import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import photo from '..assets/IMG-20241223-WA0038.jpg';

const PHOTOS = [photo];

const PILL_TAGS = [
  'B.Tech · M S Ramaiah · 2027',
  'Founder · Xhalee',
];

// ── Stat block ──────────────────────────────────
interface StatProps { value: string | number; label: string; delay: number; suffix?: string; }

function StatBlock({ value, label, delay, suffix = '' }: StatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayed, setDisplayed] = useState(0);
  const numVal = typeof value === 'number' ? value : null;
  const isFloat = numVal !== null && !Number.isInteger(numVal);

  useEffect(() => {
    if (!isInView || numVal === null) return;
    let start = 0;
    const step = numVal / (1200 / 16);
    const id = setInterval(() => {
      start = Math.min(start + step, numVal);
      setDisplayed(isFloat ? Math.round(start * 10) / 10 : Math.round(start));
      if (start >= numVal) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [isInView, numVal, isFloat]);

  const display = numVal !== null
    ? (isInView ? (isFloat ? displayed.toFixed(1) : displayed) : 0) + suffix
    : value;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <p className="font-grotesk font-bold leading-none mb-1.5 holo-text"
        style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)' }}>
        {display}
      </p>
      <p className="font-mono text-[10px] tracking-[0.18em] text-text-secondary uppercase leading-snug">{label}</p>
    </motion.div>
  );
}

// ── Photo Carousel ───────────────────────────────
function PhotoCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent(prev => (prev + 1) % PHOTOS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 30 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -30 }),
  };

  return (
    <div className="relative w-full flex flex-col items-center gap-4">
      {/* Image frame */}
      <div
        className="relative w-full overflow-hidden rounded-xl"
        style={{
          aspectRatio: '3/4',
          maxHeight: '520px',
          background: '#0a0a12',
        }}
      >
        {/* Holographic border wrapper */}
        <div
          className="absolute inset-0 rounded-xl -z-10"
          style={{
            background: 'linear-gradient(135deg, #a78bfa, #60a5fa, #34d399, #f472b6, #a78bfa)',
            backgroundSize: '300% 300%',
            animation: 'holoBorder 6s linear infinite',
            padding: '1.5px',
          }}
        />
        <div
          className="absolute inset-[1.5px] rounded-xl overflow-hidden"
          style={{ background: '#0a0a12' }}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.img
              key={current}
              src={PHOTOS[current]}
              alt={`Siddhi Tiwari ${current + 1}`}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full object-cover object-center"
              style={{ objectPosition: 'center 15%' }}
              draggable={false}
            />
          </AnimatePresence>

          {/* Breathing glow overlay */}
          <div
            className="absolute inset-0 pointer-events-none animate-pulse-glow"
            style={{
              background: 'radial-gradient(ellipse at 50% 100%, rgba(167,139,250,0.12) 0%, transparent 70%)',
            }}
          />
        </div>

        {/* Prev/Next arrows — visible on hover */}
        <button
          onClick={() => goTo((current - 1 + PHOTOS.length) % PHOTOS.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 group-hover:opacity-60 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 z-10"
          style={{ background: 'rgba(0,0,8,0.7)', border: '1px solid rgba(167,139,250,0.3)' }}
          aria-label="Previous"
        >
          <span style={{ color: '#a78bfa', fontSize: '14px' }}>‹</span>
        </button>
        <button
          onClick={() => goTo((current + 1) % PHOTOS.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 group-hover:opacity-60 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 z-10"
          style={{ background: 'rgba(0,0,8,0.7)', border: '1px solid rgba(167,139,250,0.3)' }}
          aria-label="Next"
        >
          <span style={{ color: '#a78bfa', fontSize: '14px' }}>›</span>
        </button>
      </div>

      {/* Dots */}
      <div className="flex items-center gap-2">
        {PHOTOS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="rounded-full transition-all duration-300 flex-shrink-0"
            style={{
              width: i === current ? '8px' : '6px',
              height: i === current ? '8px' : '6px',
              background: i === current
                ? 'linear-gradient(135deg, #a78bfa, #60a5fa)'
                : 'rgba(107,114,128,0.5)',
              boxShadow: i === current ? '0 0 8px rgba(167,139,250,0.6)' : 'none',
            }}
            aria-label={`Photo ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function AboutSection() {
  return (
    <section id="about" className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <p className="font-mono text-xs tracking-[0.35em] text-text-secondary mb-3">01 — ABOUT</p>
          <h2 className="font-grotesk font-bold text-4xl md:text-5xl" style={{ color: '#f0f0ff' }}>
            The <span className="holo-text">Engineer</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* LEFT — Photo carousel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="group"
          >
            <PhotoCarousel />
          </motion.div>

          {/* RIGHT — Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-8"
          >
            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 pb-8 border-b"
              style={{ borderColor: 'rgba(26,26,46,0.8)' }}
            >
              <StatBlock value={8} label="Projects Shipped" delay={0} />
              <StatBlock value={1} label="Founder · Xhalee" delay={0.08} suffix="" />
              <StatBlock value={8.3} label="GPA · B.Tech EEE" delay={0.16} />
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={itemVariants}
              className="font-inter text-base leading-relaxed"
              style={{ color: '#9ca3af', lineHeight: '1.85' }}
            >
              I'm Siddhi — an engineer who refuses to stay in one lane. I build full-stack
              platforms, train ML models, design hardware security systems, and publish
              academic research. Currently pursuing B.Tech in Electrical & Electronics at{' '}
              <span style={{ color: '#f0f0ff' }}>M S Ramaiah University, Bengaluru</span>,
              while founding Xhalee and shipping real products.{' '}
              <span style={{ color: '#f0f0ff' }}>
                My work lives at the intersection of software that scales and hardware that holds.
              </span>
            </motion.p>

            {/* Status pills */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2.5">
              {PILL_TAGS.map(tag => (
                <span
                  key={tag}
                  className="font-mono text-xs tracking-wide px-4 py-2 rounded-full transition-all duration-200 hover:brightness-125"
                  style={{
                    border: '1px solid rgba(167,139,250,0.35)',
                    background: 'rgba(167,139,250,0.06)',
                    color: '#f0f0ff',
                  }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Experience callout */}
            <motion.div
              variants={itemVariants}
              className="rounded-xl p-5 flex flex-col gap-3"
              style={{
                background: '#0a0a12',
                border: '1px solid rgba(96,165,250,0.2)',
              }}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">💼</span>
                <div>
                  <p className="font-grotesk font-semibold text-sm" style={{ color: '#f0f0ff' }}>
                    VaultofCodes — Web Development Intern
                  </p>
                  <p className="font-mono text-[11px] text-text-secondary tracking-wide">
                    Aug – Sep 2025
                  </p>
                </div>
              </div>
              <p className="font-inter text-sm leading-relaxed text-text-secondary">
                Built 3+ feature pages, created reusable UI components, reduced redundant code by 20%.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {['HTML', 'CSS', 'JavaScript', 'Cross-browser'].map(t => (
                  <span
                    key={t}
                    className="font-mono text-[10px] px-2.5 py-1 rounded"
                    style={{
                      color: '#60a5fa',
                      border: '1px solid rgba(96,165,250,0.25)',
                      background: 'rgba(96,165,250,0.05)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
