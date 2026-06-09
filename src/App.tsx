import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Nav from './components/Nav';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import StackSection from './components/StackSection';
import WorkSection from './components/WorkSection';
import ResearchSection from './components/ResearchSection';
import CredentialsSection from './components/CredentialsSection';
import ContactSection from './components/ContactSection';

function SectionDivider() {
  return (
    <div
      className="h-px w-full max-w-7xl mx-auto"
      style={{
        background:
          'linear-gradient(90deg, transparent 0%, rgba(167,139,250,0.2) 20%, rgba(96,165,250,0.3) 50%, rgba(52,211,153,0.2) 80%, transparent 100%)',
      }}
    />
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative bg-space-black min-h-screen"
      >
        <CustomCursor />
        <Nav />
        <main>
          <HeroSection />
          <SectionDivider />
          <AboutSection />
          <SectionDivider />
          <StackSection />
          <SectionDivider />
          <WorkSection />
          <SectionDivider />
          <ResearchSection />
          <SectionDivider />
          <CredentialsSection />
        </main>
        <ContactSection />
      </motion.div>
    </>
  );
}
