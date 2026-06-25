import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  Mail,
  ExternalLink,
  Download,
  Eye,
} from 'lucide-react';
import { TypeWriter } from '../TypeWriter';
import { Button } from '@/components/ui/button';
import { VfxBackground } from '../VfxBackground';

export const Hero = () => {
  const [showRole, setShowRole] = useState(false);
  const [showContent, setShowContent] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-hero" />

      {/* VFX Floating elements and animated grids */}
      <VfxBackground />

      <div className="container relative z-10 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Open to work badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                       bg-secondary/40 backdrop-blur border border-border
                       text-sm text-foreground/80 mx-auto"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Open to Backend Developer Roles
          </motion.div>

          {/* Name with typing animation */}
<h1 className="
  text-4xl
  leading-tight
  sm:text-5xl
  md:text-6xl
  lg:text-7xl
  font-heading
  font-bold
  text-balance
">            <TypeWriter
              text="Hi, I'm Harshit Satti"
              delay={120}
              onComplete={() => {
                setTimeout(() => setShowRole(true), 400);
                setTimeout(() => setShowContent(true), 800);
              }}
            />
          </h1>

          {/* Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={showRole ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xl sm:text-2xl md:text-3xl font-heading text-primary font-medium">
              Java Backend Developer
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
 <p className="max-w-[90%] mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
  <span className="block">
    Backend engineer specializing in
    <span className="text-foreground font-semibold">
      {' '}Java
    </span>{' '}
    and
    <span className="text-foreground font-semibold">
      {' '}Spring Boot
    </span>.
  </span>

  <span className="block mt-2 text-foreground/80">
    I build
    <span className="text-foreground font-medium">
      {' '}scalable, production-ready systems
    </span>
    {' '}with clean architecture.
  </span>
</p>




          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 pt-4"
          >
            {/* View Projects */}
            <Button
              size="lg"
              className="group bg-gradient-primary hover:opacity-90 text-primary-foreground px-8 py-6 text-base font-medium"
              asChild
            >
              <a href="#projects">
                View Projects
                <ExternalLink className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>

            {/* Contact Me */}
            <Button
              variant="outline"
              size="lg"
              className="border-border hover:bg-secondary/50 px-8 py-6 text-base"
              asChild
            >
              <a href="#contact">
                <Mail className="mr-2 w-4 h-4" />
                Contact Me
              </a>
            </Button>

            {/* View Resume */}
            <Button
              variant="secondary"
              size="lg"
              className="px-8 py-6 text-base"
              asChild
            >
              <a href="/Harshit_Satti_Resume2026.pdf" target="_blank" rel="noopener noreferrer">
                <Eye className="mr-2 w-4 h-4" />
                View Resume
              </a>
            </Button>

            {/* Download Resume */}
            <Button
              variant="secondary"
              size="lg"
              className="px-8 py-6 text-base"
              asChild
            >
              <a href="/Harshit_Satti_Resume2026.pdf" download="Harshit_Satti_Resume.pdf">
                <Download className="mr-2 w-4 h-4" />
                Download Resume
              </a>
            </Button>
          </motion.div>
        </motion.div>

      {/* Scroll Indicator */}
<motion.div
  initial={{ opacity: 0 }}
  animate={showContent ? { opacity: 1 } : {}}
  transition={{ delay: 0.8 }}
  className="flex justify-center pt-10"
>
  <motion.div
    animate={{ y: [0, 8, 0] }}
    transition={{ duration: 2, repeat: Infinity }}
  >
    <ArrowDown className="w-6 h-6 text-muted-foreground" />
  </motion.div>
</motion.div>

      </div>
    </section>
  );
};
