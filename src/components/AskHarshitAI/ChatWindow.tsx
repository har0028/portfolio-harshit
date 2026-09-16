import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Minus, Trash2, Send, Loader2, Sparkles, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ChatMessage, MessageData } from './ChatMessage';
import { SuggestedQuestions } from './SuggestedQuestions';
import { askHarshitAI } from './aiService';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen, onClose, onMinimize }) => {
  const initialWelcomeMsg: MessageData = {
    id: 'welcome',
    sender: 'harshit',
    text: "Hey! 👋 I'm Harshit AI.\n\nI can tell you about Harshit's skills, projects, experience, education, certifications, and development journey.\n\nWhat would you like to know?",
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    isInitial: true,
  };

  const [messages, setMessages] = useState<MessageData[]>([initialWelcomeMsg]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || isThinking) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: MessageData = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend.trim(),
      time,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput('');
    setIsThinking(true);

    try {
      const response = await askHarshitAI(textToSend);
      const aiMsg: MessageData = {
        id: (Date.now() + 1).toString(),
        sender: 'harshit',
        text: response.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        projects: response.projects,
        showContactCTA: response.showContactCTA,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: MessageData = {
        id: (Date.now() + 1).toString(),
        sender: 'harshit',
        text: "AI service is temporarily unavailable. I'll answer using Harshit's portfolio data instead.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleClearChat = () => {
    setMessages([initialWelcomeMsg]);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed inset-x-3 bottom-3 sm:inset-auto sm:right-6 sm:bottom-6 sm:w-[420px] h-[85vh] sm:h-[600px] z-50 flex flex-col rounded-2xl glass border border-primary/30 shadow-2xl overflow-hidden backdrop-blur-xl bg-card/95"
      >
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-secondary/80 via-card to-secondary/80 border-b border-border/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold shadow-md border border-primary/20">
                <Bot className="w-5 h-5" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-card animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-heading font-bold text-sm sm:text-base text-foreground">Ask Harshit AI</h4>
                <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>AI Assistant</span>
                <span className="text-[10px] text-green-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Online
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 text-muted-foreground">
            <button
              onClick={handleClearChat}
              title="Clear Conversation"
              className="p-1.5 rounded-lg hover:bg-secondary hover:text-foreground transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onMinimize}
              title="Minimize"
              className="p-1.5 rounded-lg hover:bg-secondary hover:text-foreground transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              title="Close"
              className="p-1.5 rounded-lg hover:bg-secondary hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Container */}
        <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-background/40">
          {messages.map((msg, index) => (
            <React.Fragment key={msg.id}>
              <ChatMessage
                message={msg}
                isLatest={index === messages.length - 1}
                onSelectSuggestion={(q) => handleSend(q)}
              />

              {/* Display Initial Clickable Suggestions under Welcome Message */}
              {msg.isInitial && messages.length === 1 && (
                <SuggestedQuestions onSelect={(q) => handleSend(q)} mode="initial" />
              )}
            </React.Fragment>
          ))}

          {/* Thinking Indicator */}
          {isThinking && (
            <div className="flex items-center gap-2.5 text-xs text-muted-foreground p-3 rounded-2xl bg-secondary/60 border border-border/50 max-w-[80%] animate-pulse">
              <Bot className="w-4 h-4 text-primary animate-spin" />
              <span>Harshit AI is thinking...</span>
            </div>
          )}
        </div>

        {/* Quick Action Chips */}
        <SuggestedQuestions onSelect={(q) => handleSend(q)} mode="chips" />

        {/* Input Area */}
        <div className="p-3 bg-card border-t border-border/80 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <Textarea
              rows={1}
              placeholder="Ask anything about Harshit..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="bg-background/60 text-xs sm:text-sm min-h-[42px] max-h-[90px] resize-none py-2.5 rounded-xl border-border/70 focus-visible:ring-primary"
            />
            <Button
              type="submit"
              disabled={isThinking || !input.trim()}
              size="icon"
              className="h-10 w-10 shrink-0 bg-gradient-primary text-primary-foreground hover:opacity-90 rounded-xl shadow-md"
            >
              {isThinking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </form>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
