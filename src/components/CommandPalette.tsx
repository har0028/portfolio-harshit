import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Folder, Code2, User, Building2, Github, Bot, Mail, X } from 'lucide-react';

interface CommandPaletteProps {
  onNavigate: (section: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const items = [
    { label: 'Projects', section: 'projects', icon: Folder, description: 'View Java & Spring Boot Projects' },
    { label: 'Skills', section: 'skills', icon: Code2, description: 'Backend & Database Skillset' },
    { label: 'About Harshit', section: 'about', icon: User, description: 'Education & Professional Bio' },
    { label: 'Experience', section: 'experience', icon: Building2, description: 'Internship & Simulation Experience' },
    { label: 'GitHub Profile', section: 'github', icon: Github, description: 'Open GitHub Repository (har0028)' },
    { label: 'Ask Harshit AI', section: 'ai', icon: Bot, description: 'Chat with Portfolio AI Assistant' },
    { label: 'Contact', section: 'contact', icon: Mail, description: 'Direct Email & Phone' },
  ];

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (section: string) => {
    setIsOpen(false);
    setQuery('');
    if (section === 'github') {
      window.open('https://github.com/har0028', '_blank');
    } else {
      onNavigate(section);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-background/80 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl rounded-2xl bg-card border border-primary/40 shadow-2xl overflow-hidden"
            >
              {/* Search Bar */}
              <div className="p-4 border-b border-border flex items-center gap-3">
                <Search className="w-5 h-5 text-primary" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search portfolio or type section name... (Press Esc to exit)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent text-sm text-foreground outline-none border-none placeholder:text-muted-foreground"
                />
                <kbd className="hidden sm:inline-block text-[10px] px-2 py-1 rounded bg-secondary text-muted-foreground border border-border">
                  ESC
                </kbd>
              </div>

              {/* Items List */}
              <div className="max-h-72 overflow-y-auto p-2 space-y-1">
                {filteredItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleSelect(item.section)}
                    className="w-full p-3 rounded-xl hover:bg-primary/10 hover:border-primary/30 border border-transparent transition-all flex items-center justify-between group text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                          {item.label}
                        </p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">Jump →</span>
                  </button>
                ))}
                {filteredItems.length === 0 && (
                  <div className="p-6 text-center text-xs text-muted-foreground">No matching sections found.</div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
