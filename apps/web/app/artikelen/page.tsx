// apps/web/app/artikelen/page.tsx
import {Metadata} from 'next';
import Image from 'next/image';
import {ContentItem} from '@/lib/schemas'; // Importeer het type
import {getContentByType} from '@/services/content-service';
import {Link} from 'next-view-transitions';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/shadcn/card';

export const metadata: Metadata = {
  title: 'Artikelen',
  description: 'Stichting Voorouder artikelen.',
};

export default function Page() {
  const articles = getContentByType('article').sort(
    (
      a: ContentItem,
      b: ContentItem, // Voeg types toe
    ) =>
      new Date(b.lastUpdated || '').getTime() -
      new Date(a.lastUpdated || '').getTime(),
  );

  return (
    <div className="mb-10 w-full">
      <div className="mb-2">
        <h1 className="text-foreground mb-6 text-3xl font-semibold">
          Artikelen
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {articles.map(
          (
            article: ContentItem, // Voeg type toe
          ) => (
            <Link key={article.slug} href={`/${article.slug}`}>
              <div className="group relative">
                <div className="group-hover:bg-secondary/5 absolute inset-[-8px] z-0 rounded-lg transition-all duration-300" />
                <Card className="relative h-full border-0 bg-transparent shadow-none">
                  <Image
                    src={article.image?.src || '/images/default-article.jpg'}
                    alt={article.image?.alt || article.title}
                    width={400}
                    height={250}
                    className="z-10 h-48 w-full rounded-md object-cover"
                  />
                  <div className="z-10 flex h-full flex-col">
                    <CardHeader className="space-y-0 px-0 pb-2 transition-colors duration-300">
                      <CardTitle className="text-foreground text-md leading-relaxed font-medium">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 transition-colors duration-300">
                      <p className="text-muted-foreground line-clamp-3 text-[15px] leading-relaxed">
                        {article.summary}
                      </p>
                    </CardContent>
                  </div>
                </Card>
              </div>
            </Link>
          ),
        )}
      </div>
    </div>
  );
}
