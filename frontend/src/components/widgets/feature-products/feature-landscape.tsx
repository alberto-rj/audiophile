import { useId } from 'react';
import { Link } from 'react-router-dom';

import type { FeatureLandscapeContent } from '@/libs/types';
import { cn } from '@/libs/cn';
import { Button } from '@/components/ui';
import { ResponsiveImage } from '@/components/widgets';

interface FeatureLandscapeProps {
  content: FeatureLandscapeContent;
}

const FeatureLandscape = ({
  content: { title, slug, image },
}: FeatureLandscapeProps) => {
  const headingId = useId();

  return (
    <section
      aria-describedby={headingId}
      className={cn(
        'relative',
        'inline-full',
        'px-6',
        'py-25.25',

        'md:px-15.5',

        'lg:px-23.75',

        'rounded-lg',
        'overflow-hidden',
        'bg-white',
      )}
    >
      <div
        className={cn(
          'relative',
          'z-2',
          'flex',
          'flex-col',
          'items-start',
          'gap-8',
        )}
      >
        <h2
          id={headingId}
          className={cn(
            'text-xl',

            'text-black',
            'uppercase',
          )}
        >
          {title}
        </h2>
        <Button
          variant={'outline'}
          asChild
        >
          <Link
            aria-label={`See product - ${title}`}
            to={slug}
          >
            See product
          </Link>
        </Button>
      </div>
      <ResponsiveImage
        alt=''
        loading='lazy'
        image={image}
        className={cn(
          'absolute',
          'inset-0',
          'inline-full',
          'block-full',
          'object-cover',
        )}
      />
    </section>
  );
};

export default FeatureLandscape;
