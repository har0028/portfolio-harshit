import React, { useState, useEffect } from 'react';
import { ProjectInfo, harshitProfile } from './aiKnowledge';
import { ExternalLink, Github, Linkedin, Mail, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface MessageData {
  id: string;
  sender: 'user' | 'harshit';
  text: string;
  time: string;
  projects?: ProjectInfo[];
  showContactCTA?: boolean;
  isInitial?: boolean;
}

interface ChatMessageProps {
  message: MessageData;
  onSelectSuggestion?: (question: string) => void;
  isLatest?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLatest }) => {
  const isHarshit = message.sender === 'harshit';
  const [displayedText, setDisplayedText] = useState(isHarshit && isLatest && !message.isInitial ? '' : message.text);

  useEffect(() => {
    if (isHarshit && isLatest && !message.isInitial) {
      let index = 0;
      const fullText = message.text;
      const step = Math.max(1, Math.floor(fullText.length / 40));
      const interval = setInterval(() => {
        index += step;
        if (index >= fullText.length) {
          setDisplayedText(fullText);
          clearInterval(interval);
        } else {
          setDisplayedText(fullText.slice(0, index));
        }
      }, 15);
      return () => clearInterval(interval);
    } else {
      setDisplayedText(message.text);
    }
  }, [message.text, isHarshit, isLatest, message.isInitial]);

  // Helper to render text with bold formatting and markdown links
  const renderFormattedText = (text: string) => {
    return text.split('\n').map((line, lineIdx) => {
      // Parse markdown links [Label](url)
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = linkRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        const label = match[1];
        const url = match[2];
        parts.push(
          <a
            key={`${match.index}-${url}`}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline font-medium hover:opacity-80 transition-opacity"
          >
            {label}
          </a>
        );
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      // Process bold formatting **text**
      const processedParts = parts.map((part, pIdx) => {
        if (typeof part !== 'string') return part;
        const boldSplit = part.split(/\*\*(.*?)\*\*/g);
        return boldSplit.map((bPart, bIdx) =>
          bIdx % 2 === 1 ? (
            <strong key={bIdx} className="font-semibold text-foreground">
              {bPart}
            </strong>
          ) : (
            bPart
          )
        );
      });

      return (
        <span key={lineIdx} className="block min-h-[1.25rem]">
          {processedParts}
        </span>
      );
    });
  };

  return (
    <div className={`flex gap-3 ${isHarshit ? 'justify-start' : 'justify-end'} group`}>
      {isHarshit && (
        <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground shrink-0 shadow-md border border-primary/20">
          <Bot className="w-4.5 h-4.5" />
        </div>
      )}

      <div className={`max-w-[85%] sm:max-w-[80%] space-y-3`}>
        {/* Message Bubble */}
        <div
          className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
            isHarshit
              ? 'bg-secondary/80 text-foreground border border-border/60 rounded-tl-none backdrop-blur-sm'
              : 'bg-primary text-primary-foreground rounded-tr-none font-medium'
          }`}
        >
          <div className="space-y-1">{renderFormattedText(displayedText)}</div>

          <span
            className={`block text-[10px] mt-1.5 text-right ${
              isHarshit ? 'text-muted-foreground' : 'text-primary-foreground/70'
            }`}
          >
            {message.time}
          </span>
        </div>

        {/* Project Cards Inside Chat */}
        {isHarshit && message.projects && message.projects.length > 0 && (
          <div className="space-y-3 pt-1">
            {message.projects.map((proj) => (
              <div
                key={proj.name}
                className="p-3.5 rounded-xl bg-card border border-primary/30 shadow-md hover:border-primary/60 transition-all duration-200 space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <h5 className="font-heading font-bold text-xs sm:text-sm text-foreground flex items-center gap-1.5">
                    🚀 {proj.name}
                  </h5>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{proj.description}</p>
                <div className="flex flex-wrap gap-1">
                  {proj.technologies.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-primary/10 text-primary border border-primary/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 pt-1 border-t border-border/40">
                  {proj.liveDemo && (
                    <a
                      href={proj.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary text-primary-foreground text-[11px] font-semibold hover:bg-primary/90 transition-all"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-secondary text-secondary-foreground text-[11px] font-medium border border-border hover:bg-secondary/80 transition-all"
                    >
                      <Github className="w-3 h-3" />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contact CTA */}
        {isHarshit && message.showContactCTA && (
          <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 space-y-2">
            <p className="text-xs font-semibold text-foreground">Want to connect with Harshit?</p>
            <div className="flex flex-wrap gap-2">
              <a
                href={harshitProfile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-400 text-xs font-medium border border-blue-500/30 hover:bg-blue-600/30 transition-all"
              >
                <Linkedin className="w-3.5 h-3.5" />
                LinkedIn
              </a>
              <a
                href={harshitProfile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-foreground text-xs font-medium border border-border hover:bg-secondary/80 transition-all"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </a>
              <a
                href={`mailto:${harshitProfile.email}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/20 text-primary text-xs font-medium border border-primary/30 hover:bg-primary/30 transition-all"
              >
                <Mail className="w-3.5 h-3.5" />
                Email
              </a>
            </div>
          </div>
        )}
      </div>

      {!isHarshit && (
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-foreground shrink-0 border border-border">
          <User className="w-4.5 h-4.5" />
        </div>
      )}
    </div>
  );
};
