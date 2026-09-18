import { ScrollReveal } from '../ScrollReveal';
import { Briefcase, Building2, Terminal, Trophy } from 'lucide-react';

const experiences = [
  {
    type: 'Internship',
    title: 'Java Backend Developer Intern',
    company: 'IncodeVision',
    period: 'April 2026 – June 2026',
    tech: ['Java', 'Spring Boot', 'REST APIs', 'MySQL', 'Git', 'GitHub'],
    bullets: [
      'Completed a 3-month internship as a Java Backend Developer, contributing to the development of scalable backend services using Java, Spring Boot, REST APIs, and MySQL.',
      'Worked on database integration, RESTful API implementation, bug fixing, and code optimization, collaborating with the team using Git and GitHub.',
      'Demonstrated strong problem-solving skills, professionalism, and consistently delivered quality work throughout the internship.',
    ],
    icon: Briefcase,
    badgeColor: 'bg-primary/10 text-primary border-primary/20',
  },
  {
    type: 'Virtual Experience',
    title: 'Software Engineering Virtual Experience',
    company: 'JPMorgan Chase & Co. (Forage)',
    period: 'July 2026',
    tech: ['Java', 'Spring Boot', 'Kafka', 'H2 Database', 'REST Controller'],
    bullets: [
      'Completed practical job-simulation tasks covering Project Setup, Kafka Integration, H2 Database Integration, REST API Integration, and REST API Controller development, gaining hands-on exposure to real-world backend engineering workflows.',
    ],
    icon: Terminal,
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
  {
    type: 'Hackathon',
    title: 'Internal Hackathon 6.0 (Smart India Hackathon 2025)',
    company: 'Department of AI & ML and Cyber Security, COER University',
    period: '30 August 2025',
    tech: ['Problem Solving', 'System Design', 'Hackathon'],
    bullets: [
      'Actively participated in the Internal SIH 6.0 Hackathon, collaborating on problem-solving and solution design under a competitive, time-bound hackathon environment.',
    ],
    icon: Trophy,
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
];

export const Experience = () => {
  return (
    <section id="experience" className="py-24 md:py-32 relative">
      <div className="container px-6">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold">Experience & Hackathons</h2>
              <p className="text-muted-foreground mt-1">Internship, virtual simulation, and competitive hackathons</p>
            </div>
          </div>
        </ScrollReveal>

        <div className="space-y-8 relative before:absolute before:inset-0 before:left-6 md:before:left-1/2 before:w-0.5 before:-translate-x-1/2 before:bg-border/60">
          {experiences.map((exp, index) => (
            <ScrollReveal key={exp.title} delay={index * 0.1}>
              <div className="relative flex flex-col md:flex-row items-start group">
                {/* Timeline Dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10 shadow-lg group-hover:scale-110 transition-transform">
                  <exp.icon className="w-4 h-4 text-primary" />
                </div>

                {/* Card */}
                <div className={`w-full md:w-[calc(50%-2.5rem)] pl-16 md:pl-0 ${
                  index % 2 === 0 ? 'md:mr-auto md:text-right' : 'md:ml-auto md:text-left'
                }`}>
                  <div className="p-6 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-slate-800/90 shadow-2xl hover:border-primary/40 transition-all duration-300">
                    <div className={`flex flex-wrap items-center gap-2 mb-3 ${
                      index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                    }`}>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${exp.badgeColor}`}>
                        {exp.type}
                      </span>
                      <span className="text-xs text-muted-foreground font-mono">
                        {exp.period}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-xl text-foreground mb-1">
                      {exp.title}
                    </h3>
                    <p className="text-sm font-medium text-primary mb-4">
                      {exp.company}
                    </p>

                    <ul className={`space-y-2 mb-4 text-sm text-muted-foreground leading-relaxed text-left`}>
                      {exp.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary font-bold mt-1">&bull;</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className={`flex flex-wrap gap-1.5 pt-3 border-t border-border/50 ${
                      index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                    }`}>
                      {exp.tech.map((t) => (
                        <span key={t} className="px-2.5 py-0.5 rounded text-xs bg-secondary text-secondary-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
