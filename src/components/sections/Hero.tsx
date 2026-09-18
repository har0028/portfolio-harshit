import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TerminalModal } from '../TerminalModal';

interface HeroProps {
  onNavigateSection: (section: string) => void;
}

export const Hero = ({ onNavigateSection }: HeroProps) => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Professional typing animation for HARSHIT SATTI
  const fullName = "HARSHIT SATTI";
  const [typedCount, setTypedCount] = useState(0);
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setTypedCount((prev) => {
          if (prev >= fullName.length) {
            clearInterval(interval);
            setIsTypingDone(true);
            return prev;
          }
          return prev + 1;
        });
      }, 80);

      return () => clearInterval(interval);
    }, 250);

    return () => clearTimeout(startDelay);
  }, [fullName.length]);

  const firstWord = fullName.slice(0, Math.min(typedCount, 7)); // "HARSHIT"
  const hasSpace = typedCount > 7;
  const secondWord = typedCount > 8 ? fullName.slice(8, typedCount) : "";

  return (
    <section id="hero" className="relative min-h-[90vh] lg:min-h-screen pt-28 pb-16 flex flex-col items-center justify-center overflow-hidden">
      {/* Ambient background glow accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="container relative z-10 px-6 max-w-7xl mx-auto space-y-8">
        {/* Top Bar with Status Badge & Top Quote */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Available for Opportunities Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/90 backdrop-blur-md border border-sky-500/30 text-xs font-medium text-foreground/90 shadow-xl"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <span>Available for Opportunities</span>
          </motion.div>

          {/* Top Right Quote */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:block text-right text-xs font-mono text-muted-foreground/90 italic border-l-2 border-primary/40 pl-3 backdrop-blur-md bg-slate-950/90 border border-slate-800/80 p-2.5 rounded-r-xl shadow-xl"
          >
            <p>"Code today for a better tomorrow."</p>
            <p className="text-primary font-semibold not-italic text-[10px]">— Harshit</p>
          </motion.div>
        </div>

        {/* Main Header & Subtitle overlay */}
        <div className="grid lg:grid-cols-12 gap-6 items-center pt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-4 text-left"
          >
            {/* Typing Name Header */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold tracking-tight text-foreground drop-shadow-md min-h-[1.15em] flex items-baseline flex-wrap">
              <span>{firstWord}</span>
              {hasSpace && <span>&nbsp;</span>}
              <span className="text-sky-400 drop-shadow-[0_0_25px_rgba(56,189,248,0.4)]">{secondWord}</span>
              {!isTypingDone && (
                <span className="inline-block w-[3px] h-[0.75em] ml-1 bg-sky-400 animate-pulse align-middle" />
              )}
            </h1>

            <p className="text-xl sm:text-2xl font-heading text-sky-400 font-bold tracking-wide">
              Java Backend Developer
            </p>
            <p className="max-w-xl text-sm sm:text-base text-foreground/90 leading-relaxed bg-slate-950/90 backdrop-blur-md p-4 rounded-xl border border-slate-800/90 shadow-2xl">
              Building scalable backend systems, full-stack applications and AI-powered experiences.
            </p>

            {/* Action Buttons — Compact Futuristic Row */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Button
                size="sm"
                className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-4 sm:px-5 py-5 text-xs sm:text-sm rounded-xl shadow-lg shadow-sky-500/25 group transition-all"
                onClick={() => onNavigateSection('projects')}
              >
                <span>View Projects</span>
                <ArrowRight className="ml-1.5 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="border-slate-700/80 hover:border-sky-500/50 hover:bg-sky-500/10 text-foreground font-semibold text-xs sm:text-sm px-4 sm:px-5 py-5 rounded-xl backdrop-blur-md bg-slate-950/90 shadow-lg group transition-all"
                asChild
              >
                <a href="/Harshit_Satti_Resume2026.pdf" target="_blank" rel="noopener noreferrer">
                  <FileText className="mr-1.5 w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                  <span>View Resume</span>
                </a>
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="border-slate-700/80 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-foreground font-semibold text-xs sm:text-sm px-4 sm:px-5 py-5 rounded-xl backdrop-blur-md bg-slate-950/90 shadow-lg group transition-all"
                asChild
              >
                <a href="/Harshit_Satti_Resume2026.pdf" download="Harshit_Satti_Resume2026.pdf">
                  <Download className="mr-1.5 w-4 h-4 text-emerald-400 group-hover:translate-y-0.5 transition-transform" />
                  <span>Download Resume</span>
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Quick Stats Badges: 9+ Projects | 35+ Technologies | 10+ Certificates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex items-center justify-start lg:justify-end gap-4 sm:gap-6 text-left pt-4 lg:pt-0"
          >
            <div className="space-y-0.5 bg-slate-950/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-800/90 shadow-2xl">
              <p className="font-heading font-extrabold text-2xl text-foreground">9+</p>
              <p className="text-xs text-muted-foreground">Projects</p>
            </div>
            <div className="w-px h-8 bg-border/60" />
            <div className="space-y-0.5 bg-slate-950/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-800/90 shadow-2xl">
              <p className="font-heading font-extrabold text-2xl text-foreground">35+</p>
              <p className="text-xs text-muted-foreground">Technologies</p>
            </div>
            <div className="w-px h-8 bg-border/60" />
            <div className="space-y-0.5 bg-slate-950/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-800/90 shadow-2xl">
              <p className="font-heading font-extrabold text-2xl text-sky-400">10+</p>
              <p className="text-xs text-muted-foreground">Certificates</p>
            </div>
          </motion.div>
        </div>
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
