// apps/web/components/ui-ex/album-gallery.tsx
'use client';

import React, {useState} from 'react';
import Image from 'next/image';
import {AlbumData} from '@/types/albums';
import {
  RenderImageContext,
  RenderImageProps,
  RowsPhotoAlbum,
} from 'react-photo-album';

import 'react-photo-album/rows.css';

import Lightbox, {RenderSlideProps} from 'yet-another-react-lightbox';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

// 1. Adapter voor het grid (react-photo-album)
function renderNextImage(
  {alt = '', title, sizes, className, onClick}: RenderImageProps,
  {photo, width, height}: RenderImageContext,
) {
  return (
    <div
      style={{
        width: '100%',
        position: 'relative',
        aspectRatio: `${width} / ${height}`,
      }}
      className={className}
    >
      <Image
        fill
        src={photo.src}
        alt={alt}
        title={title}
        sizes={sizes}
        onClick={onClick}
        className="object-cover"
      />
    </div>
  );
}

// 2. Adapter voor de lightbox (yet-another-react-lightbox)
function renderLightboxSlide({slide}: RenderSlideProps<any>) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <Image
        fill
        alt={slide.alt || slide.title || ''}
        src={slide.src}
        loading="eager"
        draggable={false}
        style={{objectFit: 'contain'}}
        sizes="100vw"
      />
    </div>
  );
}

export default function AlbumGallery({albumData}: {albumData: AlbumData}) {
  const [index, setIndex] = useState(-1);

  const slides = albumData.images.map((image) => ({
    ...image,
    title: image.title || '',
  }));

  return (
    <div className="relative">
      <RowsPhotoAlbum
        photos={albumData.images}
        render={{image: renderNextImage}}
        targetRowHeight={400}
        onClick={({index}) => setIndex(index)}
      />

      <Lightbox
        slides={slides}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        render={{slide: renderLightboxSlide}}
      />
    </div>
  );
}
