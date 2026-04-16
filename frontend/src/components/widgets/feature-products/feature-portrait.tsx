import { useId } from 'react';

import type { FeaturePortraitContent } from '@/libs/types';
import { ResponsiveImage } from '@/components/widgets';
import { Button } from '@/components/ui';
import { cn } from '@/libs/cn';

interface FeaturePortraitProps {
  content: FeaturePortraitContent;
}

const FeaturePortrait = ({
  content: { title, action, slug, image },
}: FeaturePortraitProps) => {
  const headingId = useId();

  return (
    <section
      aria-describedby={headingId}
      className={cn(
        'grid',
        'grid-cols-[repeat(1,minmax(100%,20.4375em))]',
        'grid-rows-[12.5em_12.5em]',
        'gap-6',

        'md:grid-cols-[repeat(2,minmax(0,21.1875em))]',
        'md:grid-rows-[20em]',
        'md:gap-2.75',

        'lg:grid-cols-[repeat(2,minmax(0,33.75em))]',
        'lg:gap-7.5',
      )}
    >
      <div className={cn('relative', 'rounded-lg', 'overflow-hidden')}>
        <ResponsiveImage
          alt=''
          image={image}
          className={cn('absolute', 'inset-0', 'size-full', 'object-cover')}
        />
      </div>

      <div
        className={cn(
          'rounded-lg',
          'overflow-hidden',

          'bg-gray-400',
        )}
      >
        <div
          className={cn(
            'size-full',
            'flex',
            'flex-col',
            'justify-center',
            'items-start',
            'gap-8',
            'px-6',

            'md:gap-8',
            'md:text-xl',
            'md:ps-10.25',

            'lg:ps-23.75',
          )}
        >
          <h2
            id={headingId}
            className={cn('text-md', 'xs:text-xl', 'uppercase')}
          >
            {title}
          </h2>
          <Button
            variant={'outline'}
            asChild
          >
            <a href={slug}>{action}</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturePortrait;
