import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@workspace/ui/components/shadcn/accordion';

interface DetailsProps {
  children: React.ReactNode;
  summary: string;
  className?: string;
}

export function Details({children, summary, className}: DetailsProps) {
  return (
    <Accordion type="single" collapsible className={className}>
      <AccordionItem value="content">
        <AccordionTrigger>{summary}</AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
