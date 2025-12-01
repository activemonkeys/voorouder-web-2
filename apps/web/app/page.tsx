// apps/web/app/page.tsx
import Image from 'next/image';
import {ContentItem} from '@/lib/schemas'; // Import type
import {getFeaturedAlbums} from '@/services/album-service';
import {getContentByType} from '@/services/content-service';
import {Link} from 'next-view-transitions';

import {Button} from '@workspace/ui/components/shadcn/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/shadcn/card';
import {Separator} from '@workspace/ui/components/shadcn/separator';

export default function Home() {
  const articles = getContentByType('article')
    .sort(
      (
        a: ContentItem,
        b: ContentItem, // Add types
      ) =>
        new Date(b.lastUpdated || '').getTime() -
        new Date(a.lastUpdated || '').getTime(),
    )
    .slice(0, 6);

  const featuredAlbums = getFeaturedAlbums(3);

  return (
    <div className="mb-12">
      <section className="bg-primary/5 dark:bg-primary/5 relative mb-20 overflow-hidden rounded-lg">
        <div className="relative grid gap-8 px-6 py-12 md:grid-cols-2 md:px-8 md:py-16 lg:px-12">
          <div className="space-y-10">
            <h1 className="text-foreground text-4xl font-semibold tracking-tight sm:text-5xl">
              Stichting Voorouder
            </h1>
            <p className="text-muted-foreground max-w-[36ch] text-xl leading-relaxed">
              Specialisten in bevolkingsreconstructies, DNA-verwantschap en
              onderzoek naar slachtoffers van rampen en oorlogen.
            </p>

            <div className="flex gap-4">
              <Button
                variant="default"
                size="lg"
                className="bg-[#4c8556] font-medium text-white shadow-xs transition-all duration-300 hover:bg-[#3a6d44] focus-visible:ring-2 focus-visible:ring-[#3a6d44]"
                asChild
              >
                <Link
                  href="/historisch-en-verwantschapsonderzoek"
                  className="flex items-center gap-2"
                >
                  Lees over de mogelijkheden
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <Link href="/historisch-en-verwantschapsonderzoek">
              <Image
                src="/images/front/ambtenaren-bureau-bevolking.jpg"
                alt="Archiefdocumenten en historisch onderzoek"
                width={600}
                height={400}
                className="cursor-pointer rounded-lg object-cover shadow-lg"
                priority
              />
            </Link>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-foreground text-2xl font-semibold">Onderzoek</h2>
          <Button
            variant="ghost"
            className="text-[#64a66e] hover:bg-[#64a66e]/5 hover:text-[#64a66e]/90"
            asChild
          >
            <Link href="/onderzoek">Alle onderzoeken</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Link href="/namen-slachtoffers-10-14-mei-1940-rotterdam">
            <div className="group relative">
              <div className="group-hover:bg-secondary/5 absolute inset-[-8px] z-0 rounded-lg transition-all duration-300" />
              <Card className="relative h-full border-0 bg-transparent shadow-none">
                <Image
                  src="/images/front/rotterdam-bombardement-mei-1940.jpg"
                  alt="Namen slachtoffers mei 1940 Rotterdam"
                  width={400}
                  height={250}
                  className="z-10 h-48 w-full rounded-md object-cover"
                />
                <div className="z-10 flex h-full flex-col">
                  <CardHeader className="space-y-0 px-0 pb-2">
                    <CardTitle className="text-foreground text-md leading-relaxed font-medium">
                      Bombardement en strijd mei 1940
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-0">
                    <p className="text-muted-foreground line-clamp-3 text-[15px] leading-relaxed">
                      Onderzoek naar de slachtoffers van het bombardement op
                      Rotterdam en de gevechten tussen 10-14 mei 1940.
                    </p>
                  </CardContent>
                </div>
              </Card>
            </div>
          </Link>

          <Link href="/namen-slachtoffers-bombardement-31-maart-1943-rotterdam">
            <div className="group relative">
              <div className="group-hover:bg-secondary/5 absolute inset-[-8px] z-0 rounded-lg transition-all duration-300" />
              <Card className="relative h-full border-0 bg-transparent shadow-none">
                <Image
                  src="/images/front/rotterdam-vergeten-bombardement-31-maart-1943.jpg"
                  alt="Vergeten bombardement 1943"
                  width={400}
                  height={250}
                  className="z-10 h-48 w-full rounded-md object-cover"
                />
                <div className="z-10 flex h-full flex-col">
                  <CardHeader className="space-y-0 px-0 pb-2">
                    <CardTitle className="text-foreground text-md leading-relaxed font-medium">
                      Het &apos;Vergeten Bombardement&apos; 1943
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-0">
                    <p className="text-muted-foreground line-clamp-3 text-[15px] leading-relaxed">
                      Analyse van de slachtoffers en impact van het bombardement
                      op Rotterdam-West op 31 maart 1943.
                    </p>
                  </CardContent>
                </div>
              </Card>
            </div>
          </Link>

          <Link href="/namen-slachtoffers-watersnoodramp-1953-goeree-overflakkee">
            <div className="group relative">
              <div className="group-hover:bg-secondary/5 absolute inset-[-8px] z-0 rounded-lg transition-all duration-300" />
              <Card className="relative h-full border-0 bg-transparent shadow-none">
                <Image
                  src="/images/front/watersnoodramp-1953.jpg"
                  alt="Watersnoodramp Goeree-Overflakkee"
                  width={400}
                  height={250}
                  className="z-10 h-48 w-full rounded-md object-cover"
                />
                <div className="z-10 flex h-full flex-col">
                  <CardHeader className="space-y-0 px-0 pb-2">
                    <CardTitle className="text-foreground text-md leading-relaxed font-medium">
                      Watersnoodramp Goeree-Overflakkee
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-0">
                    <p className="text-muted-foreground line-clamp-3 text-[15px] leading-relaxed">
                      Onderzoek naar de slachtoffers van de watersnoodramp van
                      1953 op Goeree-Overflakkee.
                    </p>
                  </CardContent>
                </div>
              </Card>
            </div>
          </Link>
        </div>
      </section>

      <Separator className="mx-auto my-12 max-w-6xl md:my-16" />

      <section className="mb-12">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-foreground text-2xl font-semibold">
            Recente artikelen
          </h2>
          <Button
            variant="ghost"
            className="text-[#64a66e] hover:bg-[#64a66e]/5 hover:text-[#64a66e]/90"
            asChild
          >
            <Link href="/artikelen">Alle artikelen</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {articles.map(
            (
              article: ContentItem, // Add type
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
                      <CardHeader className="space-y-0 px-0 pb-2">
                        <CardTitle className="text-foreground text-md leading-relaxed font-medium">
                          {article.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="px-0">
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
      </section>

      {featuredAlbums.length > 0 && (
        <>
          <Separator className="mx-auto my-12 max-w-6xl md:my-16" />
          <section>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-foreground text-2xl font-semibold">Albums</h2>
              <Button
                variant="ghost"
                className="text-[#64a66e] hover:bg-[#64a66e]/5 hover:text-[#64a66e]/90"
                asChild
              >
                <Link href="/albums">Alle albums</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {featuredAlbums.map((album) => (
                <Link key={album.id} href={`/albums/${album.id}`}>
                  <div className="group relative">
                    <div className="group-hover:bg-secondary/5 absolute inset-[-8px] z-0 rounded-lg transition-all duration-300" />
                    <Card className="relative h-full border-0 bg-transparent shadow-none">
                      <Image
                        src={album.thumbnailPath}
                        alt={album.title}
                        width={400}
                        height={250}
                        className="z-10 h-48 w-full rounded-md object-cover"
                      />
                      <div className="z-10 flex h-full flex-col">
                        <CardHeader className="space-y-0 px-0 pb-2">
                          <CardTitle className="text-foreground text-md leading-relaxed font-medium">
                            {album.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="px-0">
                          <p className="text-muted-foreground line-clamp-3 text-[15px] leading-relaxed">
                            {album.description}
                          </p>
                        </CardContent>
                      </div>
                    </Card>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
