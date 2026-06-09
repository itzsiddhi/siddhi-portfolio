import { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

interface Metric { label: string }
interface Tag { label: string; color: string }

interface Project {
  id: string;
  emoji: string;
  title: string;
  tags: Tag[];
  description: string;
  stack: string[];
  metrics?: Metric[];
  accentColor: string;
  role?: string;
  privateNote?: string;
  colSpan?: 'full' | 'double' | 'single';
}

const PROJECTS: Project[] = [
  {
    id: 'xhalee',
    emoji: '🌐',
    title: 'XHALEE',
    tags: [
      { label: 'FOUNDER', color: '#a78bfa' },
      { label: 'FULL STACK', color: '#60a5fa' },
      { label: 'ACTIVE', color: '#34d399' },
    ],
    description:
      'Founded and engineered Xhalee — an anonymous peer-matching ecosystem built for people navigating the same path. Absolute privacy at its core: no clinical judgment, no identifiers, no compromise. End-to-end full-stack architecture with state-driven React frontend wired into a scalable secure backend. This is where I push the modern stack to its limits.',
    role: 'Founder & Full Stack Engineer · Ongoing',
    stack: ['React', 'Supabase', 'FastAPI', 'PostgreSQL', 'Tailwind CSS'],
    accentColor: '#a78bfa',
    privateNote: 'PRIVATE BUILD',
    colSpan: 'full',
  },
  {
    id: 'intervise',
    emoji: '🎙️',
    title: 'INTERVISE.AI',
    tags: [
      { label: 'FULL STACK', color: '#60a5fa' },
      { label: 'AI/ML', color: '#f472b6' },
      { label: '2025', color: '#6b7280' },
    ],
    description:
      'AI-powered mock interview simulation platform. TypeScript + Vite frontend with Node.js backend APIs. Integrated LLaMA-based ML models to generate domain-specific assessment questions and evaluate responses in real time. Cut interview prep time by 40%.',
    stack: ['TypeScript', 'Vite', 'Node.js', 'LLaMA', 'REST APIs', 'Python'],
    metrics: [{ label: '100+ Sessions' }, { label: '40% faster prep' }, { label: 'Real-time feedback' }],
    accentColor: '#60a5fa',
    colSpan: 'double',
  },
  {
    id: 'armor',
    emoji: '🤖',
    title: 'ARMOR.AI',
    tags: [
      { label: 'TEAM LEAD', color: '#34d399' },
      { label: 'FULL STACK', color: '#60a5fa' },
      { label: 'AI', color: '#a78bfa' },
    ],
    description:
      'Real-time multilingual conversational financial platform. Groq Whisper for accent-perfect transcription including Hinglish. Llama 3.3 extracts EMIs, SIPs, financial commitments and auto-classifies into Supabase relational instances.',
    stack: ['React', 'FastAPI', 'Groq', 'Llama 3.3', 'Supabase', 'n8n'],
    accentColor: '#34d399',
    colSpan: 'single',
  },
  {
    id: 'mindjumper',
    emoji: '⚡',
    title: 'MINDJUMPER',
    tags: [
      { label: 'REACT', color: '#60a5fa' },
      { label: 'TYPESCRIPT', color: '#a78bfa' },
      { label: '2025', color: '#6b7280' },
    ],
    description:
      'Responsive interactive web platform with structured state-based navigation flows and clean UI transitions. Reduced page reloads by 40%. Validated rendering stability across 100+ simulated user sessions.',
    stack: ['React', 'TypeScript', 'State Management', 'CSS Transitions'],
    metrics: [{ label: '40% fewer reloads' }, { label: '100+ sessions' }],
    accentColor: '#f472b6',
    colSpan: 'single',
  },
  {
    id: 'recengine',
    emoji: '🧠',
    title: 'RECOMMENDATION ENGINE',
    tags: [
      { label: 'MACHINE LEARNING', color: '#f472b6' },
      { label: 'PYTHON', color: '#fbbf24' },
      { label: '2025', color: '#6b7280' },
    ],
    description:
      'User-based collaborative filtering system built in Python. Processed 5,000+ user-item interactions to generate personalized suggestions. Optimized similarity computation to improve recommendation relevance by 30%.',
    stack: ['Python', 'NumPy', 'Pandas', 'scikit-learn', 'Collaborative Filtering'],
    metrics: [{ label: '5,000+ interactions' }, { label: '30% relevance boost' }],
    accentColor: '#fbbf24',
    colSpan: 'single',
  },
  {
    id: 'ecommerce',
    emoji: '🛒',
    title: 'E-COMMERCE PLATFORM',
    tags: [
      { label: 'FULL STACK', color: '#60a5fa' },
      { label: 'REACT', color: '#a78bfa' },
      { label: '2025', color: '#6b7280' },
    ],
    description:
      'Full-stack shopping platform with secure authentication and cart management. Node.js REST APIs for 50+ products. Optimized checkout flow by 25%.',
    stack: ['React', 'Node.js', 'REST APIs', 'Authentication'],
    metrics: [{ label: '50+ products' }, { label: '25% checkout opt.' }],
    accentColor: '#60a5fa',
    colSpan: 'single',
  },
  {
    id: 'health',
    emoji: '📡',
    title: 'SMART HEALTH MONITOR',
    tags: [
      { label: 'EMBEDDED', color: '#34d399' },
      { label: 'IoT', color: '#60a5fa' },
      { label: 'BIOMEDICAL', color: '#f472b6' },
    ],
    description:
      'Real-time physiological tracking via hardware sensor cluster. Microcontrollers smooth data spikes and push vitals to dashboards with instant anomaly alerts.',
    stack: ['MCU', 'Sensor Fusion', 'Biomedical Telemetry'],
    accentColor: '#34d399',
    colSpan: 'single',
  },
  {
    id: 'classroom',
    emoji: '🏫',
    title: 'SMART CLASSROOM SYSTEM',
    tags: [
      { label: 'HARDWARE', color: '#fbbf24' },
      { label: 'IoT', color: '#60a5fa' },
    ],
    description:
      'Environmental automation node for classroom power optimization and asset tracking. Scales resource usage dynamically based on occupancy metrics.',
    stack: ['Environmental Sensors', 'Edge Logic', 'Resource Optimization'],
    accentColor: '#fbbf24',
    colSpan: 'single',
  },
];

// ── Ripple hook ─────────────────────────────────
function useRipple() {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const trigger = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples(prev => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 700);
  };

  return { ripples, trigger };
}

