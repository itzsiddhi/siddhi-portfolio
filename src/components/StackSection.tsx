import { motion } from 'framer-motion';

interface Cluster {
  id: string;
  icon: string;
  name: string;
  description: string;
  skills: string[];
  color: string;
  bg: string;
}

const CLUSTERS: Cluster[] = [
  {
    id: 'software',
    icon: '⬡',
    name: 'Software & Fullstack',
    description: 'End-to-end product development — from database to UI.',
    skills: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'FastAPI', 'Node.js', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'REST APIs', 'Vite', 'HTML5', 'CSS3'],
    color: '#a78bfa',
    bg: 'rgba(167,139,250,0.06)',
  },
  {
    id: 'embedded',
    icon: '◈',
    name: 'Embedded & IoT',
    description: 'Hardware-level engineering where software meets silicon.',
    skills: ['Edge Computing', 'Sensor Fusion (IR/PIR/Bio)', 'Real-time MCUs', 'FSM Architecture', 'Microcontrollers', 'Hardware Security Systems'],
    color: '#34d399',
    bg: 'rgba(52,211,153,0.06)',
  },
  {
    id: 'ai',
    icon: '◎',
    name: 'AI & Machine Learning',
    description: 'Intelligent systems grounded in rigorous mathematical foundations.',
    skills: ['Llama 3.3', 'Groq Whisper', 'Local Differential Privacy', 'Collaborative Filtering', 'Supervised Learning', 'scikit-learn', 'NumPy', 'Pandas', 'Prompt Engineering', 'Model Evaluation', 'Network Theory', 'n8n'],
    color: '#f472b6',
    bg: 'rgba(244,114,182,0.06)',
  },
  {
    id: 'electrical',
    icon: '⌀',
    name: 'Electrical & Electronics',
    description: 'Core electrical design across machines, systems, and digital logic.',
    skills: ['AC/DC Machines', 'Transformers', 'Network Theory', 'Control Systems', 'Power Electronics', 'Signal Processing', 'Digital Electronics', 'Analog Circuits', 'Electromagnetic Theory', 'Measurement & Instrumentation', 'Power Systems', 'Circuit Analysis', 'Semiconductor Devices', 'VLSI Fundamentals', 'Verilog', 'FPGA', 'CMOS Design', 'Communication Systems'],
    color: '#fbbf24',
    bg: 'rgba(251,191,36,0.06)',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function StackSection() {
  return (
    <section id="stack" className="relative py-28 px-6" style={{ background: '#0a0a12' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="font-mono text-xs tracking-[0.35em] text-text-secondary mb-3">02 — STACK</p>
          <h2 className="font-grotesk font-bold text-4xl md:text-5xl mb-4" style={{ color: '#f0f0ff' }}>
            Core <span className="holo-text">Matrix</span>
          </h2>
          <p className="font-inter text-sm text-text-secondary max-w-md mx-auto">
            Four domains of competency. Each one production-grade.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {CLUSTERS.map(cluster => (
            <motion.div
              key={cluster.id}
              variants={cardVariants}
              className="group relative rounded-xl cursor-pointer select-none"
              style={{ isolation: 'isolate' }}
              whileTap={{ scale: 0.97, transition: { duration: 0.08 } }}
              whileHover={{ y: -3 }}
            >
              {/* Card inner */}
              <div
                className="relative h-full rounded-xl p-7 flex flex-col gap-5 transition-all duration-300"
                style={{
                  background: '#0d0d1a',
                  border: `1px solid ${cluster.color}22`,
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = cluster.color + '66';
                  el.style.boxShadow = `0 12px 40px ${cluster.color}10`;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = cluster.color + '22';
                  el.style.boxShadow = 'none';
                }}
              >
                {/* Top gradient sweep on hover */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${cluster.color}0c 0%, transparent 65%)` }}
                />

                {/* Header */}
                <div className="relative flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-base font-bold flex-shrink-0"
                    style={{ background: cluster.bg, border: `1px solid ${cluster.color}33`, color: cluster.color }}
                  >
                    {cluster.icon}
                  </div>
                  <div>
                    <h3 className="font-grotesk font-bold text-lg leading-tight" style={{ color: '#f0f0ff' }}>
                      {cluster.name}
                    </h3>
                    <p className="font-inter text-xs text-text-secondary mt-0.5 leading-relaxed">
                      {cluster.description}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div
                  className="relative h-px transition-all duration-300"
                  style={{ background: `linear-gradient(90deg, ${cluster.color}33, transparent)` }}
                />

                {/* Skills */}
                <div className="relative flex flex-wrap gap-2">
                  {cluster.skills.map(skill => (
                    <span
                      key={skill}
                      className="font-mono text-xs px-3 py-1.5 rounded-md transition-all duration-200 group-hover:brightness-110"
                      style={{
                        color: '#f0f0ff',
                        background: cluster.bg,
                        border: `1px solid ${cluster.color}28`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
