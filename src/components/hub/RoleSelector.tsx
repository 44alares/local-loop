import { MemberRole, roleLabels } from '@/data/memberHub';
import { cn } from '@/lib/utils';
import { Wrench, Palette, ShoppingBag } from 'lucide-react';

const icons: Record<MemberRole, React.ReactNode> = {
  maker: <Wrench className="h-4 w-4" />,
  designer: <Palette className="h-4 w-4" />,
  buyer: <ShoppingBag className="h-4 w-4" />,
};

interface RoleSelectorProps {
  value: MemberRole | null;
  onChange: (role: MemberRole) => void;
}

export function RoleSelector({ value, onChange }: RoleSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground mr-1">I am a:</span>
      {(Object.keys(roleLabels) as MemberRole[]).map((role) => (
        <button
          key={role}
          onClick={() => onChange(role)}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
            value === role
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
          )}
        >
          {icons[role]}
          {roleLabels[role]}
        </button>
      ))}
    </div>
  );
}
