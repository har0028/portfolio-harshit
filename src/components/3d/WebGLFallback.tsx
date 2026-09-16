import React from 'react';
import { Laptop, Monitor, BookOpen, Smartphone, ShieldCheck, Bot, Coffee } from 'lucide-react';

interface WebGLFallbackProps {
  onSelectObject: (target: string) => void;
}

export const WebGLFallback: React.FC<WebGLFallbackProps> = ({ onSelectObject }) => {
  return (
    <div className="w-full h-full min-h-[450px] flex items-center justify-center p-6 bg-gradient-to-b from-background/90 via-secondary/30 to-background/90 border border-primary/20 rounded-3xl shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-gradient opacity-30" />
      <div className="relative z-10 text-center space-y-6 max-w-xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-mono">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Interactive Workspace Mode (Lite)
        </div>

        <h3 className="font-heading font-bold text-2xl sm:text-3xl text-foreground">
          Harshit's Developer Environment
        </h3>
        <p className="text-muted-foreground text-sm">
          Click any workspace object below to jump directly to its section:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
          <button
            onClick={() => onSelectObject('projects')}
            className="p-4 rounded-2xl bg-card border border-border hover:border-primary/50 text-left transition-all group shadow-sm"
          >
            <Laptop className="w-6 h-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-heading font-bold text-sm">Laptop</h4>
            <p className="text-xs text-muted-foreground">View Projects</p>
          </button>

          <button
            onClick={() => onSelectObject('github')}
            className="p-4 rounded-2xl bg-card border border-border hover:border-primary/50 text-left transition-all group shadow-sm"
          >
            <Monitor className="w-6 h-6 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-heading font-bold text-sm">Monitor</h4>
            <p className="text-xs text-muted-foreground">GitHub Profile</p>
          </button>

          <button
            onClick={() => onSelectObject('skills')}
            className="p-4 rounded-2xl bg-card border border-border hover:border-primary/50 text-left transition-all group shadow-sm"
          >
            <BookOpen className="w-6 h-6 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-heading font-bold text-sm">Books</h4>
            <p className="text-xs text-muted-foreground">Technical Skills</p>
          </button>

          <button
            onClick={() => onSelectObject('contact')}
            className="p-4 rounded-2xl bg-card border border-border hover:border-primary/50 text-left transition-all group shadow-sm"
          >
            <Smartphone className="w-6 h-6 text-sky-400 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-heading font-bold text-sm">Smartphone</h4>
            <p className="text-xs text-muted-foreground">Contact Me</p>
          </button>

          <button
            onClick={() => onSelectObject('about')}
            className="p-4 rounded-2xl bg-card border border-border hover:border-primary/50 text-left transition-all group shadow-sm"
          >
            <ShieldCheck className="w-6 h-6 text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-heading font-bold text-sm">ID Card</h4>
            <p className="text-xs text-muted-foreground">About Harshit</p>
          </button>

          <button
            onClick={() => onSelectObject('ai')}
            className="p-4 rounded-2xl bg-card border border-border hover:border-primary/50 text-left transition-all group shadow-sm"
          >
            <Bot className="w-6 h-6 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-heading font-bold text-sm">Robot</h4>
            <p className="text-xs text-muted-foreground">Ask Harshit AI</p>
          </button>
        </div>
      </div>
    </div>
  );
};
