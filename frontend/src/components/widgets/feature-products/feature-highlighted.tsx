import { useId } from 'react';
import { Link } from 'react-router-dom';

import type { FeatureHighLightedContent } from '@/libs/types';
import { cn } from '@/libs/cn';
import { Button } from '@/components/ui';
import { ResponsiveImage } from '@/components/widgets';

interface FeatureHighLightedProps {
  content: FeatureHighLightedContent;
}

const FeatureHighLighted = ({
  content: { title, description, image, slug },
}: FeatureHighLightedProps) => {
  const headingId = useId();

  return (
    <section
      aria-describedby={headingId}
      className={cn(
        'inline-full',
        'px-6',
        'py-14',

        'lg:px-23.75',
        'lg:py-31',

        'bg-primary-400',
        'rounded-lg',
        'overflow-hidden',
      )}
    >
      <div
        className={cn(
          'flex',
          'flex-col',
          'justify-between',
          'items-center',
          'gap-8',

          'md:gap-16',

          'lg:flex-row',
          'lg:gap-34.5',
        )}
      >
        <ResponsiveImage
          alt=''
          loading='lazy'
          image={image}
          className={cn(
            'object-cover',
            'aspect-172/207',
            'mx-auto',

            'md:aspect-197/237',

            'lg:aspect-410/493',
            'lg:m-0',
            'lg:-mb-33.5',
          )}
        />
        <div
          className={cn(
            'max-inline-87.5',
            'flex',
            'flex-col',
            'items-center',
            'gap-6',

            'md:gap-10',

            'lg:items-start',
          )}
        >
          <div
            className={cn(
              'flex',
              'flex-col',
              'gap-6',
              'text-center',

              'lg:text-start',
            )}
          >
            <h2
              id={headingId}
              className={cn(
                'text-2xl',

                'md:text-4xl',

                'text-white',
                'uppercase',
              )}
            >
              {title}
            </h2>
            <p className={cn('text-white/75')}>{description}</p>
          </div>
          <Button
            variant={'secondary'}
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
      </div>
    </section>
  );
};

export default FeatureHighLighted;
