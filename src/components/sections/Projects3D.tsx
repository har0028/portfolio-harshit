import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '../ScrollReveal';
import { TiltCard } from '../TiltCard';
import {
  Folder,
  ChevronRight,
  X,
  Briefcase,
  GraduationCap,
  ExternalLink,
  Server,
  Database,
  Code2,
} from 'lucide-react';

interface Project {
  title: string;
  description: string;
  details: string;
  tech: string[];
  category: string;
  focus: string;
  icon: React.ComponentType<{ className?: string }>;
  liveUrl?: string;
}

const majorProjects: Project[] = [
  {
    title: 'Smart Job Portal with AI-Based Recommendation Engine',
    description:
      'Full-stack job portal application with AI-based job recommendations, role-based access, and workflows for candidates and recruiters.',
    details:
      '• Developed a full-stack job portal application using Spring Boot, React, MySQL, and REST APIs, supporting separate workflows for job seekers and recruiters.\n• Designed and implemented the backend architecture, including RESTful APIs for user management, recruiter management, and job postings.\n• Implemented role-based authentication and authorization to securely separate candidate, recruiter, and admin access.\n• Built a job recommendation feature that matches candidates to relevant postings, improving discovery of suitable jobs.\n• Integrated a MySQL database with optimized schema design for efficient storage and retrieval of user, job, and application data.',
    tech: ['Spring Boot', 'React', 'MySQL', 'REST API', 'Git', 'GitHub'],
    category: 'Full-Stack • AI',
    focus: 'Role-based authentication & authorization, recommendation system, schema design',
    icon: Briefcase,
    liveUrl: 'https://smart-job-portal-web.onrender.com',
  },
  {
    title: 'AI-Powered Secure Online Examination System',
    description:
      'Secure examination system with role-based dashboard controls, exam management, and AI-based proctoring integration.',
    details:
      '• Built an online examination system from scratch using Java, Servlets, JSP, JDBC, and MySQL, supporting both student and admin roles.\n• Implemented role-based authentication to give students and administrators access to distinct features and dashboards.\n• Developed exam management modules covering question delivery, submission handling, and automated result generation.\n• Added AI-based proctoring and anti-cheating checks to strengthen exam integrity during remote assessments, with the database schema designed in MySQL.',
    tech: ['Java', 'Servlets', 'JSP', 'JDBC', 'MySQL'],
    category: 'Java Backend • Security',
    focus: 'Role-based authorization, proctoring algorithms, schema design',
    icon: GraduationCap,
    liveUrl: 'https://ai-secure-exam-system.onrender.com/',
  },
];

const otherProjects: Project[] = [
  {
    title: 'Monthly Utility Bill Tracker',
    description:
      'Full-stack application to track and manage monthly utility bills with analytics.',
    details:
      'Built a comprehensive bill tracking system with Spring Boot backend handling REST APIs for CRUD operations, user authentication, and bill categorization. Frontend in React with responsive charts for expense visualization.',
    tech: ['Spring Boot', 'React', 'MySQL', 'REST API'],
    category: 'Full-Stack Backend',
    focus: 'Backend API design, JPA relationships, authentication flow',
    icon: Server,
  },
  {
    title: 'Smart Expense Analyzer',
    description:
      'Intelligent expense tracking with category-based analysis and insights.',
    details:
      'Developed backend logic for expense categorization, monthly summaries, and spending pattern analysis. Implemented RESTful endpoints for expense management with proper validation and error handling.',
    tech: ['Spring Boot', 'JPA', 'MySQL', 'REST API'],
    category: 'Financial Analytics',
    focus: 'Business logic implementation, data aggregation queries',
    icon: Database,
  },
  {
    title: 'Bank Account Management System',
    description:
      'Core banking operations including account management and transactions.',
    details:
      'Implemented fundamental banking operations: account creation, balance inquiries, deposits, withdrawals, and transaction history. Focus on transaction safety and data integrity.',
    tech: ['Java', 'SQL', 'JDBC'],
    category: 'Banking Backend',
    focus: 'Transaction management, data integrity, SQL operations',
    icon: Server,
  },
  {
    title: 'Smart Task Manager',
    description:
      'Task management application with priority-based scheduling.',
    details:
      'Built a task management backend with features like task CRUD, priority levels, due date tracking, and status updates. RESTful API design following best practices.',
    tech: ['Spring Boot', 'JPA', 'MySQL'],
    category: 'Productivity Architecture',
    focus: 'REST API design, entity relationships',
    icon: Code2,
  },
  {
    title: 'Employee Payroll System',
    description:
      'Comprehensive payroll management for employee salaries and records.',
    details:
      'Developed complete payroll system handling employee records, salary calculations, deductions, and payslip generation using Core and Advanced Java concepts.',
    tech: ['Core Java', 'Advanced Java', 'File I/O'],
    category: 'Enterprise Java',
    focus: 'OOP principles, file handling, business logic',
    icon: Database,
  },
  {
    title: 'Car Rental Management System',
    description:
      'Vehicle rental booking and fleet management system.',
    details:
      'Console-based application for managing car rentals, bookings, customer records, and availability tracking. Implemented with clean OOP design patterns.',
    tech: ['Core Java', 'OOP', 'Collections'],
    category: 'Java Systems',
    focus: 'Object-oriented design, data structures',
    icon: Code2,
  },
  {
    title: 'Typing Test Application',
    description:
      'Speed and accuracy testing application for typing skills.',
    details:
      'Built a typing test tool that measures WPM, accuracy, and provides performance analytics. Implemented timing logic and text comparison algorithms.',
    tech: ['Java', 'Swing', 'Event Handling'],
    category: 'Java GUI',
    focus: 'GUI development, event-driven programming',
    icon: Code2,
  },
];

