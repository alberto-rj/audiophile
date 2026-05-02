import { Skeleton } from '@/components/ui';
import { cn } from '@/libs/cn';

interface GallerySkeletonProps {
  className?: string;
}

const GallerySkeleton = ({ className }: GallerySkeletonProps) => {
  const imageBaseStyles = cn(
    'inline-full',
    'block-full',
    'aspect-327/174',

    'md:aspect-277/174',

    'lg:aspect-445/280',

    'rounded-lg',
    'overflow-hidden',
    'object-cover',
  );

  return (
    <div
      aria-hidden={true}
      className={cn(
        'grid',
        'grid-cols-1',
        'gap-5',

        'md:grid-cols-2',
        'md:auto-rows-fr',
        'md:gap-4.5',

        'lg:gap-7.5',

        className,
      )}
    >
      {/* Left column (2 stacked images) */}
      <div
        className={cn(
          'inline-full',
          'block-full',
          'flex',
          'flex-col',
          'gap-5',

          'lg:gap-8',
        )}
      >
        {/* Image 1 skeleton */}
        <Skeleton className={cn(imageBaseStyles)} />

        {/* Image 2 skeleton */}
        <Skeleton className={cn(imageBaseStyles)} />
      </div>

      {/* Right column (large image) */}
      <Skeleton
        className={cn(
          imageBaseStyles,

          'aspect-327/368',

          'md:aspect-395/368',

          'lg:aspect-635/592',
        )}
      />
    </div>
  );
};

export default GallerySkeleton;
