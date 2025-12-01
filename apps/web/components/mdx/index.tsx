// apps/web/components/mdx/index.tsx
import * as React from 'react';
import * as runtime from 'react/jsx-runtime';
import {evaluate} from '@mdx-js/mdx';

import {components as definedComponents} from './components';

interface CustomMDXProps {
  source: string;
  additionalComponents?: Record<string, React.ComponentType<any>>;
}

// Verbeterde styling: Duidelijkere alert style die werkt in light & dark mode
const MissingComponent = ({name}: {name: string}) => (
  <div className="my-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/20 dark:text-amber-200">
    <div className="flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-5 shrink-0 text-amber-600 dark:text-amber-400"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" x2="12" y1="8" y2="12" />
        <line x1="12" x2="12.01" y1="16" y2="16" />
      </svg>
      <p className="font-medium">
        Component niet gevonden:{' '}
        <code className="rounded bg-amber-100 px-1.5 py-0.5 font-mono text-xs dark:bg-amber-900/50">{`<${name} />`}</code>
      </p>
    </div>
    <p className="mt-2 pl-7 text-xs opacity-90">
      Controleer de spelling in de MDX-file of voeg deze toe aan{' '}
      <code>components/mdx/components.tsx</code>.
    </p>
  </div>
);

export default async function CustomMDX({
  source,
  additionalComponents,
}: CustomMDXProps) {
  let MDXContent;

  try {
    const result = await evaluate(source, {
      ...runtime,
    });
    MDXContent = result.default;
  } catch (error) {
    console.error('Error compiling MDX:', error);
    return (
      <div className="text-destructive border-destructive bg-destructive/10 rounded border p-4">
        <h3 className="font-bold">Fout bij laden content</h3>
        <p className="mt-1 text-sm">
          Er is een fout opgetreden bij het verwerken van de pagina inhoud.
        </p>
      </div>
    );
  }

  const mergedComponents = {
    ...definedComponents,
    ...(additionalComponents || {}),
  };

  const componentsProxy = new Proxy(mergedComponents, {
    get: (target, prop) => {
      if (prop in target) {
        return target[prop as keyof typeof target];
      }

      if (typeof prop === 'string') {
        const FallbackComponent = () => <MissingComponent name={prop} />;
        return Object.assign(FallbackComponent, {
          displayName: `Missing(${prop})`,
        });
      }

      return undefined;
    },
  });

  return <MDXContent components={componentsProxy} />;
}
