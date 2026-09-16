import React from 'react';

export const initialSuggestions = [
  '👨‍💻 Who is Harshit?',
  '🚀 What projects has he built?',
  '☕ What are his Java skills?',
  '⚙️ What does he know about Spring Boot?',
  '🧠 What is his DSA experience?',
  '🎓 What is his education?',
  '🏆 What certifications does he have?',
  '💼 Is Harshit available for opportunities?',
  '📩 How can I contact him?',
];

export const quickChips = [
  { label: 'Projects', query: 'Tell me about Harshit\'s projects.' },
  { label: 'Skills', query: 'What are Harshit\'s skills?' },
  { label: 'Experience', query: 'Tell me about Harshit\'s experience.' },
  { label: 'Education', query: 'What is Harshit\'s education?' },
  { label: 'Certifications', query: 'What certifications does Harshit have?' },
  { label: 'Contact', query: 'How can I contact Harshit?' },
];

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
  mode?: 'initial' | 'chips';
}

export const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({ onSelect, mode = 'initial' }) => {
  if (mode === 'chips') {
    return (
      <div className="flex flex-wrap gap-1.5 py-2 px-1 border-t border-border/40 bg-secondary/20">
        {quickChips.map((chip) => (
          <button
            key={chip.label}
            onClick={() => onSelect(chip.query)}
            className="px-2.5 py-1 rounded-full text-xs font-medium bg-secondary/80 text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200 border border-border/60 shadow-sm"
          >
            {chip.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 pt-2 border-t border-border/40">
      {initialSuggestions.map((question) => (
        <button
          key={question}
          onClick={() => onSelect(question)}
          className="text-left px-3 py-2 rounded-xl text-xs bg-secondary/60 hover:bg-primary/20 hover:border-primary/40 text-foreground border border-border/50 transition-all duration-200 flex items-center gap-2 group"
        >
          <span className="truncate group-hover:text-primary transition-colors">{question}</span>
        </button>
      ))}
    </div>
  );
};
