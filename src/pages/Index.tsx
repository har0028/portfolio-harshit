import React, { useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Skills3D } from '@/components/sections/Skills3D';
import { Projects3D } from '@/components/sections/Projects3D';
import { Achievements } from '@/components/sections/Achievements';
import { Contact } from '@/components/sections/Contact';
import { AskHarshitAI } from '@/components/AskHarshitAI/AskHarshitAI';
import { Workspace3D } from '@/components/3d/Workspace3D';
import { toast } from 'sonner';

const Index = () => {
  // Secret Easter Egg keypress listener for typing "HARSHIT"
  useEffect(() => {
    let inputSequence = '';
    const secret = 'harshit';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      inputSequence += e.key.toLowerCase();
      if (inputSequence.length > secret.length) {
        inputSequence = inputSequence.slice(-secret.length);
      }

      if (inputSequence === secret) {
        toast.success('✨ Secret Developer Code Unlocked: Hello from Harshit Satti! 🚀', {
          duration: 4000,
        });
        inputSequence = '';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigateSection = (section: string) => {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent noise-overlay text-foreground">
      {/* Global Persistent 3D Universe Canvas spanning the entire website */}
      <Workspace3D onSelectObject={handleNavigateSection} />

      <Navigation onNavigateSection={handleNavigateSection} />
      <main className="relative z-10">
        <Hero onNavigateSection={handleNavigateSection} />
        <About />
        <Experience />
        <Skills3D />
        <Projects3D />
        <Achievements />
        <Contact />
      </main>
      <AskHarshitAI />
    </div>
  );
};

export default Index;
