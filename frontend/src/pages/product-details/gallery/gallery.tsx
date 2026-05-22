import { useId } from 'react';

import { ResponsiveImage } from '@/components/widgets';
import { cn } from '@/libs/cn';
import type { GalleryContent } from '@/libs/types';

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
    'inline-full',
    'block-full',
    'rounded-lg',
    'overflow-hidden',
    'object-cover',
    'aspect-327/174',

    'md:aspect-277/174',

    'lg:aspect-445/280',
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
          'inline-full',
          'block-full',
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
        className={cn(
          imageBaseStyles,

          'aspect-327/368',
          'md:aspect-395/368',

          'lg:aspect-635/592',
        )}
      />
    </section>
  );
};

export default Gallery;
