import {ChevronDown} from 'lucide-react';

import {
  CollapsibleContent,
  CollapsibleTrigger,
  Collapsible as UICollapsible,
} from '@workspace/ui/components/shadcn/collapsible';

interface CollapsibleProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Collapsible({trigger, children, className}: CollapsibleProps) {
  return (
    <UICollapsible className={className}>
      <CollapsibleTrigger className="hover:bg-muted flex w-full items-center justify-between rounded-lg border p-4 font-medium">
        {trigger}
        <ChevronDown className="h-4 w-4 transition-transform duration-200" />
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 pt-2">{children}</CollapsibleContent>
    </UICollapsible>
  );
}
