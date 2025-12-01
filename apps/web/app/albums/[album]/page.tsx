// apps/web/app/albums/[album]/page.tsx
// Fix de import naar de nieuwe locatie
import {Metadata} from 'next';
import {notFound} from 'next/navigation';
import AlbumGallery from '@/components/domain/album-gallery'; // Was ui-ex
import {getAlbumData, getAllAlbums} from '@/services/album-service';

// Rest van de file blijft gelijk...
type PageProps = {
  params: Promise<{album: string}>;
};

export async function generateStaticParams() {
  const albums = getAllAlbums();
  return albums.map((album) => ({
    album: album.id,
  }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const albumData = getAlbumData(params.album);

  if (!albumData) {
    notFound();
  }

  return {
    title: albumData.title,
    description: albumData.description,
  };
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const albumData = getAlbumData(params.album);

  if (!albumData) {
    notFound();
  }

  return (
    <section className="mx-auto mb-10 w-full space-y-6">
      <article className="space-y-2">
        <h1 className="text-foreground text-3xl font-semibold">
          {albumData.title}
        </h1>
        {albumData.description && (
          <p className="text-muted-foreground text-base">
            {albumData.description}
          </p>
        )}
      </article>
      <article>
        <AlbumGallery albumData={albumData} />
      </article>
    </section>
  );
}
