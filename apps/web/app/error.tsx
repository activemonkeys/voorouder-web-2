// apps/web/app/error.tsx
'use client';

import {useEffect} from 'react';

import {Button} from '@workspace/ui/components/shadcn/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & {digest?: string};
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-4 text-center">
      <h2 className="text-2xl font-bold">Er is iets misgegaan!</h2>
      <p className="text-muted-foreground">
        Onze excuses voor het ongemak. Probeer het opnieuw.
      </p>
      <Button onClick={() => reset()} variant="default">
        Probeer opnieuw
      </Button>
    </div>
  );
}
