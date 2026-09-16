import React from 'react';
import { ScrollReveal } from '../ScrollReveal';
import { TiltCard } from '../TiltCard';
import { Code2, Database, Cpu, Wrench, Languages, Network, Bot, Sparkles } from 'lucide-react';

const skillCategories = [
  {
    title: 'Backend Engineering',
    icon: Code2,
    skills: ['Core Java', 'Advanced Java', 'Spring Boot', 'Spring MVC', 'Hibernate ORM', 'Servlets', 'JSP', 'J2EE'],
    color: 'from-blue-500/20 to-indigo-500/20',
  },
  {
    title: 'Database Architecture',
    icon: Database,
    skills: ['MySQL', 'JDBC', 'Schema Design', 'Normalization', 'Indexing Principles'],
    color: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    title: 'API & Integration',
    icon: Network,
    skills: ['REST APIs', 'RESTful Web Services', 'Postman', 'Kafka', 'H2 Database'],
    color: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    title: 'Frontend Development',
    icon: Languages,
    skills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Framer Motion'],
    color: 'from-purple-500/20 to-pink-500/20',
  },
  {
    title: 'AI & Machine Learning',
    icon: Bot,
    skills: ['AI Recommendation Engines', 'AI Proctoring Algorithms', 'AI Development Workflows'],
    color: 'from-amber-500/20 to-yellow-500/20',
  },
  {
    title: 'Developer Tools',
    icon: Wrench,
    skills: ['Git', 'GitHub', 'IntelliJ IDEA', 'VS Code', 'Eclipse', 'Postman'],
    color: 'from-orange-500/20 to-rose-500/20',
  },
];

export const Skills3D: React.FC = () => {
  return (
    <section id="skills" className="py-24 md:py-32 relative bg-secondary/20">
      <div className="container px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-mono mb-4">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              3D Interactive Skills Matrix
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Technical Stack & Capabilities</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Categorized technologies powering Harshit's backend architecture and full-stack systems
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1000">
          {skillCategories.map((category, index) => (
            <ScrollReveal key={category.title} delay={index * 0.1}>
              <TiltCard className="h-full">
                <div className={`h-full p-6 rounded-2xl bg-gradient-to-br ${category.color} border border-border bg-card shadow-xl transition-all duration-300 hover:shadow-primary/10 group`}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform">
                      <category.icon className="w-5.5 h-5.5 text-primary" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-foreground">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-full text-xs font-medium bg-background/60 text-foreground border border-border/80 shadow-sm backdrop-blur-sm"
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
