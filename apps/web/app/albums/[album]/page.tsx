// apps/web/app/albums/[album]/page.tsx
import fs from 'fs';
import path from 'path';
import {Metadata} from 'next';
import {notFound} from 'next/navigation';
import AlbumGallery from '@/components/ui-ex/album-gallery';
import {AlbumData} from '@/types/albums';

type PageProps = {
  params: Promise<{album: string}>;
};

function getAlbumData(albumId: string): AlbumData | null {
  try {
    const filePath = path.join(
      process.cwd(),
      'config',
      'albums',
      `${albumId}.json`,
    );
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error loading album:', error);
    return null;
  }
}

export async function generateStaticParams() {
  const configPath = path.join(
    process.cwd(),
    'config',
    'albums',
    'config.json',
  );
  const configContent = fs.readFileSync(configPath, 'utf8');
  const config = JSON.parse(configContent);

  return config.albums.map((album: {id: string}) => ({
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
