import { useId } from 'react';

import type { GalleryContent } from '@/libs/types';
import { ResponsiveImage } from '@/components/widgets';
import { cn } from '@/libs/cn';

interface GalleryProps {
  content: GalleryContent;
  className?: string;
}

const Gallery = ({
  content: {
    title,
    images: { first, second, third },
  },
  className,
}: GalleryProps) => {
  const headingId = useId();

  const imageBaseStyles = cn(
    'size-full',
    'rounded-lg',
    'overflow-hidden',
    'object-cover',
  );

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        'flex',
        'flex-col',
        'gap-5',

        'md:flex-row',
        'md:gap-4.5',

        'lg:gap-7.5',
        className,
      )}
    >
      <h2
        id={headingId}
        className={cn('sr-only')}
      >
        {title} gallery
      </h2>
      <div
        className={cn(
          'size-full',
          'flex',
          'flex-col',
          'gap-5',

          'lg:gap-8',
        )}
      >
        <ResponsiveImage
          alt={`${title} - view 1`}
          loading='lazy'
          image={first}
          className={cn(imageBaseStyles)}
        />

        <ResponsiveImage
          alt={`${title} - view 2`}
          loading='lazy'
          image={second}
          className={cn(imageBaseStyles)}
        />
      </div>

      <ResponsiveImage
        alt={`${title} - view 3`}
        loading='lazy'
        image={third}
        className={cn(imageBaseStyles)}
      />
    </section>
  );
};

export default Gallery;
