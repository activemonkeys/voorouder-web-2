// apps/web/components/gallery/NextJsImage.tsx
'use client';

import Image from 'next/image';

// Verwijder de import van RenderPhotoProps, we definiëren onze eigen interface
// import {RenderPhotoProps} from 'yet-another-react-lightbox';

interface NextJsImageProps {
  photo: {
    src: string;
    width: number;
    height: number;
    title?: string;
    alt?: string;
    blurDataURL?: string;
  };
  imageProps: {
    alt?: string;
    title?: string;
    sizes?: string;
    className?: string;
    onClick?: () => void;
  };
  wrapperStyle: React.CSSProperties;
}

export default function NextJsImage({
  photo,
  imageProps: {alt, title, sizes, className, onClick},
  wrapperStyle,
}: NextJsImageProps) {
  return (
    <div style={{...wrapperStyle, position: 'relative'}}>
      <Image
        fill
        src={photo.src}
        placeholder={photo.blurDataURL ? 'blur' : undefined}
        blurDataURL={photo.blurDataURL}
        alt={alt || photo.alt || ''}
        title={title || photo.title}
        sizes={sizes}
        className={className}
        onClick={onClick}
        priority={true}
        loading="eager"
      />
      {photo.title && (
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black via-black/40 to-transparent p-4 pt-2 pb-8">
          <h2 className="text-base leading-tight tracking-tighter text-white lg:leading-[1.1]">
            {photo.title}
          </h2>
        </div>
      )}
    </div>
  );
}
