import { useId } from 'react';

import { Button } from '@/components/ui';
import { ResponsiveImage } from '@/components/widgets';
import { cn } from '@/libs/cn';
import type { ProductCardContent } from '@/libs/types';

interface ProductCardProps {
  content: ProductCardContent;
  className?: string;
}

const ProductCard = ({
  content: { image, title, description, action, slug, isNew, isReversed },
  className,
}: ProductCardProps) => {
  const headingId = useId();

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        'w-full',
        'flex',
        'flex-col',
        'items-center',
        'gap-8',

        'md:gap-13',

        {
          'lg:flex-row': !isReversed,
          'lg:flex-row-reverse': isReversed,
        },
        'lg:justify-center',
        'lg:gap-31.25',
        className,
      )}
    >
      <ResponsiveImage
        alt=''
        image={image}
        className={cn('w-full', 'h-auto', 'object-cover')}
      />
      <div
        className={cn(
          'flex',
          'flex-col',
          'items-center',
          'gap-6',
          'text-center',

          'md:max-w-143',

          'lg:max-w-111.25',
          'lg:items-start',
          'lg:gap-10',
          'lg:text-start',
        )}
      >
        <div
          className={cn(
            'flex',
            'flex-col',
            'gap-8',

            'lg:gap-8',
            'lg:items-center',
          )}
        >
          <div className={cn('flex', 'flex-col', 'gap-4')}>
            {isNew && (
              <span className={cn('text-sm', 'text-primary-400', 'uppercase')}>
                New product
              </span>
            )}
            <h2
              id={headingId}
              className={cn(
                'text-2xl',

                'xs:text-3xl',

                'uppercase',
              )}
            >
              {title}
            </h2>
          </div>
          <p className={cn('text-base')}>{description}</p>
        </div>
        <Button
          variant={'primary'}
          asChild
        >
          <a href={slug}>{action}</a>
        </Button>
      </div>
    </section>
  );
};

export default ProductCard;
