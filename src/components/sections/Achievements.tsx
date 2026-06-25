import { ScrollReveal } from '../ScrollReveal';
import { Award, Trophy, Code2, GraduationCap } from 'lucide-react';

const achievements = [
  {
    title: 'Data Structures & Algorithms',
    detail: 'Solved 250+ Data Structures and Algorithms problems on LeetCode and GeeksforGeeks.',
    icon: Trophy,
    color: 'from-amber-500/10 to-orange-500/10 text-amber-500',
  },
  {
    title: 'Java Certification',
    detail: 'Certified in Core & Advanced Java.',
    icon: Award,
    color: 'from-blue-500/10 to-indigo-500/10 text-blue-500',
  },
  {
    title: 'Java Bootcamp',
    detail: 'Completed Java Bootcamp by LetsUpgrade.',
    icon: GraduationCap,
    color: 'from-emerald-500/10 to-teal-500/10 text-emerald-500',
  },
  {
    title: 'Drone Technology Workshop',
    detail: 'Participated in a Drone Technology Workshop conducted by IIT Mandi.',
    icon: Code2,
    color: 'from-purple-500/10 to-pink-500/10 text-purple-500',
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
              <p className="text-muted-foreground mt-1">Milestones, bootcamps, and technical credentials</p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-6">
          {achievements.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.1}>
              <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 shadow-card flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 border border-border`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-1.5 text-foreground">{item.title}</h3>
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
