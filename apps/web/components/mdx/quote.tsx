import {cn} from '@/lib/utils';

import {Card, CardContent} from '@workspace/ui/components/shadcn/card';

interface QuoteProps {
  author?: string;
  children: React.ReactNode;
  className?: string;
}

export function Quote({author, children, className}: QuoteProps) {
  return (
    <Card className={cn('quote bg-muted', className)}>
      <CardContent className="pt-6">
        <blockquote className="border-primary border-l-4 pl-4">
          <span className="block italic">{children}</span>
          {author && (
            <span className="text-muted-foreground mt-2 block text-sm">
              — {author}
            </span>
          )}
        </blockquote>
      </CardContent>
    </Card>
  );
}
