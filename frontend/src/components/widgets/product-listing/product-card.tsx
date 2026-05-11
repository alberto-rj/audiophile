import { useId } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui';
import { ResponsiveImage } from '@/components/widgets';
import { APP_ROUTES } from '@/config/app-routes';
import { cn } from '@/libs/cn';
import type { ProductCardContent } from '@/libs/types';

interface ProductCardProps {
  content: ProductCardContent;
  className?: string;
}

export const ProductCard = ({
  content: { image, title, description, slug, isNew, isReversed },
  className,
}: ProductCardProps) => {
  const headingId = useId();

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        'inline-full',
        'flex',
        'flex-col',
        'items-center',
        'gap-8',

        'md:gap-13',

        {
          'lg:flex-row': !isReversed,
          'lg:flex-row-reverse': isReversed,
        },
        'lg:justify-between',
        'lg:gap-31.25',

        className,
      )}
    >
      <ResponsiveImage
        alt=''
        image={image}
        className={cn(
          'aspect-327/352',

          'md:aspect-689/352',

          'lg:aspect-540/560',

          'rounded-lg',
          'object-cover',
        )}
      />
      <div
        className={cn(
          'flex',
          'flex-col',
          'items-center',
          'gap-6',
          'text-center',

          'md:max-inline-143',

          'lg:max-inline-111.25',
          'lg:items-start',
          'lg:gap-10',
          'lg:text-start',
        )}
      >
        <div className={cn('flex', 'flex-col', 'gap-8')}>
          <div className={cn('flex', 'flex-col', 'gap-4')}>
            {isNew && (
              <span
                className={cn(
                  'text-sm',

                  'text-primary-700',
                  'uppercase',
                )}
              >
                New product
              </span>
            )}
            <h2
              id={headingId}
              className={cn(
                'text-2xl',

                'xs:text-3xl',

                'text-black',
                'uppercase',
              )}
            >
              {title}
            </h2>
          </div>
          <p>{description}</p>
        </div>
        <Button
          variant={'primary'}
          asChild
        >
          <Link
            aria-label={`See product - ${title}`}
            to={`${APP_ROUTES.products}/${slug}`}
          >
            See product
          </Link>
        </Button>
      </div>
    </section>
  );
};
