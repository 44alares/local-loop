import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, Send, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ROLES = ['Maker', 'Designer', 'Buyer'] as const;

export default function Contact() {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [zip, setZip] = useState('');
  const [roles, setRoles] = useState<string[]>([]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const toggleRole = (role: string) => {
    setRoles(prev => prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Please enter your name.';
    if (!country.trim()) e.country = 'Please enter your country.';
    if (!zip.trim()) e.zip = 'Please enter your ZIP / postal code.';
    if (roles.length === 0) e.roles = 'Please select at least one role.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const bodyContent = `Name: ${name}\nCountry: ${country}\nZIP / Postal code: ${zip}\nRoles: ${roles.join(', ')}\n${subject ? `Subject: ${subject}\n` : ''}${message ? `\nMessage:\n${message}` : ''}`;
    const mailtoLink = `mailto:hello@makehug.com?subject=${encodeURIComponent(subject || 'New Contact Form Submission')}&body=${encodeURIComponent(bodyContent)}`;

    window.location.href = mailtoLink;

    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Layout>
        <div className="container py-20">
          <div className="max-w-lg mx-auto text-center">
            <div className="h-20 w-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-secondary" />
            </div>
            <h1 className="text-display-sm font-bold mb-4">Message Sent!</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Your email client should have opened with your message. If not, please send an email directly to hello@makehug.com
            </p>
            <Button variant="hero" onClick={() => setSubmitted(false)}>
              Send Another Message
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-hero py-16 md:py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
              <Mail className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">Get in Touch</span>
            </div>
            <h1 className="text-display font-bold mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground">
              Have a question or want to learn more about MakeHug? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="container py-12 md:py-16">
        <div className="max-w-xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name <span className="text-destructive">*</span></Label>
                  <Input id="name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
                  {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country <span className="text-destructive">*</span></Label>
                    <Input id="country" placeholder="e.g., Spain" value={country} onChange={(e) => setCountry(e.target.value)} />
                    {errors.country && <p className="text-sm text-destructive">{errors.country}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP / Postal code <span className="text-destructive">*</span></Label>
                    <Input id="zip" placeholder="e.g., 28001" value={zip} onChange={(e) => setZip(e.target.value)} />
                    {errors.zip && <p className="text-sm text-destructive">{errors.zip}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Role <span className="text-destructive">*</span></Label>
                  <div className="flex flex-wrap items-center gap-4">
                    {ROLES.map((role) => (
                      <label key={role} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox checked={roles.includes(role)} onCheckedChange={() => toggleRole(role)} />
                        <span className="text-sm font-medium">{role}</span>
                      </label>
                    ))}
                  </div>
                  {errors.roles && <p className="text-sm text-destructive">{errors.roles}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="What is this about?" value={subject} onChange={(e) => setSubject(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Your message..." rows={5} value={message} onChange={(e) => setMessage(e.target.value)} />
                </div>

                <Button type="submit" variant="hero" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
