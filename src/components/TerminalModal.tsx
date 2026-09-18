import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, Minimize2, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: string) => void;
}

interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      id: 'welcome',
      command: 'welcome',
      output: (
        <div className="space-y-1 text-xs sm:text-sm text-gray-300">
          <p className="text-primary font-bold">Harshit Satti Interactive CLI Portfolio v2.0</p>
          <p>Type <span className="text-green-400 font-semibold">help</span> to see available commands.</p>
        </div>
      ),
    },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    const lower = trimmed.toLowerCase();
    if (!trimmed) return;

    let output: React.ReactNode;

    switch (lower) {
      case 'help':
        output = (
          <div className="space-y-1 text-xs text-gray-300">
            <p className="text-primary font-semibold">Available Commands:</p>
            <p><span className="text-green-400 font-mono w-24 inline-block">about</span> - Learn about Harshit Satti</p>
            <p><span className="text-green-400 font-mono w-24 inline-block">skills</span> - List backend & frontend technologies</p>
            <p><span className="text-green-400 font-mono w-24 inline-block">projects</span> - Display featured projects</p>
            <p><span className="text-green-400 font-mono w-24 inline-block">experience</span> - View internship & simulation details</p>
            <p><span className="text-green-400 font-mono w-24 inline-block">github</span> - Open GitHub profile link</p>
            <p><span className="text-green-400 font-mono w-24 inline-block">contact</span> - Contact information & links</p>
            <p><span className="text-green-400 font-mono w-24 inline-block">clear</span> - Clear terminal logs</p>
            <p><span className="text-yellow-400 font-mono w-24 inline-block">sudo hire harshit</span> - Special easter egg command</p>
          </div>
        );
        break;

      case 'about':
        output = (
          <div className="space-y-2 text-xs text-gray-300">
            <p className="text-white font-bold">Harshit Satti — Java Backend Developer</p>
            <p>B.Tech in Computer Science & Engineering | COER University (CGPA: 7.00, 2023–2027)</p>
            <p>Specializing in building scalable backend services, RESTful APIs, role-based security, and MySQL database optimization.</p>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-1 text-xs text-gray-300">
            <p className="text-primary font-bold">Technical Stack:</p>
            <p>• Languages: Core Java, Advanced Java, SQL</p>
            <p>• Frameworks: Spring Boot, Spring MVC, Hibernate ORM, Servlets, JSP, J2EE</p>
            <p>• API: REST APIs, RESTful Web Services, Postman</p>
            <p>• Database: MySQL, JDBC, Schema Design & Normalization</p>
            <p>• Concepts: 250+ DSA Problems Solved, OOP, MVC, Multithreading</p>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-xs text-gray-300">
            <p className="text-primary font-bold">Loading Projects...</p>
            <div className="p-2.5 rounded bg-gray-900/80 border border-gray-800 space-y-1">
              <p className="text-green-400 font-bold">✓ SmartJobPortal with AI-Based Recommendation Engine</p>
              <p className="text-gray-400">Spring Boot • React • MySQL • REST APIs</p>
              <a href="https://smart-job-portal-web.onrender.com" target="_blank" rel="noreferrer" className="text-xs text-primary underline">Live Site</a>
            </div>
            <div className="p-2.5 rounded bg-gray-900/80 border border-gray-800 space-y-1">
              <p className="text-green-400 font-bold">✓ AI-Powered Secure Online Examination System</p>
              <p className="text-gray-400">Java • Servlets • JSP • JDBC • MySQL</p>
              <a href="https://ai-secure-exam-system.onrender.com/" target="_blank" rel="noreferrer" className="text-xs text-primary underline">Live Site</a>
            </div>
          </div>
        );
        break;

      case 'experience':
        output = (
          <div className="space-y-2 text-xs text-gray-300">
            <p className="text-primary font-bold">Experience Timeline:</p>
            <p>• <span className="text-white font-semibold">Java Backend Developer Intern</span> @ IncodeVision (April 2026 – June 2026)</p>
            <p>• <span className="text-white font-semibold">Software Engineering Simulation</span> @ JPMorgan Chase & Co. (July 2026)</p>
            <p>• <span className="text-white font-semibold">Internal Hackathon 6.0</span> @ SIH 2025</p>
          </div>
        );
        break;

      case 'github':
        output = (
          <div className="text-xs text-gray-300">
            <p className="text-primary">Opening GitHub...</p>
            <a href="https://github.com/har0028" target="_blank" rel="noreferrer" className="text-green-400 underline font-mono">
              https://github.com/har0028
            </a>
          </div>
        );
        window.open('https://github.com/har0028', '_blank');
        break;

      case 'contact':
        output = (
          <div className="space-y-1 text-xs text-gray-300">
            <p className="text-primary font-bold">Contact Harshit:</p>
            <p>• Email: harshitsati30@gmail.com</p>
            <p>• Phone: +91 8755776798</p>
            <p>• Location: Roorkee, Uttarakhand, India</p>
            <p>• LinkedIn: linkedin.com/in/harshit-satti-4629b3283/</p>
          </div>
        );
        break;

      case 'clear':
        setLogs([]);
        setInput('');
        return;

      case 'sudo hire harshit':
        output = (
          <div className="p-3 rounded bg-indigo-950/80 border border-indigo-500/40 space-y-2 text-xs">
            <p className="text-yellow-400 font-bold">🚀 Developer profile loaded.</p>
            <div className="space-y-0.5 text-green-400 font-mono">
              <p>✓ Core & Advanced Java</p>
              <p>✓ Spring Boot & Spring MVC</p>
              <p>✓ REST APIs & Web Services</p>
              <p>✓ MySQL Database Design</p>
              <p>✓ Full Stack Development</p>
            </div>
            <div className="pt-2">
              <Button
                size="sm"
                className="bg-primary hover:opacity-90 text-primary-foreground text-xs"
                onClick={() => {
                  onClose();
                  onNavigate('contact');
                }}
              >
                CONTACT HARSHIT <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </div>
        );
        break;

      default:
        output = (
          <p className="text-red-400 text-xs font-mono">
            Command not recognized: "{trimmed}". Type <span className="text-green-400 font-bold">help</span> for commands.
          </p>
        );
        break;
    }

    setLogs((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        command: trimmed,
        output,
      },
    ]);
    setInput('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl h-[480px] rounded-2xl bg-slate-950/95 border border-slate-800/90 shadow-2xl overflow-hidden flex flex-col backdrop-blur-xl"
        >
          {/* Header */}
          <div className="p-3 bg-slate-900/90 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-primary" />
              <span className="font-mono text-xs font-bold text-foreground">harshit@portfolio:~ (zsh)</span>
            </div>
            <button onClick={onClose} className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Terminal Content Log */}
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-4 bg-[#07090e]">
            {logs.map((log) => (
              <div key={log.id} className="space-y-1.5">
                {log.command !== 'welcome' && (
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <span>harshit@dev:~$</span>
                    <span className="text-white">{log.command}</span>
                  </div>
                )}
                <div>{log.output}</div>
              </div>
            ))}
          </div>

          {/* Terminal Command Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand(input);
            }}
            className="p-3 bg-slate-950/95 border-t border-slate-800/80 flex items-center gap-2 font-mono"
          >
            <span className="text-green-400 text-xs font-bold">$</span>
            <input
              autoFocus
              type="text"
              placeholder="Type command ('help', 'projects', 'sudo hire harshit')..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent text-xs text-white outline-none border-none placeholder:text-gray-600"
            />
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
