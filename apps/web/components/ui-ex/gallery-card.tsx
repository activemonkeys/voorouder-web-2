// apps/web/components/ui-ex/gallery-card.tsx
import Image from 'next/image';
import {Link} from 'next-view-transitions';

interface GalleryCardProps {
  gallery: {
    id: string;
    title: string;
    description: string;
    thumbnailPath: string;
  };
}

export default function GalleryCard({gallery}: GalleryCardProps) {
  return (
    <Link href={`/albums/${gallery.id}`}>
      <div className="group overflow-hidden rounded-lg border transition-shadow hover:shadow-lg">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={gallery.thumbnailPath}
            alt={gallery.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h2 className="mb-2 text-xl font-light">{gallery.title}</h2>
          <p className="text-muted-foreground text-sm">{gallery.description}</p>
        </div>
      </div>
    </Link>
  );
}
