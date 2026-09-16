import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ArrowRight, MousePointerClick, Sparkles } from 'lucide-react';
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
      const aiBtn = document.querySelector('button[aria-label="Ask Harshit AI"]') as HTMLButtonElement;
      if (aiBtn) aiBtn.click();
    } else if (target === 'github') {
      window.open('https://github.com/har0028', '_blank');
    } else {
      onNavigateSection(target);
    }
  };

  return (
    <section className="relative min-h-screen pt-24 pb-16 flex flex-col items-center justify-center overflow-hidden bg-[#060813]">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10 px-6 max-w-7xl mx-auto space-y-6">
        {/* Top Bar with Status Badge & Top Quote */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Available for Opportunities Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 backdrop-blur-md border border-sky-500/30 text-xs font-medium text-foreground/90 shadow-md"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <span>Available for Opportunities</span>
          </motion.div>

          {/* Top Right Quote */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:block text-right text-xs font-mono text-muted-foreground/80 italic border-l-2 border-primary/40 pl-3"
          >
            <p>"Code today for a better tomorrow."</p>
            <p className="text-primary font-semibold not-italic text-[10px]">— Harshit</p>
          </motion.div>
        </div>

        {/* Main Header & Subtitle overlay */}
        <div className="grid lg:grid-cols-12 gap-6 items-end pt-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-3 text-left"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold tracking-tight text-foreground">
              HARSHIT <span className="text-sky-400 drop-shadow-[0_0_25px_rgba(56,189,248,0.4)]">SATTI</span>
            </h1>
            <p className="text-xl sm:text-2xl font-heading text-sky-400 font-bold tracking-wide">
              Java Backend Developer
            </p>
            <p className="max-w-xl text-sm sm:text-base text-muted-foreground leading-relaxed">
              Building scalable backend systems, full-stack applications and AI-powered experiences.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Button
                size="lg"
                className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-7 py-6 text-sm rounded-xl shadow-lg shadow-sky-500/25 group transition-all"
                onClick={() => onNavigateSection('projects')}
              >
                <span>View Projects</span>
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-sky-500/40 hover:bg-sky-500/10 text-foreground font-mono text-sm px-7 py-6 rounded-xl backdrop-blur-md"
                onClick={() => setIsTerminalOpen(true)}
              >
                <Terminal className="mr-2 w-4 h-4 text-sky-400" />
                <span>&gt;_ Open Terminal</span>
              </Button>
            </div>
          </motion.div>

          {/* Quick Stats Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex items-center justify-start lg:justify-end gap-6 text-left pt-2 lg:pt-0"
          >
            <div className="space-y-0.5">
              <p className="font-heading font-extrabold text-2xl text-foreground">3+</p>
              <p className="text-xs text-muted-foreground">Projects</p>
            </div>
            <div className="w-px h-8 bg-border/60" />
            <div className="space-y-0.5">
              <p className="font-heading font-extrabold text-2xl text-foreground">6+</p>
              <p className="text-xs text-muted-foreground">Technologies</p>
            </div>
            <div className="w-px h-8 bg-border/60" />
            <div className="space-y-0.5">
              <p className="font-heading font-extrabold text-2xl text-sky-400">∞</p>
              <p className="text-xs text-muted-foreground">Learning</p>
            </div>
          </motion.div>
        </div>

        {/* Photorealistic 3D Workspace Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative w-full pt-2"
        >
          <Workspace3D onSelectObject={handleSelectObject} onUserInteract={() => setHasInteracted(true)} />

          {/* Guidance Banner matching Reference Image */}
          {!hasInteracted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full bg-card/90 backdrop-blur-md border border-sky-500/30 text-xs font-medium text-foreground shadow-2xl pointer-events-none flex items-center gap-2"
            >
              <MousePointerClick className="w-4 h-4 text-sky-400 animate-bounce" />
              <span>{isMobile ? 'Drag to explore workspace' : 'Move your cursor to explore'}</span>
            </motion.div>
          )}
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
