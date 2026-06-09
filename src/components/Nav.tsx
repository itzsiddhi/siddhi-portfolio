import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LINKS = [
  { label: 'ABOUT', href: '#about' },
  { label: 'STACK', href: '#stack' },
  { label: 'WORK', href: '#work' },
  { label: 'RESEARCH', href: '#research' },
  { label: 'CREDENTIALS', href: '#credentials' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const ids = ['about', 'stack', 'work', 'research', 'credentials', 'contact'];
      let current = '';
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) current = `#${id}`;
      });
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'}`}
        style={{
          background: scrolled ? 'rgba(0,0,8,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(26,26,46,0.7)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          <a href="#hero" className="font-grotesk font-bold text-xl tracking-tight flex-shrink-0">
            <span className="holo-text">ST</span>
          </a>

          <div className="hidden lg:flex items-center gap-6">
            {LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="relative font-mono text-[11px] tracking-[0.2em] text-text-secondary hover:text-text-primary transition-colors duration-300 group py-1"
              >
                {label}
                <span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px transition-all duration-300 group-hover:w-full"
                  style={{
                    width: active === href ? '100%' : '0%',
                    background: 'linear-gradient(90deg, #a78bfa, #60a5fa, #34d399)',
                  }}
                />
              </a>
            ))}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2 ml-auto"
            aria-label="Menu"
          >
            <motion.span animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="block w-5 h-px bg-text-primary" />
            <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-5 h-px bg-text-primary" />
            <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="block w-5 h-px bg-text-primary" />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-7"
            style={{ background: 'rgba(0,0,8,0.97)', backdropFilter: 'blur(20px)' }}
          >
            {LINKS.map(({ label, href }, i) => (
              <motion.a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="font-grotesk font-bold text-3xl tracking-wide holo-text"
              >
                {label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
