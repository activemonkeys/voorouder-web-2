// apps/web/components/mdx/pre.tsx
import React, {Children} from 'react';
import {codeToHtml} from 'shiki';

import {cn} from '@workspace/ui/lib/utils';

export async function Pre({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) {
  const codeElement = Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === 'code',
  ) as React.ReactElement<HTMLPreElement> | undefined;

  const lang = codeElement?.props?.className?.split('-')[1] ?? '';

  if (!lang) {
    return (
      <div className={cn('relative', className)}>
        <pre {...props}>{children}</pre>
      </div>
    );
  }

  const html = await codeToHtml(String(codeElement?.props.children), {
    lang,
    themes: {
      light: 'vitesse-light',
      dark: 'vesper',
    },
  });

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div dangerouslySetInnerHTML={{__html: html}} />
    </div>
  );
}
