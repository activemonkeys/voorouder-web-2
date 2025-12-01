// apps/web/components/mdx/accordion.tsx
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Accordion as UIAccordion,
} from '@workspace/ui/components/shadcn/accordion';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Accordion({title, children, className}: AccordionProps) {
  return (
    <UIAccordion type="single" collapsible className={className}>
      <AccordionItem value="item-1">
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </UIAccordion>
  );
}
