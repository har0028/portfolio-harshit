import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '../ScrollReveal';
import { TiltCard } from '../TiltCard';
import { Folder, ChevronRight, X, Server, Database, Code, Briefcase, GraduationCap } from 'lucide-react';

const projects = [
  {
    title: 'Smart Job Portal with AI-Based Recommendation Engine',
    description: 'Full-stack job portal application with AI-based job recommendations, role-based access, and workflows for candidates and recruiters.',
    details: '• Developed a full-stack job portal application using Spring Boot, React, MySQL, and REST APIs, supporting separate workflows for job seekers and recruiters.\n• Designed and implemented the backend architecture, including RESTful APIs for user management, recruiter management, and job postings.\n• Implemented role-based authentication and authorization to securely separate candidate, recruiter, and admin access.\n• Built a job recommendation feature that matches candidates to relevant postings, improving discovery of suitable jobs.\n• Integrated a MySQL database with optimized schema design for efficient storage and retrieval of user, job, and application data.',
    tech: ['Spring Boot', 'React', 'MySQL', 'REST API'],
    focus: 'Role-based authentication & authorization, recommendation system, schema design',
    icon: Briefcase,
  },
  {
    title: 'AI-Powered Secure Online Examination System',
    description: 'Secure examination system with role-based dashboard controls, exam management, and AI-based proctoring integration.',
    details: '• Built an online examination system from scratch using Java, Servlets, JSP, JDBC, and MySQL, supporting both student and admin roles.\n• Implemented role-based authentication to give students and administrators access to distinct features and dashboards.\n• Developed exam management modules covering question delivery, submission handling, and automated result generation.\n• Added AI-based proctoring and anti-cheating checks to strengthen exam integrity during remote assessments, with the database schema designed in MySQL.',
    tech: ['Java', 'Servlets', 'JSP', 'JDBC', 'MySQL'],
    focus: 'Role-based authorization, proctoring algorithms, schema design',
    icon: GraduationCap,
  },
  {
    title: 'Monthly Utility Bill Tracker',
    description: 'Full-stack application to track and manage monthly utility bills with analytics.',
    details: 'Built a comprehensive bill tracking system with Spring Boot backend handling REST APIs for CRUD operations, user authentication, and bill categorization. Frontend in React with responsive charts for expense visualization.',
    tech: ['Spring Boot', 'React', 'MySQL', 'REST API'],
    focus: 'Backend API design, JPA relationships, authentication flow',
    icon: Server,
  },
  {
    title: 'Smart Expense Analyzer',
    description: 'Intelligent expense tracking with category-based analysis and insights.',
    details: 'Developed backend logic for expense categorization, monthly summaries, and spending pattern analysis. Implemented RESTful endpoints for expense management with proper validation and error handling.',
    tech: ['Spring Boot', 'JPA', 'MySQL', 'REST API'],
    focus: 'Business logic implementation, data aggregation queries',
    icon: Database,
  },
  {
    title: 'Bank Account Management System',
    description: 'Core banking operations including account management and transactions.',
    details: 'Implemented fundamental banking operations: account creation, balance inquiries, deposits, withdrawals, and transaction history. Focus on transaction safety and data integrity.',
    tech: ['Java', 'SQL', 'JDBC'],
    focus: 'Transaction management, data integrity, SQL operations',
    icon: Server,
  },
  {
    title: 'Smart Task Manager',
    description: 'Task management application with priority-based scheduling.',
    details: 'Built a task management backend with features like task CRUD, priority levels, due date tracking, and status updates. RESTful API design following best practices.',
    tech: ['Spring Boot', 'JPA', 'MySQL'],
    focus: 'REST API design, entity relationships',
    icon: Code,
  },
  {
    title: 'Employee Payroll System',
    description: 'Comprehensive payroll management for employee salaries and records.',
    details: 'Developed complete payroll system handling employee records, salary calculations, deductions, and payslip generation using Core and Advanced Java concepts.',
    tech: ['Core Java', 'Advanced Java', 'File I/O'],
    focus: 'OOP principles, file handling, business logic',
    icon: Database,
  },
  {
    title: 'Car Rental Management System',
    description: 'Vehicle rental booking and fleet management system.',
    details: 'Console-based application for managing car rentals, bookings, customer records, and availability tracking. Implemented with clean OOP design patterns.',
    tech: ['Core Java', 'OOP', 'Collections'],
    focus: 'Object-oriented design, data structures',
    icon: Code,
  },
  {
    title: 'Typing Test Application',
    description: 'Speed and accuracy testing application for typing skills.',
    details: 'Built a typing test tool that measures WPM, accuracy, and provides performance analytics. Implemented timing logic and text comparison algorithms.',
    tech: ['Java', 'Swing', 'Event Handling'],
    focus: 'GUI development, event-driven programming',
    icon: Code,
  },
];

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const majorProjects = projects.slice(0, 2);
  const otherProjects = projects.slice(2);

  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="container px-6">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Folder className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold">Projects</h2>
              <p className="text-muted-foreground mt-1">Key highlights and minor applications I've built</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Major Projects Section */}
        <div className="mb-20">
          <h3 className="text-xl md:text-2xl font-heading font-semibold mb-8 flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            Major Projects
          </h3>
          <div className="grid md:grid-cols-2 gap-8 perspective-1000">
            {majorProjects.map((project, index) => (
              <ScrollReveal key={project.title} delay={index * 0.1}>
                <TiltCard className="h-full">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="h-full w-full text-left p-8 rounded-2xl bg-gradient-to-b from-card to-card/50 border border-border shadow-lg hover:shadow-primary/5 hover:border-primary/40 group relative overflow-hidden transition-all duration-300"
                  >
                    {/* Background subtle glowing blob */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />
                    
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                          <project.icon className="w-6 h-6 text-primary" />
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 tracking-wider uppercase">
                          Major Project
                        </span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
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

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-primary/5 text-primary border border-primary/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </button>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Other Projects Section */}
        <div>
          <h3 className="text-lg md:text-xl font-heading font-semibold mb-8 text-muted-foreground flex items-center gap-3">
            Other Backend Projects
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1000">
            {otherProjects.map((project, index) => (
              <ScrollReveal key={project.title} delay={index * 0.1}>
                <TiltCard className="h-full">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="h-full w-full text-left p-6 rounded-xl bg-card border border-border shadow-card transition-all duration-300 hover:shadow-card-hover hover:border-primary/30 group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <project.icon className="w-5 h-5 text-primary" />
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="px-2 py-1 rounded text-xs bg-secondary text-secondary-foreground"
                        >
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-2 py-1 rounded text-xs bg-secondary text-muted-foreground">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>
                  </button>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
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
              className="w-full max-w-lg p-6 rounded-2xl bg-card border border-border shadow-xl"
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
              
              <p className="text-muted-foreground mb-4 whitespace-pre-line">{selectedProject.details}</p>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-foreground mb-2">Key Learning</h4>
                <p className="text-sm text-primary">{selectedProject.focus}</p>
              </div>

              <div>
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
