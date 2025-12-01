// apps/web/components/mdx/video.tsx
import {cn} from '@workspace/ui/lib/utils';

interface VideoProps {
  src: string;
  poster?: string;
  width?: number;
  height?: number;
  className?: string;
}

export function Video({
  src,
  poster,
  width = 640,
  height = 360,
  className,
}: VideoProps) {
  return (
    <div className={cn('relative', className)}>
      <video
        controls
        poster={poster}
        className="w-full rounded-md"
        style={{aspectRatio: `${width}/${height}`}}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
