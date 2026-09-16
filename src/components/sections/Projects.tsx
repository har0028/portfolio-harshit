import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '../ScrollReveal';
import { TiltCard } from '../TiltCard';
import { Folder, ChevronRight, X, Briefcase, GraduationCap, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'SmartJobPortal with AI-Based Recommendation Engine',
    description: 'Full-stack job portal application with AI-based job recommendations, role-based access, and workflows for candidates and recruiters.',
    details: '• Developed a full-stack job portal application using Spring Boot, React, MySQL, and REST APIs, supporting separate workflows for job seekers and recruiters.\n• Designed and implemented the backend architecture, including RESTful APIs for user management, recruiter management, and job postings.\n• Implemented role-based authentication and authorization to securely separate candidate, recruiter, and admin access.\n• Built a job recommendation feature matching candidates to relevant postings, backed by an optimized MySQL schema for efficient data storage and retrieval.',
    tech: ['SpringBoot', 'React', 'MySQL', 'REST APIs', 'Git', 'GitHub'],
    focus: 'Role-based authentication & authorization, AI recommendation engine, MySQL schema optimization',
    icon: Briefcase,
    liveUrl: 'https://smart-job-portal-web.onrender.com',
  },
  {
    title: 'AI-Powered Secure Online Examination System',
    description: 'Secure online examination system with role-based dashboard controls, exam management, and AI-based proctoring integration.',
    details: '• Built an online examination system from scratch using Java, Servlets, JSP, JDBC, and MySQL, supporting both student and admin roles.\n• Implemented role-based authentication to give students and administrators access to distinct features and dashboards, with exam management covering question delivery, submission, and automated result generation.\n• Added AI-based proctoring and anti-cheating checks to strengthen exam integrity during remote assessments, with the database schema designed in MySQL.',
    tech: ['Java', 'Servlets', 'JSP', 'JDBC', 'MySQL'],
    focus: 'Role-based authorization, AI proctoring algorithms, automated result generation',
    icon: GraduationCap,
    liveUrl: 'https://ai-secure-exam-system.onrender.com/',
  },
];

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="container px-6">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Folder className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold">Featured Projects</h2>
              <p className="text-muted-foreground mt-1">Full-stack & backend projects from my resume</p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 perspective-1000">
          {projects.map((project, index) => (
            <ScrollReveal key={project.title} delay={index * 0.15}>
              <TiltCard className="h-full">
                <div
                  onClick={() => setSelectedProject(project)}
                  className="h-full w-full text-left p-8 rounded-2xl bg-gradient-to-b from-card to-card/50 border border-border shadow-lg hover:shadow-primary/10 hover:border-primary/50 group relative overflow-hidden transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  {/* Background glowing effect */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-500" />

                  <div>
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                          <project.icon className="w-6 h-6 text-primary" />
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 tracking-wider uppercase">
                          Featured Project
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all shadow-sm hover:scale-105 z-10"
                            title="Open Live Demo"
                          >
                            <span>Live Site</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>

                    <h3 className="font-heading font-bold text-xl md:text-2xl mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground text-sm md:text-base mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="mb-6 p-4 rounded-xl bg-secondary/40 border border-border/50">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">Key Focus</span>
                      <p className="text-sm text-foreground/90 font-medium">{project.focus}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-border/40">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-primary/5 text-primary border border-primary/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                      >
                        Live Link <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg p-6 rounded-2xl bg-card border border-border shadow-xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <selectedProject.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-xl">{selectedProject.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-muted-foreground mb-4 whitespace-pre-line leading-relaxed text-sm">{selectedProject.details}</p>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-foreground mb-2">Key Learning</h4>
                <p className="text-sm text-primary font-medium">{selectedProject.focus}</p>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-foreground mb-2">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 rounded-full text-sm bg-primary/10 text-primary border border-primary/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {selectedProject.liveUrl && (
                <div className="mt-6 pt-4 border-t border-border flex justify-end">
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all shadow-md hover:shadow-primary/25"
                  >
                    <span>Visit Live Website</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
