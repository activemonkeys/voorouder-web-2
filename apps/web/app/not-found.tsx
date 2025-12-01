// apps/web/app/not-found.tsx
import Link from 'next/link';

import {Button} from '@workspace/ui/components/shadcn/button';

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-4 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <h2 className="text-xl font-semibold">Pagina niet gevonden</h2>
      <p className="text-muted-foreground max-w-md">
        Sorry, we konden de pagina die je zoekt niet vinden. Mogelijk is deze
        verwijderd of verplaatst.
      </p>
      <div className="pt-4">
        <Button asChild variant="default">
          <Link href="/">Terug naar Home</Link>
        </Button>
      </div>
    </div>
  );
}
