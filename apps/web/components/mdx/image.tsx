// apps/web/components/mdx/image.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {cn, slugify} from '@/lib/utils';

interface CustomImageProps extends Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'width' | 'height' | 'alt' | 'priority'
> {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  caption?: string;
  captionClassName?: string;
  className?: string;
  href?: string;
  priority?: boolean;
}

// Helper component outside of render
const ImageContent = ({
  src,
  alt,
  width,
  height,
  className,
  priority,
  viewTransitionName,
  ...props
}: CustomImageProps & {viewTransitionName: string}) => {
  const baseImageProps = {
    src,
    priority,
    style: {viewTransitionName},
    className: cn(
      'rounded-md',
      width && height ? '' : 'object-cover',
      className,
    ),
    ...props,
  };

  const altText = alt || '';

  if (width && height) {
    return (
      <div className={cn('overflow-hidden rounded-md')}>
        <Image
          {...baseImageProps}
          alt={altText}
          width={width}
          height={height}
        />
      </div>
    );
  }

  return (
    <div
      className={cn('relative aspect-16/9 w-full overflow-hidden rounded-md')}
    >
      <Image
        {...baseImageProps}
        alt={altText}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={85}
      />
    </div>
  );
};

export function CustomImage({
  src,
  alt,
  width,
  height,
  caption,
  captionClassName,
  className,
  href,
  priority = false,
  ...props
}: CustomImageProps) {
  if (typeof src !== 'string' || !src) {
    console.error(
      "CustomImage component verwacht een non-empty 'src' prop van type string.",
    );
    return null;
  }

  const imagePath = src.startsWith('/') ? src : `/images/${src}`;
  const baseClasses = 'my-6';
  const viewTransitionName = `image-${slugify(src)}`;

  const content = (
    <ImageContent
      src={imagePath}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      viewTransitionName={viewTransitionName}
      {...props}
    />
  );

  return (
    <div className={cn('not-prose', baseClasses)}>
      <figure className="m-0">
        {href ? (
          <Link href={href} className="block cursor-pointer no-underline">
            {content}
          </Link>
        ) : (
          content
        )}
        {caption && (
          <figcaption
            className={cn(
              'text-muted-foreground mt-2 text-sm italic',
              captionClassName,
            )}
          >
            {caption}
          </figcaption>
        )}
      </figure>
    </div>
  );
}
