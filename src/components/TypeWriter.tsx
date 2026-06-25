import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypeWriterProps {
  text: string;
  delay?: number;
  onComplete?: () => void;
}

export const TypeWriter = ({ text, delay = 100, onComplete }: TypeWriterProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, text, delay, onComplete, isComplete]);

  return (
    <span className="inline-flex">
      {displayedText.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: 1, 
            y: 0,
          }}
          transition={{ 
            duration: 0.1,
            delay: 0
          }}
          className={isComplete ? 'animate-letter-glow' : ''}
          style={{ 
            animationDelay: isComplete ? `${index * 0.1}s` : '0s'
          }}
        >
         {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
      {!isComplete && (
        <span className="ml-1 w-[3px] h-[1em] bg-primary animate-typing-cursor inline-block" />
      )}
    </span>
  );
};
