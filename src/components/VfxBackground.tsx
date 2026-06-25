import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const SYMBOLS = ['{ }', '</>', ';', 'java', 'spring', 'sql', 'rest', '( )', '&&', '||', '=>', '[]'];

interface Particle {
  id: number;
  symbol: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

export const VfxBackground = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    // Generate random code particles
    const items: Particle[] = Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      symbol: SYMBOLS[i % SYMBOLS.length],
      x: Math.random() * 90 + 5,
      y: Math.random() * 100,
      size: Math.floor(Math.random() * 18) + 12,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * -20,
      color: i % 3 === 0
        ? 'text-primary/25'
        : i % 3 === 1
        ? 'text-sky-500/20'
        : 'text-purple-500/20',
    }));
    setParticles(items);

    // Mouse movement listener for interactive spotlight
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Background Loop Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-[0.20] mix-blend-screen pointer-events-none"
      >
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-abstract-digital-technology-background-48851-large.mp4"
          type="video/mp4"
        />
      </video>

      {/* Interactive Cursor Spotlight Glow */}
      <div
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(14, 165, 233, 0.14), rgba(168, 85, 247, 0.06), transparent 80%)`,
        }}
      />

      {/* Dynamic Nebulae Orbs */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-primary/10 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -50, 70, 0],
          y: [0, 80, -30, 0],
          scale: [1, 0.8, 1.15, 1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-sky-500/8 rounded-full blur-[130px]"
      />
      <motion.div
        animate={{
          x: [0, 60, -80, 0],
          y: [0, 40, 60, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-10 right-10 w-[250px] h-[250px] bg-purple-500/8 rounded-full blur-[100px]"
      />

      {/* Floating Developer Symbols with Drifting Wave Path */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            x: `${p.x}vw`,
            y: '110vh',
            opacity: 0,
            rotate: 0,
          }}
          animate={{
            y: '-10vh',
            x: [`${p.x}vw`, `${p.x + 4}vw`, `${p.x - 4}vw`, `${p.x}vw`],
            opacity: [0, 0.75, 0.75, 0],
            rotate: [0, 180, 270, 360],
          }}
          transition={{
            y: { duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'linear' },
            x: { duration: p.duration / 3, repeat: Infinity, ease: 'easeInOut' },
            opacity: { duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'linear' },
            rotate: { duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'linear' },
          }}
          style={{
            position: 'absolute',
            fontSize: `${p.size}px`,
            fontFamily: 'monospace',
            fontWeight: 'bold',
          }}
          className={`${p.color} tracking-widest`}
        >
          {p.symbol}
        </motion.div>
      ))}

      {/* Animated Glowing Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
};
