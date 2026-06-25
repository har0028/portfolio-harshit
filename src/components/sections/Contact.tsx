import { ScrollReveal } from '../ScrollReveal';
import { Button } from '../ui/button';
import { Mail, Linkedin, Github, MapPin, GraduationCap } from 'lucide-react';

export const Contact = () => {
  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="container px-6">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Let's Connect</h2>
            <p className="text-muted-foreground text-lg mb-8">
              I'm actively looking for Backend Developer / Software Engineer opportunities.
              Let's discuss how I can contribute to your team.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-gradient-primary hover:opacity-90 text-primary-foreground px-8 py-6 text-base font-medium"
                asChild
              >
                <a href="mailto:harshitsati30@gmail.com">
                  <Mail className="mr-2 w-5 h-5" />
                  Send Email
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto border-border hover:bg-secondary/50 px-8 py-6 text-base"
                asChild
              >
                <a href="https://www.linkedin.com/in/harshit-satti-4629b3283/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 w-5 h-5" />
                  LinkedIn
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto border-border hover:bg-secondary/50 px-8 py-6 text-base"
                asChild
              >
                <a href="https://github.com/har0028" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 w-5 h-5" />
                  GitHub
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                <span>B.Tech CSE, COER University</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>India</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Footer */}
      <div className="mt-24 pt-8 border-t border-border">
        <div className="container px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>Designed & Developed by Harshit Satti
               <br />
               Java Backend Developer • © 2026</p>
            <p className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Open to opportunities
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
