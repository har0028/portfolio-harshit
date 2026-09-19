import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, Volume2, VolumeX } from 'lucide-react';
import { CommandPalette } from './CommandPalette';
import { useAudio } from '@/context/AudioContext';

interface NavigationProps {
  onNavigateSection?: (section: string) => void;
}

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export const Navigation = ({ onNavigateSection }: NavigationProps) => {
  const { isPlaying, togglePlay } = useAudio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 50;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const section = href.replace('#', '');
    if (onNavigateSection) {
      onNavigateSection(section);
    }
  };

  return (
    <>
      <CommandPalette onNavigate={(sec) => handleNavClick(`#${sec}`)} />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#04060c]/95 backdrop-blur-xl border-b border-slate-800/90 shadow-2xl py-3'
            : 'bg-[#060812]/92 backdrop-blur-md border-b border-slate-800/80 shadow-lg py-4'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a href="#" className="font-heading text-xl font-semibold text-foreground">
            HS<span className="text-primary">.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}

            {/* Music ON/OFF Button in Navbar */}
            <button
              onClick={togglePlay}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all shadow-sm ${
                isPlaying
                  ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/25 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                  : 'bg-secondary/60 hover:bg-secondary border-border text-muted-foreground hover:text-foreground'
              }`}
              title={isPlaying ? 'Click to Pause / Close Music' : 'Click to Play Ambient Music'}
            >
              {isPlaying ? (
                <>
                  <div className="flex items-end gap-0.5 h-3.5 w-3 justify-center">
                    <span className="w-0.5 bg-cyan-400 rounded-full animate-[bounce_0.8s_ease-in-out_infinite] h-3" />
                    <span className="w-0.5 bg-cyan-300 rounded-full animate-[bounce_0.6s_ease-in-out_infinite_0.2s] h-2" />
                    <span className="w-0.5 bg-blue-400 rounded-full animate-[bounce_0.9s_ease-in-out_infinite_0.4s] h-3.5" />
                  </div>
                  <span>Music: On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                  <span>Music: Off</span>
                </>
              )}
            </button>

            {/* Ctrl + K Shortcut Button */}
            <button
              onClick={() => {
                const event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true });
                window.dispatchEvent(event);
              }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-secondary/60 hover:bg-secondary border border-border text-xs text-muted-foreground hover:text-foreground transition-all"
              title="Command Palette (Ctrl + K)"
            >
              <Search className="w-3.5 h-3.5 text-primary" />
              <span>Search</span>
              <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-background border border-border">Ctrl K</kbd>
            </button>
          </div>

          {/* Mobile Action Buttons */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Music Toggle */}
            <button
              onClick={togglePlay}
              className={`p-2 rounded-xl border text-xs transition-all ${
                isPlaying
                  ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300'
                  : 'bg-secondary/60 border-border text-muted-foreground'
              }`}
              title={isPlaying ? 'Pause Music' : 'Play Music'}
              aria-label="Toggle Background Music"
            >
              {isPlaying ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#05070f]/98 backdrop-blur-2xl pt-20"
          >
            <div className="flex flex-col items-center gap-8 py-12">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleNavClick(item.href);
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-2xl font-heading text-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
