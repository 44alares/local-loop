import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CirclePlus, MapPin, Leaf, RefreshCcw, Scale } from 'lucide-react';

const pillars = [
  {
    icon: MapPin,
    title: 'Local Economy',
    description: 'The majority of every purchase stays with the Maker in your community. We prioritize neighborhood prosperity over global logistics.',
    color: 'secondary',
  },
  {
    icon: Leaf,
    title: 'Zero-KM Logistics',
    description: 'Drastic reduction in carbon footprint by eliminating global shipping. Your product travels meters, not thousands of miles.',
    color: 'accent',
  },
  {
    icon: RefreshCcw,
    title: 'Circular Economy',
    description: 'Our dedicated "Repair Hub" fights planned obsolescence via 3D-printed spare parts. Extend the life of what you own.',
    color: 'secondary',
  },
  {
    icon: Scale,
    title: 'Fair Pay',
    description: 'Transparent fee structure protecting all stakeholders. You will see exact amounts before you pay.',
    color: 'accent',
  },
];

interface SocialPillarsModalProps {
  children?: React.ReactNode;
}

export function SocialPillarsModal({ children }: SocialPillarsModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button
            variant="ghost"
            size="icon"
            className="h-14 w-14 rounded-full border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all"
          >
            <CirclePlus className="h-6 w-6" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">
            Our 4 Social Pillars
          </DialogTitle>
          <p className="text-center text-muted-foreground">
            The ethical foundations that guide everything we do
          </p>
        </DialogHeader>
        
        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="p-5 rounded-xl bg-muted/50 border border-border hover:border-secondary/50 transition-colors"
            >
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl mb-4 ${
                pillar.color === 'secondary' 
                  ? 'bg-secondary/10 text-secondary' 
                  : 'bg-accent/10 text-accent'
              }`}>
                <pillar.icon className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">{pillar.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
