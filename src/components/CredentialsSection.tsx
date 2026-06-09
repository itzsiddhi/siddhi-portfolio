import { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

interface Cert {
  icon: string;
  title: string;
  issuer: string;
  detail: string;
  credId?: string;
  color: string;
}

const CERTS: Cert[] = [
  {
    icon: '🎓',
    title: 'Machine Learning with Python',
    issuer: 'MITx 6.86x · edX',
    detail: 'Sep 2025 · 40+ hours',
    credId: '7e34565bcefd447887b868cc58cfe844',
    color: '#a78bfa',
  },
  {
    icon: '⚙️',
    title: 'CMOS Digital VLSI Design',
    issuer: 'IIT Roorkee · NPTEL',
    detail: '12-week program',
    color: '#34d399',
  },
  {
    icon: '🔌',
    title: 'Digital Design with Verilog',
    issuer: 'IIT Guwahati · NPTEL',
    detail: '10+ hands-on labs',
    color: '#fbbf24',
  },
  {
    icon: '🖥️',
    title: 'FPGA Design Training',
    issuer: 'M.S. Ramaiah University',
    detail: 'Faculty Development Program',
    color: '#f472b6',
  },
];

function CertCard({ cert }: { cert: Cert }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5), my = useMotionValue(0.5);
  const rotX = useSpring(useTransform(my, [0, 1], [5, -5]), { stiffness: 250, damping: 30 });
  const rotY = useSpring(useTransform(mx, [0, 1], [-5, 5]), { stiffness: 250, damping: 30 });

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
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d', width: 'clamp(260px, 30vw, 320px)' }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.97, transition: { duration: 0.08 } }}
      className="group cursor-pointer flex-shrink-0"
    >
      <div
        className="relative rounded-xl p-6 flex flex-col gap-4 transition-all duration-300"
        style={{
          background: '#0a0a12',
          border: `1px solid ${cert.color}22`,
          height: '100%',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = cert.color + '66';
          el.style.boxShadow = `0 12px 40px ${cert.color}12`;
          el.style.transform = 'translateY(-4px)';
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = cert.color + '22';
          el.style.boxShadow = 'none';
          el.style.transform = 'translateY(0)';
        }}
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 50% 0%, ${cert.color}0c 0%, transparent 65%)` }}
        />

        {/* Top bar */}
        <div
          className="absolute top-0 left-6 right-6 h-px transition-all duration-300"
          style={{ background: `linear-gradient(90deg, transparent, ${cert.color}88, transparent)` }}
        />

        <div className="flex items-start gap-3 relative">
          <span className="text-2xl flex-shrink-0">{cert.icon}</span>
          <div>
            <h3 className="font-grotesk font-bold text-sm leading-snug mb-1" style={{ color: '#f0f0ff' }}>
              {cert.title}
            </h3>
            <p className="font-mono text-xs" style={{ color: cert.color }}>
              {cert.issuer}
            </p>
          </div>
        </div>

        <div className="relative space-y-1.5">
          <p className="font-mono text-xs text-text-secondary">{cert.detail}</p>
          {cert.credId && (
            <p className="font-mono text-[10px] text-text-secondary opacity-60 break-all">
              ID: {cert.credId}
            </p>
          )}
        </div>

        {/* Accent pill */}
        <div className="mt-auto">
          <span
            className="inline-block font-mono text-[10px] tracking-widest px-2.5 py-1 rounded-full"
            style={{ color: cert.color, border: `1px solid ${cert.color}35`, background: `${cert.color}0a` }}
          >
            VERIFIED
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function CredentialsSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section id="credentials" className="relative py-28 px-6 overflow-hidden" style={{ background: '#0a0a12' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="font-mono text-xs tracking-[0.35em] text-text-secondary mb-3">05 — CREDENTIALS</p>
          <h2 className="font-grotesk font-bold text-4xl md:text-5xl mb-3" style={{ color: '#f0f0ff' }}>
            <span className="holo-text">Credentials</span>
          </h2>
          <p className="font-inter text-sm text-text-secondary max-w-md">
            Certifications from institutions that don't hand these out easily.
          </p>
        </motion.div>

        {/* Horizontal scroll on desktop, stacked on mobile */}
        <div
          ref={trackRef}
          className="flex flex-col sm:flex-row gap-4 sm:overflow-x-auto sm:pb-4"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(167,139,250,0.3) transparent',
          }}
        >
          {CERTS.map(cert => (
            <CertCard key={cert.title} cert={cert} />
          ))}
        </div>

        {/* Scroll hint on desktop */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="hidden sm:block font-mono text-[11px] text-text-secondary mt-4 text-center"
        >
          ← scroll to explore →
        </motion.p>
      </div>
    </section>
  );
}