// ── TiltCard ────────────────────────────────────
function TiltCard({ project, children }: { project: Project; children?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5), my = useMotionValue(0.5);
  const rotX = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 250, damping: 30 });
  const rotY = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 250, damping: 30 });
  const pX = useSpring(useTransform(mx, [0, 1], [2, -2]), { stiffness: 250, damping: 30 });
  const pY = useSpring(useTransform(my, [0, 1], [2, -2]), { stiffness: 250, damping: 30 });
  const { ripples, trigger } = useRipple();

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const onLeave = () => { mx.set(0.5); my.set(0.5); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseDown={trigger}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.97, transition: { duration: 0.08, type: 'spring', stiffness: 400 } }}
      className="group relative h-full rounded-xl overflow-hidden cursor-pointer"
    >
      <div
        className="relative h-full rounded-xl flex flex-col gap-4 overflow-hidden transition-all duration-300"
        style={{
          background: '#0a0a12',
          border: `1px solid ${project.accentColor}20`,
          padding: project.colSpan === 'full' ? '1.75rem' : '1.5rem',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.borderColor = project.accentColor + '50';
          (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 48px ${project.accentColor}0e`;
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.borderColor = project.accentColor + '20';
          (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        }}
      >
        {/* Border flash on tap */}
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-active:opacity-100 pointer-events-none transition-opacity duration-150"
          style={{ border: `2px solid ${project.accentColor}99` }}
        />

        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 50% 0%, ${project.accentColor}0a 0%, transparent 65%)` }}
        />

        {/* Ripples */}
        {ripples.map(r => (
          <span
            key={r.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: r.x - 60, top: r.y - 60,
              width: 120, height: 120,
              background: `radial-gradient(circle, ${project.accentColor}30 0%, transparent 70%)`,
              animation: 'rippleOut 0.7s ease-out forwards',
            }}
          />
        ))}

        {/* Parallax inner */}
        <motion.div
          style={{ x: pX, y: pY }}
          className="relative z-10 flex flex-col h-full gap-3"
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
}

