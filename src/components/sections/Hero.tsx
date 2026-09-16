import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ExternalLink, ArrowDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Workspace3D } from '../3d/Workspace3D';
import { TerminalModal } from '../TerminalModal';

interface HeroProps {
  onNavigateSection: (section: string) => void;
}

export const Hero = ({ onNavigateSection }: HeroProps) => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSelectObject = (target: string) => {
    setHasInteracted(true);
    if (target === 'ai') {
      // Trigger AI assistant button click event
      const aiBtn = document.querySelector('button[aria-label="Ask Harshit AI"]') as HTMLButtonElement;
      if (aiBtn) aiBtn.click();
    } else if (target === 'github') {
      window.open('https://github.com/har0028', '_blank');
    } else {
      onNavigateSection(target);
    }
  };

  return (
    <section className="relative min-h-screen pt-24 pb-16 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Gradient & VFX */}
      <div className="absolute inset-0 bg-gradient-hero" />

      <div className="container relative z-10 px-6 text-center space-y-8 max-w-6xl mx-auto">
        {/* Open to Work Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/40 backdrop-blur border border-border text-sm text-foreground/80 mx-auto"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>Open to Backend Developer Roles</span>
        </motion.div>

        {/* Main Title & Subtitle Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-3"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tight text-foreground text-balance">
            HARSHIT SATTI
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-heading text-primary font-bold tracking-wide">
            JAVA BACKEND DEVELOPER
          </p>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed pt-2">
            Building backend systems, full-stack applications and AI-powered experiences.
          </p>
        </motion.div>

        {/* Interactive 3D Workspace Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full"
        >
          <Workspace3D onSelectObject={handleSelectObject} onUserInteract={() => setHasInteracted(true)} />

          {/* User Guidance Banner */}
          {!hasInteracted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-card/80 backdrop-blur border border-primary/30 text-xs font-mono text-primary shadow-xl pointer-events-none flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>{isMobile ? 'Drag to explore 3D workspace' : 'Move your cursor to explore 3D workspace'}</span>
            </motion.div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Button
            size="lg"
            className="w-full sm:w-auto bg-gradient-primary hover:opacity-90 text-primary-foreground px-8 py-6 text-base font-semibold shadow-xl shadow-primary/20 rounded-xl group"
            onClick={() => onNavigateSection('projects')}
          >
            <span>EXPLORE PROJECTS</span>
            <ExternalLink className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-primary/40 hover:bg-primary/10 px-8 py-6 text-base font-mono font-medium rounded-xl"
            onClick={() => setIsTerminalOpen(true)}
          >
            <Terminal className="mr-2 w-4 h-4 text-primary" />
            <span>OPEN TERMINAL</span>
          </Button>
        </motion.div>
      </div>

      {/* Interactive CLI Terminal Modal */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onNavigate={(sec) => onNavigateSection(sec)}
      />
    </section>
  );
};