export const Projects3D: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="container px-6">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <Folder className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold">Featured Projects</h2>
              <p className="text-muted-foreground mt-1">
                Selected projects showcasing my work in Java, backend development and AI.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Major Projects Section ── */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground">
              Major Projects
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8 perspective-1000">
            {majorProjects.map((project, index) => (
              <ScrollReveal key={project.title} delay={index * 0.15}>
                <TiltCard className="h-full">
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="h-full w-full text-left p-8 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-slate-800/90 shadow-2xl hover:shadow-primary/20 hover:border-primary/50 group relative overflow-hidden transition-all duration-500 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
                  >
                    {/* Glowing subtle blob */}
                    <div className="absolute top-0 right-0 w-36 h-36 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/25 transition-colors duration-500" />

                    <div>
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex flex-wrap items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner">
                            <project.icon className="w-6 h-6 text-primary" />
                          </div>
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 tracking-wider uppercase">
                            {project.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all shadow-md hover:scale-105 z-10"
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

                      <div className="mb-6 p-4 rounded-xl bg-slate-900/90 border border-slate-800/80 backdrop-blur-sm">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                          Key Focus
                        </span>
                        <p className="text-sm text-foreground/90 font-medium">{project.focus}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-slate-800/80">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1 rounded-full text-xs font-medium bg-slate-900/90 text-foreground border border-slate-700/60"
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

        {/* ── Other Backend & Full-Stack Projects ── */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground">
              Other Backend & Engineering Projects
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1000">
            {otherProjects.map((project, index) => (
              <ScrollReveal key={project.title} delay={index * 0.08}>
                <TiltCard className="h-full">
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="h-full w-full text-left p-6 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-slate-800/90 shadow-2xl hover:shadow-primary/10 hover:border-primary/40 group relative overflow-hidden transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
                  >
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                            <project.icon className="w-5 h-5 text-primary" />
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-900/90 text-sky-400 border border-slate-700/60">
                            {project.category}
                          </span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>

                      <h4 className="font-heading font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h4>

                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-900/90 text-foreground border border-slate-700/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── Project Details Modal ── */}
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
              className="w-full max-w-lg p-6 rounded-2xl bg-slate-950/95 border border-slate-800/90 shadow-2xl backdrop-blur-md max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <selectedProject.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-sky-400 block mb-0.5">
                      {selectedProject.category}
                    </span>
                    <h3 className="font-heading font-bold text-xl text-foreground">
                      {selectedProject.title}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-lg hover:bg-slate-900 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-muted-foreground mb-4 whitespace-pre-line leading-relaxed text-sm">
                {selectedProject.details}
              </p>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-foreground mb-1.5">Key Focus / Architecture</h4>
                <p className="text-sm text-sky-400 font-medium">{selectedProject.focus}</p>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-foreground mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-slate-900 text-foreground border border-slate-700/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {selectedProject.liveUrl && (
                <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
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
