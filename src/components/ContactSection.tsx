import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';

const SOCIALS = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/siddhi-tiwari-moi',
    sub: 'linkedin.com/in/siddhi-tiwari-moi',
    color: '#60a5fa',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/itzsiddhi',
    sub: 'github.com/itzsiddhi',
    color: '#a78bfa',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    label: 'ORCID',
    href: 'https://orcid.org/0009-0005-4113-7542',
    sub: 'orcid.org/0009-0005-4113-7542',
    color: '#34d399',
    icon: (
      <svg width="18" height="18" viewBox="0 0 256 256" fill="currentColor">
        <path d="M128 0C57.3 0 0 57.3 0 128s57.3 128 128 128 128-57.3 128-128S198.7 0 128 0zm-17.3 99.2h-12.8V84.5h12.8v14.7zm0 75.3h-12.8v-63.8h12.8v63.8zm42.7-63.8c-18.3 0-26.5 14-26.5 32.1 0 18.3 8.4 32.1 26.5 32.1 18.1 0 26.3-13.8 26.3-32.1 0-18.1-8.2-32.1-26.3-32.1zm0 51.8c-9.6 0-13.7-9.4-13.7-19.7 0-10.2 4.1-19.7 13.7-19.7 9.5 0 13.5 9.5 13.5 19.7 0 10.3-4 19.7-13.5 19.7z" />
      </svg>
    ),
  },
];

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Work', href: '#work' },
  { label: 'Research', href: '#research' },
  { label: 'Credentials', href: '#credentials' },
];

interface Toast {
  id: number;
  type: 'success' | 'error';
  message: string;
}

function ToastNotification({ toast, onRemove }: { toast: Toast; onRemove: () => void }) {
  useEffect(() => {
    const t = setTimeout(onRemove, 4000);
    return () => clearTimeout(t);
  }, [onRemove]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 60, y: 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 60 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-start gap-3 px-5 py-4 rounded-xl max-w-xs w-full"
      style={{
        background: '#0d0d1a',
        border: `1px solid ${toast.type === 'success' ? 'rgba(52,211,153,0.4)' : 'rgba(255,107,107,0.4)'}`,
        boxShadow: `0 8px 32px ${toast.type === 'success' ? 'rgba(52,211,153,0.12)' : 'rgba(255,107,107,0.12)'}`,
        backdropFilter: 'blur(12px)',
      }}
    >
      <span style={{ fontSize: '14px', marginTop: '1px' }}>
        {toast.type === 'success' ? '✓' : '✗'}
      </span>
      <p
        className="font-mono text-xs leading-relaxed"
        style={{ color: toast.type === 'success' ? '#34d399' : '#ff6b6b' }}
      >
        {toast.message}
      </p>
    </motion.div>
  );
}

