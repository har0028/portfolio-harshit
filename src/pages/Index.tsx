import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { Achievements } from '@/components/sections/Achievements';
import { Contact } from '@/components/sections/Contact';
import { IntroScreen } from '@/components/IntroScreen';

const Index = () => {
  const [showIntro, setShowIntro] = useState(() => {
    // Check if the user has already unlocked the portfolio in this session
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('portfolio-unlocked');
    }
    return true;
  });

  // Lock scrolling when intro screen is active
  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showIntro]);

  const handleIntroComplete = () => {
    sessionStorage.setItem('portfolio-unlocked', 'true');
    setShowIntro(false);
  };

  return (
    <div className="relative noise-overlay">
      {showIntro && <IntroScreen onComplete={handleIntroComplete} />}
      <div className={showIntro ? "invisible h-screen overflow-hidden" : "visible"}>
        <Navigation />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Achievements />
          <Contact />
        </main>
      </div>
    </div>
  );
};

export default Index;
