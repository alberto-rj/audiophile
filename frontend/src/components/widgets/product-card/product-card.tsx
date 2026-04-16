import { useId } from 'react';

import { Button } from '@/components/ui';
import { ResponsiveImage } from '@/components/widgets';
import { cn } from '@/libs/cn';
import type { ProductCardContent } from '@/libs/types';

interface ProductCardProps {
  content: ProductCardContent;
}

const ProductCard = ({
  content: { image, title, description, action, slug, isNew, isReversed },
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

        'md:gap-[52px]',

        {
          'lg:flex-row': !isReversed,
          'lg:flex-row-reverse': isReversed,
        },
        'lg:justify-center',
        'lg:gap-[125px]',
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

          'md:max-w-[572px]',

          'lg:max-w-[445px]',
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