export default function ContactSection() {
  const [state, handleSubmit] = useForm('mojzweez');
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [succeeded, setSucceeded] = useState(false);

  useEffect(() => {
    if (state.succeeded) {
      setSucceeded(true);
      addToast('success', 'MESSAGE SENT — I will respond within 48 hours.');
      const t = setTimeout(() => setSucceeded(false), 5000);
      return () => clearTimeout(t);
    }
  }, [state.succeeded]);

  useEffect(() => {
    if (state.errors && Object.keys(state.errors).length > 0) {
      addToast('error', 'Transmission failed. Try LinkedIn instead.');
    }
  }, [state.errors]);

  const addToast = (type: 'success' | 'error', message: string) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, message }]);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <footer id="contact" style={{ background: '#000008' }}>
      {/* Toast container */}
      <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => (
            <div key={toast.id} className="pointer-events-auto">
              <ToastNotification toast={toast} onRemove={() => removeToast(toast.id)} />
            </div>
          ))}
        </AnimatePresence>
      </div>

      {/* Aurora separator */}
      <div
        className="h-px w-full"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #a78bfa44 20%, #60a5fa88 40%, #34d39966 60%, #f472b644 80%, transparent 100%)',
          boxShadow: '0 0 20px rgba(96, 165, 250, 0.15)',
        }}
      />

      {/* Main contact block */}
      <section className="px-6 py-24">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="font-mono text-xs tracking-[0.35em] text-text-secondary mb-4">06 — CONTACT</p>
            <h2
              className="font-grotesk font-bold leading-tight mb-5"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', color: '#f0f0ff' }}
            >
              Let's build something
              <br />
              <span className="holo-text">that doesn't exist yet.</span>
            </h2>
            <p className="font-inter text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
              Open to research collaborations, technical projects, and conversations about systems that live at the hardware-software boundary.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
            {/* LEFT: form */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-3"
            >
              <AnimatePresence mode="wait">
                {succeeded ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center justify-center gap-4 py-16 rounded-xl text-center"
                    style={{
                      background: '#0a0a12',
                      border: '1px solid rgba(52,211,153,0.3)',
                      minHeight: '360px',
                    }}
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                      style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.4)' }}
                    >
                      ✓
                    </div>
                    <p className="font-grotesk font-bold text-xl" style={{ color: '#34d399' }}>
                      MESSAGE SENT
                    </p>
                    <p className="font-mono text-xs text-text-secondary max-w-xs">
                      Transmission received. Expect a response within 48 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                  >
                    {/* Name + Email row */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[11px] tracking-[0.15em] text-text-secondary">NAME *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="Your name"
                          className="rounded-lg px-4 py-3 font-mono text-sm outline-none transition-all duration-200"
                          style={{
                            background: '#0a0a12',
                            border: '1px solid rgba(26,26,46,0.9)',
                            color: '#f0f0ff',
                          }}
                          onFocus={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(167,139,250,0.5)'; }}
                          onBlur={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(26,26,46,0.9)'; }}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[11px] tracking-[0.15em] text-text-secondary">EMAIL *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="your@email.com"
                          className="rounded-lg px-4 py-3 font-mono text-sm outline-none transition-all duration-200"
                          style={{
                            background: '#0a0a12',
                            border: '1px solid rgba(26,26,46,0.9)',
                            color: '#f0f0ff',
                          }}
                          onFocus={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(167,139,250,0.5)'; }}
                          onBlur={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(26,26,46,0.9)'; }}
                        />
                        <ValidationError
                          prefix="Email"
                          field="email"
                          errors={state.errors}
                          style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#ff6b6b' }}
                        />
                      </div>
                    </div>

                    {/* Purpose dropdown */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[11px] tracking-[0.15em] text-text-secondary">PURPOSE *</label>
                      <select
                        name="purpose"
                        required
                        defaultValue=""
                        className="rounded-lg px-4 py-3 font-mono text-sm outline-none transition-all duration-200 appearance-none"
                        style={{
                          background: '#0a0a12',
                          border: '1px solid rgba(26,26,46,0.9)',
                          color: '#f0f0ff',
                        }}
                        onFocus={e => { (e.target as HTMLSelectElement).style.borderColor = 'rgba(167,139,250,0.5)'; }}
                        onBlur={e => { (e.target as HTMLSelectElement).style.borderColor = 'rgba(26,26,46,0.9)'; }}
                      >
                        <option value="" disabled style={{ color: '#6b7280' }}>Select purpose</option>
                        <option value="collaboration">Research Collaboration</option>
                        <option value="project">Technical Project</option>
                        <option value="internship">Internship / Work</option>
                        <option value="consulting">Consulting</option>
                        <option value="general">General Inquiry</option>
                      </select>
                    </div>

                    {/* Source dropdown */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[11px] tracking-[0.15em] text-text-secondary">HOW DID YOU FIND ME?</label>
                      <select
                        name="source"
                        defaultValue=""
                        className="rounded-lg px-4 py-3 font-mono text-sm outline-none transition-all duration-200 appearance-none"
                        style={{
                          background: '#0a0a12',
                          border: '1px solid rgba(26,26,46,0.9)',
                          color: '#f0f0ff',
                        }}
                        onFocus={e => { (e.target as HTMLSelectElement).style.borderColor = 'rgba(167,139,250,0.5)'; }}
                        onBlur={e => { (e.target as HTMLSelectElement).style.borderColor = 'rgba(26,26,46,0.9)'; }}
                      >
                        <option value="" style={{ color: '#6b7280' }}>Select source (optional)</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="github">GitHub</option>
                        <option value="google">Google Search</option>
                        <option value="referral">Referral</option>
                        <option value="orcid">ORCID / Academia</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[11px] tracking-[0.15em] text-text-secondary">MESSAGE *</label>
                      <textarea
                        name="message"
                        required
                        minLength={10}
                        rows={5}
                        placeholder="What are you working on? How can I help?"
                        className="rounded-lg px-4 py-3 font-mono text-sm outline-none transition-all duration-200 resize-none"
                        style={{
                          background: '#0a0a12',
                          border: '1px solid rgba(26,26,46,0.9)',
                          color: '#f0f0ff',
                        }}
                        onFocus={e => { (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(167,139,250,0.5)'; }}
                        onBlur={e => { (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(26,26,46,0.9)'; }}
                      />
                      <ValidationError
                        prefix="Message"
                        field="message"
                        errors={state.errors}
                        style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#ff6b6b' }}
                      />
                    </div>

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={state.submitting}
                      className="relative overflow-hidden rounded-lg px-8 py-3.5 font-mono text-xs tracking-[0.25em] font-semibold transition-all duration-300 mt-1"
                      style={{
                        background: state.submitting
                          ? 'rgba(167,139,250,0.1)'
                          : 'linear-gradient(135deg, rgba(167,139,250,0.15) 0%, rgba(96,165,250,0.15) 50%, rgba(52,211,153,0.1) 100%)',
                        border: '1px solid rgba(167,139,250,0.4)',
                        color: state.submitting ? '#6b7280' : '#f0f0ff',
                        cursor: state.submitting ? 'not-allowed' : 'pointer',
                      }}
                      onMouseEnter={e => {
                        if (!state.submitting) {
                          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(167,139,250,0.8)';
                          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 32px rgba(167,139,250,0.15)';
                        }
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(167,139,250,0.4)';
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
                      }}
                    >
                      {/* Shimmer sweep */}
                      {!state.submitting && (
                        <span
                          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background: 'linear-gradient(90deg, transparent 0%, rgba(167,139,250,0.15) 50%, transparent 100%)',
                          }}
                        />
                      )}
                      <span className="relative">
                        {state.submitting ? 'TRANSMITTING...' : 'TRANSMIT →'}
                      </span>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* RIGHT: socials + location */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-2 flex flex-col gap-4"
            >
              <p className="font-mono text-[11px] tracking-[0.2em] text-text-secondary mb-2">OR REACH ME DIRECTLY</p>

              {SOCIALS.map(({ label, href, sub, color, icon }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group relative flex items-center gap-4 px-5 py-4 rounded-xl overflow-hidden transition-all duration-300"
                  style={{
                    background: '#0a0a12',
                    border: `1px solid ${color}22`,
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = color + '55';
                    el.style.transform = 'translateX(4px)';
                    el.style.boxShadow = `0 8px 24px ${color}0e`;
                    el.style.background = color + '08';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = color + '22';
                    el.style.transform = 'translateX(0)';
                    el.style.boxShadow = 'none';
                    el.style.background = '#0a0a12';
                  }}
                >
                  {/* Shimmer */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `linear-gradient(135deg, ${color}06 0%, ${color}10 100%)` }}
                  />

                  <span
                    className="relative flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
                    style={{ background: `${color}12`, border: `1px solid ${color}28`, color }}
                  >
                    {icon}
                  </span>

                  <div className="relative flex flex-col gap-0.5 min-w-0">
                    <span className="font-grotesk font-semibold text-sm" style={{ color: '#f0f0ff' }}>
                      {label}
                    </span>
                    <span className="font-mono text-[10px] truncate" style={{ color: color + 'aa' }}>
                      {sub}
                    </span>
                  </div>

                  <span
                    className="relative ml-auto text-sm transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0"
                    style={{ color }}
                  >
                    ↗
                  </span>
                </motion.a>
              ))}

              {/* Location pill */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-2"
              >
                <span
                  className="inline-flex items-center gap-2 font-mono text-xs tracking-wide px-4 py-2.5 rounded-full"
                  style={{
                    color: '#9ca3af',
                    border: '1px solid rgba(26,26,46,0.9)',
                    background: 'rgba(13,13,26,0.6)',
                  }}
                >
                  <span>📍</span>
                  <span>Bengaluru, India · Available Globally</span>
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer bar */}
      <div
        className="border-t px-6 py-8"
        style={{ borderColor: 'rgba(26, 26, 46, 0.8)' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-grotesk font-bold text-sm tracking-wide holo-text order-2 sm:order-1">
            SIDDHI TIWARI
          </span>

          <nav className="flex items-center gap-5 order-1 sm:order-2 flex-wrap justify-center">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="font-mono text-[11px] tracking-[0.15em] text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                {label.toUpperCase()}
              </a>
            ))}
          </nav>

          <span className="font-mono text-[11px] tracking-wide text-text-secondary order-3">
            © 2026 · Built with intention
          </span>
        </div>
      </div>
    </footer>
  );
}
