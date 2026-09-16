import { ScrollReveal } from '../ScrollReveal';
import { Award, Trophy, Code2, GraduationCap, Cloud, Cpu, CheckCircle2 } from 'lucide-react';

const achievements = [
  {
    title: 'Java Foundations Certification',
    issuer: 'Oracle (2026)',
    detail: 'Official Oracle certification validating core Java programming principles and foundations.',
    icon: Award,
    color: 'from-red-500/10 to-orange-500/10 text-red-500',
  },
  {
    title: 'Summer Training Certification',
    issuer: 'HCL GUVI (2026)',
    detail: 'Summer training program certification covering software development practices.',
    icon: GraduationCap,
    color: 'from-blue-500/10 to-indigo-500/10 text-blue-500',
  },
  {
    title: 'Java Bootcamp Certification',
    issuer: 'LetsUpgrade (2025)',
    detail: 'Intensive Java Bootcamp covering core and advanced Java development concepts.',
    icon: Code2,
    color: 'from-emerald-500/10 to-teal-500/10 text-emerald-500',
  },
  {
    title: '160 Days DSA Certification',
    issuer: 'GeeksforGeeks (2025)',
    detail: '160 days rigorous Data Structures & Algorithms training, solving 250+ DSA problems.',
    icon: Trophy,
    color: 'from-amber-500/10 to-yellow-500/10 text-amber-500',
  },
  {
    title: 'Drone Technology Bootcamp Certification',
    issuer: 'IIT Mandi (2025)',
    detail: 'Bootcamp certification on Drone Technology and hardware-software integration.',
    icon: Cpu,
    color: 'from-purple-500/10 to-pink-500/10 text-purple-500',
  },
  {
    title: 'Problem Solving Certification',
    issuer: 'HackerRank (2025)',
    detail: 'Certified in algorithmic problem-solving and logic implementation on HackerRank.',
    icon: CheckCircle2,
    color: 'from-cyan-500/10 to-blue-500/10 text-cyan-500',
  },
  {
    title: 'Choose the Right Azure Service for Deploying Java Applications',
    issuer: 'Microsoft Learn (2026)',
    detail: 'Microsoft certification covering Java application deployment architectures on Microsoft Azure.',
    icon: Cloud,
    color: 'from-sky-500/10 to-blue-600/10 text-sky-400',
  },
];

export const Achievements = () => {
  return (
    <section id="achievements" className="py-24 md:py-32 relative bg-secondary/20">
      <div className="container px-6">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold">Achievements & Certifications</h2>
              <p className="text-muted-foreground mt-1">Industry certifications, bootcamps, and technical credentials</p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.08}>
              <div className="h-full p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all duration-300 shadow-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center border border-border`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">
                      {item.issuer}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-2 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.detail}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
