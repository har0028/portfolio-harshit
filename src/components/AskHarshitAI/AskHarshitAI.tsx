import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, MessageSquare } from 'lucide-react';
import { ChatWindow } from './ChatWindow';

export const AskHarshitAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleToggle = () => {
    if (isMinimized) {
      setIsMinimized(false);
      setIsOpen(true);
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      {/* Chat Window Panel */}
      <ChatWindow
        isOpen={isOpen && !isMinimized}
        onClose={() => setIsOpen(false)}
        onMinimize={() => setIsMinimized(true)}
      />

      {/* Floating Trigger Button */}
      {(!isOpen || isMinimized) && (
        <div className="fixed bottom-6 right-6 z-40 flex items-center">
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.95 }}
                className="hidden sm:block mr-3 px-3.5 py-1.5 rounded-xl bg-card/90 backdrop-blur border border-primary/30 text-xs font-medium text-foreground shadow-lg whitespace-nowrap"
              >
                Ask me anything about Harshit 👋
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating AI Button */}
          <motion.button
            onClick={handleToggle}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, y: [0, -4, 0] }}
            transition={{
              scale: { duration: 0.3 },
              y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-primary text-primary-foreground font-heading font-semibold text-xs sm:text-sm shadow-xl shadow-primary/25 border border-primary/40 backdrop-blur-md overflow-hidden"
            aria-label="Ask Harshit AI"
          >
            {/* Glow Aura */}
            <span className="absolute inset-0 rounded-full bg-primary/20 blur-md group-hover:bg-primary/40 transition-colors" />

            <div className="relative flex items-center gap-2">
              <div className="relative">
                <Bot className="w-5 h-5 text-primary-foreground group-hover:rotate-12 transition-transform duration-300" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-400 border border-primary animate-pulse" />
              </div>
              <span className="tracking-wide">🤖 Ask Harshit AI</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-black/20 backdrop-blur border border-white/10 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Online
              </span>
            </div>
          </motion.button>
        </div>
      )}
    </>
  );
};
