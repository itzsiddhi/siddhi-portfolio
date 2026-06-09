import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  onComplete: () => void;
}

const BOOT_LINES = [
  { text: '> loading quantum_core.engine', status: 'OK', delay: 300 },
  { text: '> mounting research_stack.node', status: 'OK', delay: 600 },
  { text: '> syncing hardware_layer.bridge', status: 'OK', delay: 900 },
  { text: '> patent_pending.status', status: 'ACTIVE', delay: 1200 },
  { text: '> identity_matrix.exe', status: 'LOADED', delay: 1500 },
];

const INIT_TEXT = 'INITIALIZING SIDDHI.SYS';

export default function LoadingScreen({ onComplete }: Props) {
  const [typedTitle, setTypedTitle] = useState('');
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  // Octahedron canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = 120, H = 120;
    canvas.width = W;
    canvas.height = H;

    const vertices = [
      [0, -1, 0], [0, 1, 0],
      [1, 0, 0], [-1, 0, 0],
      [0, 0, 1], [0, 0, -1],
    ];
    const edges = [
      [0,2],[0,3],[0,4],[0,5],
      [1,2],[1,3],[1,4],[1,5],
      [2,4],[4,3],[3,5],[5,2],
    ];

    const holoColors = ['#a78bfa','#60a5fa','#34d399','#f472b6'];
    let t = 0;

    function project([x, y, z]: number[]) {
      const cosY = Math.cos(t), sinY = Math.sin(t);
      const cosX = Math.cos(t * 0.4), sinX = Math.sin(t * 0.4);
      const rx = x * cosY - z * sinY;
      const rz = x * sinY + z * cosY;
      const ry = y * cosX - rz * sinX;
      const rz2 = y * sinX + rz * cosX;
      const scale = 42 / (3 + rz2);
      return [W / 2 + rx * scale, H / 2 + ry * scale];
    }

    function drawFrame() {
      t += 0.012;
      ctx.clearRect(0, 0, W, H);

      const colorIdx = Math.floor(((t * 0.3) % 1) * holoColors.length);
      const nextIdx = (colorIdx + 1) % holoColors.length;
      const blend = ((t * 0.3) % 1) * holoColors.length - colorIdx;

      edges.forEach(([a, b], i) => {
        const [x1, y1] = project(vertices[a]);
        const [x2, y2] = project(vertices[b]);
        const grad = ctx.createLinearGradient(x1, y1, x2, y2);
        grad.addColorStop(0, holoColors[(colorIdx + i) % holoColors.length] + 'cc');
        grad.addColorStop(1, holoColors[(nextIdx + i) % holoColors.length] + 'cc');
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      vertices.forEach(v => {
        const [px, py] = project(v);
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = holoColors[colorIdx];
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(drawFrame);
    }

    drawFrame();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  // Title typewriter
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= INIT_TEXT.length) {
        setTypedTitle(INIT_TEXT.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 55);
    return () => clearInterval(interval);
  }, []);

  // Boot lines + progress
  useEffect(() => {
    BOOT_LINES.forEach(({ delay }, idx) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, idx]);
        setProgress(((idx + 1) / BOOT_LINES.length) * 100);
      }, delay);
    });

    setTimeout(() => {
      setExiting(true);
      setTimeout(onComplete, 600);
    }, 2400);
  }, [onComplete]);

  const statusColor = (s: string) => {
    if (s === 'OK') return 'text-holo-teal';
    if (s === 'ACTIVE') return 'text-holo-violet';
    return 'text-holo-blue';
  };

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-space-black"
    >
      {/* Subtle radial */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(96,165,250,0.15) 0%, transparent 70%)',
        }}
      />

      <div className="relative flex flex-col items-center gap-8 px-8 max-w-lg w-full">
        {/* Animated octahedron */}
        <canvas ref={canvasRef} className="w-[120px] h-[120px]" />

        {/* Title */}
        <div className="text-center">
          <p className="font-mono text-sm tracking-[0.3em] text-text-secondary mb-1">
            {typedTitle}
            <span className="animate-pulse">_</span>
          </p>
        </div>

        {/* Boot lines */}
        <div className="w-full space-y-1.5">
          {BOOT_LINES.map(({ text, status }, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={visibleLines.includes(idx) ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between font-mono text-xs"
            >
              <span className="text-text-secondary">{text}</span>
              <span className="flex items-center gap-2 text-text-secondary">
                <span className="text-[#1a1a2e]">{'.'}</span>
                <span className="w-32 text-right tracking-widest opacity-40">{'· · · · · · · ·'}</span>
                <span className={`${statusColor(status)} tracking-widest ml-2`}>{status}</span>
              </span>
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-full">
          <div className="h-px bg-space-border overflow-hidden rounded-full">
            <motion.div
              className="h-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{
                background: 'linear-gradient(90deg, #a78bfa, #60a5fa, #34d399, #f472b6)',
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
