import { ScrollReveal } from '../ScrollReveal';
import { TiltCard } from '../TiltCard';
import { Code2, Database, Cpu, Wrench, Languages, Network } from 'lucide-react';

const skillCategories = [
  {
    title: 'Languages',
    icon: Languages,
    skills: ['Core Java', 'Advanced Java', 'SQL'],
    color: 'from-rose-500/20 to-red-500/20',
  },
  {
    title: 'Backend Frameworks',
    icon: Code2,
    skills: ['Spring Boot', 'Spring MVC', 'Hibernate ORM', 'Servlets', 'JSP', 'J2EE'],
    color: 'from-blue-500/20 to-indigo-500/20',
  },
  {
    title: 'Database',
    icon: Database,
    skills: ['MySQL', 'Schema Design', 'SQL Queries', 'JDBC'],
    color: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    title: 'Core Concepts',
    icon: Cpu,
    skills: [
      'Data Structures & Algorithms (DSA)',
      'Object-Oriented Programming (OOP)',
      'MVC Architecture',
      'Exception Handling',
      'Multithreading',
    ],
    color: 'from-purple-500/20 to-pink-500/20',
  },
  {
    title: 'Tools',
    icon: Wrench,
    skills: ['Git', 'GitHub', 'IntelliJ IDEA', 'VS Code', 'Eclipse', 'Postman'],
    color: 'from-orange-500/20 to-amber-500/20',
  },
  {
    title: 'API Development',
    icon: Network,
    skills: ['REST APIs', 'RESTful Web Services', 'Postman'],
    color: 'from-cyan-500/20 to-blue-500/20',
  },
];

export const Skills = () => {
  return (
    <section id="skills" className="py-24 md:py-32 relative bg-secondary/20">
      <div className="container px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Skills & Technologies</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              My technical toolkit focused on backend development and system design
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1000">
          {skillCategories.map((category, index) => (
            <ScrollReveal key={category.title} delay={index * 0.1}>
              <TiltCard className="h-full">
                <div className={`h-full p-6 rounded-xl bg-gradient-to-br ${category.color} border border-border bg-card shadow-card transition-shadow duration-300 hover:shadow-card-hover`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-full text-sm bg-background/50 text-foreground border border-border"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
