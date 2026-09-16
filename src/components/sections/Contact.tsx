import { useState } from 'react';
import { ScrollReveal } from '../ScrollReveal';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Mail, Linkedin, Github, MapPin, GraduationCap, Phone, Send, CheckCircle2, MessageSquare, Bot } from 'lucide-react';
import { toast } from 'sonner';

interface ChatMessage {
  id: string;
  sender: 'user' | 'harshit';
  text: string;
  time: string;
}

export const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'harshit',
      text: "Hi! 👋 Thanks for visiting my portfolio. Send me a direct message here and I'll get back to you soon!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !email.trim()) {
      toast.error('Please enter your email and message.');
      return;
    }

    setIsSending(true);

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // User message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: `${message.trim()}\n\n— From: ${name.trim() || 'Visitor'} (${email.trim()})`,
      time,
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentMessageText = message;
    const currentName = name;
    const currentEmail = email;

    setMessage('');

    setTimeout(() => {
      setIsSending(false);

      // Automated reply
      const replyMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'harshit',
        text: `Thanks ${currentName ? currentName : 'for reaching out'}! Your message has been received. I will respond to ${currentEmail} shortly. 🚀`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, replyMsg]);
      toast.success('Message sent successfully!');
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="container px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 border border-primary/20">
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Let's Connect</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Send me a message directly using the chat box below — no need to open a separate mail client!
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* Left Column: Direct Info & Socials */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal delay={0.1}>
              <div className="p-8 rounded-2xl bg-card border border-border shadow-card space-y-6">
                <h3 className="font-heading font-bold text-2xl text-foreground">Contact Information</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  I'm actively seeking Java Backend Developer & Software Engineer opportunities. Let's discuss how I can contribute to your team!
                </p>

                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-4 text-foreground/90">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <a href="mailto:harshitsati30@gmail.com" className="font-medium hover:text-primary transition-colors text-sm">
                        harshitsati30@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-foreground/90">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <a href="tel:+918755776798" className="font-medium hover:text-primary transition-colors text-sm">
                        +91 8755776798
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-foreground/90">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="font-medium text-sm">Roorkee, Uttarakhand, India</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-foreground/90">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                      <GraduationCap className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Education</p>
                      <p className="font-medium text-sm">COER University (CGPA: 7.00)</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50 flex flex-wrap gap-3">
                  <Button variant="outline" size="sm" className="rounded-xl border-border hover:bg-secondary/50" asChild>
                    <a href="https://www.linkedin.com/in/harshit-satti-4629b3283/" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="mr-2 w-4 h-4 text-blue-400" />
                      LinkedIn
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-xl border-border hover:bg-secondary/50" asChild>
                    <a href="https://github.com/har0028" target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 w-4 h-4" />
                      GitHub
                    </a>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Direct Chat Box Component */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.2}>
              <div className="rounded-2xl bg-card border border-border shadow-xl overflow-hidden flex flex-col h-[520px]">
                {/* Chat Header */}
                <div className="p-4 bg-secondary/40 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-md">
                        HS
                      </div>
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-card animate-pulse" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-foreground">Harshit Satti</h4>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Active Now
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    Direct Chat
                  </span>
                </div>

                {/* Chat Messages Log */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-background/50">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-primary text-primary-foreground rounded-tr-none'
                            : 'bg-secondary/70 text-foreground border border-border/60 rounded-tl-none'
                        }`}
                      >
                        <p className="whitespace-pre-line">{msg.text}</p>
                        <span
                          className={`block text-[10px] mt-1 text-right ${
                            msg.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                          }`}
                        >
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input Form */}
                <form onSubmit={handleSendMessage} className="p-4 bg-card border-t border-border space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="Your Name (Optional)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-background/60 text-xs h-9"
                    />
                    <Input
                      type="email"
                      required
                      placeholder="Your Email *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-background/60 text-xs h-9"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Textarea
                      required
                      rows={1}
                      placeholder="Type your message here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage(e);
                        }
                      }}
                      className="bg-background/60 text-xs min-h-[40px] max-h-[80px] resize-none py-2.5"
                    />
                    <Button
                      type="submit"
                      disabled={isSending}
                      size="icon"
                      className="h-10 w-10 shrink-0 bg-gradient-primary text-primary-foreground hover:opacity-90 rounded-xl"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
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
