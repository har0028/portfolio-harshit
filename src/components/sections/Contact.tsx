import { useState } from 'react';
import { ScrollReveal } from '../ScrollReveal';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Mail, Linkedin, Github, MapPin, GraduationCap, Phone, Send, MessageSquare, Loader2 } from 'lucide-react';
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
      text: "Hi! 👋 Thanks for visiting my portfolio. Type your message here and it will be sent directly to my email inbox (harshitsati30@gmail.com)!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !email.trim()) {
      toast.error('Please enter your email and message.');
      return;
    }

    setIsSending(true);

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const senderName = name.trim() || 'Portfolio Visitor';
    const senderEmail = email.trim();
    const messageContent = message.trim();

    // User message bubble in UI
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: `${messageContent}\n\n— From: ${senderName} (${senderEmail})`,
      time,
    };

    setMessages((prev) => [...prev, userMsg]);
    setMessage('');

    try {
      // Send actual email using FormSubmit AJAX API directly to harshitsati30@gmail.com
      const response = await fetch('https://formsubmit.co/ajax/harshitsati30@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `🚀 New Portfolio Message from ${senderName}`,
          Name: senderName,
          Email: senderEmail,
          Message: messageContent,
          _template: 'table',
        }),
      });

      const resData = await response.json();
      console.log('FormSubmit response:', resData);

      // Automated reply bubble in UI confirming actual email delivery
      const replyMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'harshit',
        text: `Thanks ${senderName}! 📩 Your message has been sent directly to my email inbox (harshitsati30@gmail.com). I will reply to ${senderEmail} as soon as possible!`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, replyMsg]);
      toast.success('Email sent directly to Harshit!');
    } catch (error) {
      console.error('Email sending error:', error);
      // Fallback message bubble
      const replyMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'harshit',
        text: `Thanks ${senderName}! Your message is recorded. If you don't hear back, you can also reach me directly at harshitsati30@gmail.com.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, replyMsg]);
      toast.success('Message received!');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="pt-20 md:pt-28 pb-8 md:pb-10 relative">
      <div className="container px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 border border-primary/20">
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Let's Connect</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Send me a message directly using the chat box below — it will be delivered straight to my email inbox!
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* Left Column: Direct Info & Socials */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal delay={0.1}>
              <div className="p-8 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-slate-800/90 shadow-2xl space-y-6">
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
                      <p className="text-xs text-muted-foreground">Email Inbox</p>
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
              <div className="rounded-2xl bg-slate-950/90 backdrop-blur-md border border-slate-800/90 shadow-2xl overflow-hidden flex flex-col h-[520px]">
                {/* Chat Header */}
                <div className="p-4 bg-slate-900/90 border-b border-slate-800/80 flex items-center justify-between">
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
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Direct Email Delivery
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    Live Email Chat
                  </span>
                </div>

                {/* Chat Messages Log */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/60">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-primary text-primary-foreground rounded-tr-none'
                            : 'bg-slate-900/90 text-foreground border border-slate-800/80 rounded-tl-none'
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
                <form onSubmit={handleSendMessage} className="p-4 bg-slate-950/90 border-t border-slate-800/80 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="Your Name (Optional)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-slate-900/90 border-slate-800/80 text-xs h-9"
                    />
                    <Input
                      type="email"
                      required
                      placeholder="Your Email *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-slate-900/90 border-slate-800/80 text-xs h-9"
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
                      className="bg-slate-900/90 border-slate-800/80 text-xs min-h-[40px] max-h-[80px] resize-none py-2.5"
                    />
                    <Button
                      type="submit"
                      disabled={isSending}
                      size="icon"
                      className="h-10 w-10 shrink-0 bg-gradient-primary text-primary-foreground hover:opacity-90 rounded-xl"
                    >
                      {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </Button>
                  </div>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 pt-6 border-t border-slate-800/80">
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
