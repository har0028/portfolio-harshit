import { ScrollReveal } from '../ScrollReveal';
import { User, Target, Rocket, GraduationCap } from 'lucide-react';

export const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="container px-6">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold">About Me</h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal delay={0.1}>
            <div className="space-y-6 bg-slate-950/85 backdrop-blur-md p-7 rounded-2xl border border-slate-800/80 shadow-2xl">
              <p className="text-lg text-foreground/90 leading-relaxed">
                I'm <span className="text-foreground font-semibold">Harshit Satti</span>, a Java backend developer 
                pursuing B.Tech in Computer Science & Engineering at <span className="text-sky-400 font-medium">COER University</span> (2023–2027) in Roorkee, Uttarakhand with a CGPA of 7.00.
              </p>
              <p className="text-lg text-foreground/90 leading-relaxed">
                I have hands-on internship and project experience building full-stack web applications using{' '}
                <span className="text-sky-400 font-medium">Java, Spring Boot, Spring MVC, JDBC, Hibernate, and REST APIs</span>, backed by optimized MySQL database schemas applying normalization and indexing principles.
              </p>
              <p className="text-lg text-foreground/90 leading-relaxed">
                With <span className="text-emerald-400 font-medium">250+ DSA problems solved</span> on LeetCode and GeeksforGeeks, a strong foundation in OOP and MVC architecture, and AI-assisted development workflow, I'm eager to contribute as a Java Developer.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="grid gap-4">
              <div className="p-6 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-slate-800/90 shadow-2xl hover:border-sky-500/30 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                    <GraduationCap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-1 text-foreground">Education</h3>
                    <p className="text-foreground font-medium">COER University</p>
                    <p className="text-sm text-muted-foreground">B.Tech in CS & Engineering | CGPA: 7.00 | 2023 – 2027</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-slate-800/90 shadow-2xl hover:border-sky-500/30 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-1 text-foreground">My Focus</h3>
                    <p className="text-foreground/90">
                      Java backend development, RESTful APIs, database schema optimization, and role-based authentication systems.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-slate-800/90 shadow-2xl hover:border-sky-500/30 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                    <Rocket className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-1 text-foreground">My Goal</h3>
                    <p className="text-foreground/90">
                      Eager to contribute as a Java Developer to build scalable, high-performance backend systems.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
