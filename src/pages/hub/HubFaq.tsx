import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { hubFaqs } from '@/data/memberHub';
import { MessageSquare, Package, MapPin } from 'lucide-react';

export default function HubFaq() {
  return (
    <div className="animate-fade-in">
      <section className="bg-gradient-hero py-12">
        <div className="container max-w-3xl text-center space-y-4">
          <h1 className="text-display-sm font-bold">FAQ & Support</h1>
          <p className="text-muted-foreground">
            Everything you need to know about the Member Hub.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-3xl space-y-12">
          {/* FAQ */}
          <Accordion type="multiple" className="space-y-2">
            {hubFaqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border rounded-lg px-4">
                <AccordionTrigger className="text-left font-medium">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Support */}
          <div className="border-t border-border pt-12 space-y-8">
            <h2 className="text-xl font-semibold">Need help?</h2>

            <div className="grid sm:grid-cols-3 gap-4">
              <Card className="card-hover cursor-pointer">
                <CardContent className="p-6 text-center space-y-3">
                  <MessageSquare className="h-8 w-8 mx-auto text-secondary" />
                  <h3 className="font-semibold text-sm">Contact us</h3>
                  <p className="text-xs text-muted-foreground">General questions or feedback</p>
                </CardContent>
              </Card>
              <Card className="card-hover cursor-pointer">
                <CardContent className="p-6 text-center space-y-3">
                  <Package className="h-8 w-8 mx-auto text-secondary" />
                  <h3 className="font-semibold text-sm">Suggest a supplier</h3>
                  <p className="text-xs text-muted-foreground">Know a great supplier? Let us know</p>
                </CardContent>
              </Card>
              <Card className="card-hover cursor-pointer">
                <CardContent className="p-6 text-center space-y-3">
                  <MapPin className="h-8 w-8 mx-auto text-secondary" />
                  <h3 className="font-semibold text-sm">Request in my region</h3>
                  <p className="text-xs text-muted-foreground">Want a group buy in your area?</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Send us a message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Your email" type="email" />
                <Input placeholder="Subject" />
                <Textarea placeholder="How can we help?" rows={4} />
                <Button>Send message</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
