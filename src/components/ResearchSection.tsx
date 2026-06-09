import { motion } from 'framer-motion';

const FORMULAS = [
  'Pr[M(x) ∈ S] ≤ eᵉ · Pr[M(x\') ∈ S]',
  'P(report = 1 | x = 1) = eᵉ / (eᵉ + 1)',
  'ε-Local Differential Privacy',
  'f(x) = (e^εx) / (e^ε + 1)',
  '∇ · B = 0',
  'σ² = E[(X-μ)²]',
  'H(X) = -Σ p(x) log p(x)',
  'θ_e = θ_m × (P/2)',
];

export default function ResearchSection() {
  return (
    <section id="research" className="relative py-32 px-6 bg-space-deep overflow-hidden">
      {/* Drifting formula background */}
      {FORMULAS.map((f, i) => (
        <div
          key={i}
          className="formula-drift animate-drift"
          style={{
            top: `${8 + (i * 11) % 85}%`,
            left: `${(i * 13 + 5) % 90}%`,
            animationDelay: `${i * -2.5}s`,
            animationDuration: `${18 + i * 2.5}s`,
            fontSize: i % 3 === 0 ? '0.9rem' : '0.65rem',
          }}
        >
          {f}
        </div>
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="font-mono text-xs tracking-[0.35em] text-text-secondary mb-3">04 — RESEARCH</p>
          <h2 className="font-grotesk font-bold text-4xl md:text-5xl text-text-primary">
            <span className="holo-text">Intel</span>
          </h2>
        </motion.div>

        {/* Featured research — classified document frame */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative holo-border rounded-xl mb-8"
          style={{ borderRadius: '0.75rem' }}
        >
          <div
            className="rounded-xl overflow-hidden"
            style={{ background: '#0a0a12', border: '1px solid rgba(26,26,46,0.8)' }}
          >
            {/* Document header */}
            <div
              className="flex items-center justify-between px-6 py-4 border-b"
              style={{ borderColor: 'rgba(26,26,46,0.8)' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="font-mono text-xs tracking-[0.3em] px-3 py-1 rounded-sm"
                  style={{
                    border: '1px solid rgba(52,211,153,0.5)',
                    color: '#34d399',
                    background: 'rgba(52,211,153,0.06)',
                  }}
                >
                  PREPRINT
                </div>
                <span className="font-mono text-xs text-text-secondary">DOC-LDP-2024-001</span>
              </div>
              <span className="font-mono text-xs text-text-secondary">PRIMARY AUTHOR</span>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              <div className="flex items-start gap-4 mb-6">
                <span className="text-3xl">📄</span>
                <div>
                  <h3 className="font-grotesk font-bold text-xl md:text-2xl text-text-primary mb-1">
                    Local Differential Privacy Optimization
                  </h3>
                  <p className="font-mono text-xs text-text-secondary tracking-wide">
                    Mathematical Cryptography · Statistical Privacy
                  </p>
                </div>
              </div>

              <p className="font-inter text-base leading-relaxed text-text-secondary mb-8 max-w-3xl">
                Formulated and published research on optimizing LDP protocols to safeguard user
                telemetry data before central storage. Investigated randomized response mechanisms
                and perturbation algorithms for the privacy-utility tradeoff in downstream analytics.
              </p>

              {/* Formulas */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                  { eq: 'Pr[M(x) ∈ S] ≤ eᵉ · Pr[M(x\') ∈ S]', label: 'ε-LDP Constraint' },
                  { eq: 'P(1 | x=1) = eᵉ / (eᵉ + 1)', label: 'Randomized Response Mechanism' },
                ].map(f => (
                  <div
                    key={f.label}
                    className="rounded-lg p-4"
                    style={{
                      background: 'rgba(167,139,250,0.04)',
                      borderLeft: '2px solid rgba(167,139,250,0.5)',
                    }}
                  >
                    <p className="font-mono text-sm text-holo-violet mb-1">{f.eq}</p>
                    <p className="font-mono text-xs text-text-secondary">{f.label}</p>
                  </div>
                ))}
              </div>

              {/* Tags + ORCID */}
              <div className="flex flex-wrap items-center gap-3">
                {['LDP', 'Randomized Response', 'Perturbation Algorithms', 'Preprint'].map(tag => (
                  <span
                    key={tag}
                    className="font-mono text-xs tracking-wide px-3 py-1 rounded-full"
                    style={{
                      border: '1px solid rgba(167,139,250,0.3)',
                      color: '#a78bfa',
                      background: 'rgba(167,139,250,0.06)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
                <a
                  href="https://orcid.org/0009-0005-4113-7542"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1.5 font-mono text-xs text-text-secondary hover:text-text-primary transition-colors ml-auto"
                >
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                    style={{ background: '#A6CE39', color: '#fff' }}
                  >
                    iD
                  </div>
                  <span className="group-hover:underline">ORCID →</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stat panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="rounded-xl p-6 flex gap-6 items-start"
          style={{ background: '#0a0a12', border: '1px solid rgba(52,211,153,0.22)' }}
        >
          <div className="font-grotesk font-bold text-5xl leading-none" style={{ color: '#34d399' }}>1</div>
          <div>
            <p className="font-grotesk font-semibold text-text-primary mb-1">Publication</p>
            <p className="font-inter text-sm text-text-secondary leading-relaxed">
              Preprint published. Local Differential Privacy optimization research.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
