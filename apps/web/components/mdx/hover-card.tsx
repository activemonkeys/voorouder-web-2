// apps/web/components/mdx/hover-card.tsx
import {
  HoverCardContent,
  HoverCardTrigger,
  HoverCard as UIHoverCard,
} from '@workspace/ui/components/shadcn/hover-card';
import {cn} from '@workspace/ui/lib/utils';

interface HoverCardProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function HoverCard({trigger, children, className}: HoverCardProps) {
  return (
    <div className={cn('inline-block', className)}>
      <UIHoverCard>
        <HoverCardTrigger asChild>{trigger}</HoverCardTrigger>
        <HoverCardContent>{children}</HoverCardContent>
      </UIHoverCard>
    </div>
  );
}
