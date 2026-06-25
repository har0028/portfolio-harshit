import { ScrollReveal } from '../ScrollReveal';
import { User, Target, Rocket } from 'lucide-react';

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
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm <span className="text-foreground font-medium">Harshit Satti</span>, a backend-focused Java developer 
                currently pursuing B.Tech in Computer Science at COER University (2023–2027).
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                My passion lies in building <span className="text-foreground">scalable backend systems</span> using 
                Java, Spring Boot, REST APIs, JPA, and MySQL. I believe in clean code, logical structure, 
                and creating real-world impact rather than flashy claims.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                With <span className="text-primary font-medium">250+ DSA problems solved</span> and multiple 
                backend-driven applications under my belt, I'm actively seeking Backend Developer / 
                Software Engineer roles where I can contribute to robust system architectures.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="grid gap-4">
              <div className="p-6 rounded-xl bg-card border border-border shadow-card">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-2">My Focus</h3>
                    <p className="text-muted-foreground">
                      Backend development, system design, and building APIs that power real applications.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-card border border-border shadow-card">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Rocket className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-2">My Goal</h3>
                    <p className="text-muted-foreground">
                      Becoming a strong backend engineer who builds robust, maintainable systems at scale.
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