function CardContent({ p }: { p: Project }) {
  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span style={{ fontSize: p.colSpan === 'full' ? '1.6rem' : '1.4rem' }}>{p.emoji}</span>
          <h3
            className="font-grotesk font-bold leading-tight"
            style={{ fontSize: p.colSpan === 'full' ? '1.2rem' : '0.95rem', color: '#f0f0ff' }}
          >
            {p.title}
          </h3>
        </div>
        {p.privateNote && (
          <span className="font-mono text-[10px] tracking-widest text-text-secondary flex-shrink-0">
            {p.privateNote}
          </span>
        )}
      </div>

      {p.role && (
        <p className="font-mono text-[11px] text-text-secondary tracking-wide">{p.role}</p>
      )}

      <div className="flex flex-wrap gap-1.5">
        {p.tags.map(tag => (
          <span
            key={tag.label}
            className="font-mono text-[10px] tracking-wider px-2 py-0.5 rounded-full"
            style={{ color: tag.color, border: `1px solid ${tag.color}40`, background: `${tag.color}0d` }}
          >
            {tag.label}
          </span>
        ))}
      </div>

      <p className="font-inter text-sm leading-relaxed text-text-secondary flex-1">
        {p.description}
      </p>

      <div
        className="flex flex-wrap gap-1.5 pt-3 border-t"
        style={{ borderColor: 'rgba(26,26,46,0.7)' }}
      >
        {p.stack.map(s => (
          <span
            key={s}
            className="font-mono text-[10px] tracking-wide px-2 py-1 text-text-secondary"
            style={{ border: '1px solid rgba(26,26,46,0.9)', background: 'rgba(13,13,26,0.5)' }}
          >
            {s}
          </span>
        ))}
        {p.metrics?.map(m => (
          <span
            key={m.label}
            className="font-mono text-[10px] tracking-wide px-2.5 py-1"
            style={{
              color: '#34d399',
              border: '1px solid rgba(52,211,153,0.25)',
              background: 'rgba(52,211,153,0.06)',
            }}
          >
            {m.label}
          </span>
        ))}
      </div>
    </>
  );
}

export default function WorkSection() {
  const [xhalee, intervise, armor, mindjumper, recengine, ecommerce, health, classroom] = PROJECTS;

  return (
    <section id="work" className="relative py-28 px-6">
      {/* Ripple keyframe */}
      <style>{`
        @keyframes rippleOut {
          from { transform: scale(0); opacity: 1; }
          to { transform: scale(3); opacity: 0; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-xs tracking-[0.35em] text-text-secondary mb-3">03 — WORK</p>
          <h2 className="font-grotesk font-bold text-4xl md:text-5xl mb-3" style={{ color: '#f0f0ff' }}>
            <span className="holo-text">Operations</span>
          </h2>
          <p className="font-inter text-sm text-text-secondary">
            Things I've built, broken, and shipped.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {/* Row 0: Xhalee — full width */}
          <TiltCard project={xhalee}>
            <CardContent p={xhalee} />
          </TiltCard>

          {/* Row 1: Intervise (2-col) + Armor (1-col) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <TiltCard project={intervise}>
                <CardContent p={intervise} />
              </TiltCard>
            </div>
            <TiltCard project={armor}>
              <CardContent p={armor} />
            </TiltCard>
          </div>

          {/* Row 2: MindJumper + RecEngine + E-Commerce */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TiltCard project={mindjumper}><CardContent p={mindjumper} /></TiltCard>
            <TiltCard project={recengine}><CardContent p={recengine} /></TiltCard>
            <TiltCard project={ecommerce}><CardContent p={ecommerce} /></TiltCard>
          </div>

          {/* Row 3: Health + Classroom */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TiltCard project={health}><CardContent p={health} /></TiltCard>
            <TiltCard project={classroom}><CardContent p={classroom} /></TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
