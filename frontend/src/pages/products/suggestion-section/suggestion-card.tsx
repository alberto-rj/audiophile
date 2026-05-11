import { useId } from 'react';
import { Link } from 'react-router-dom';

import { ResponsiveImage } from '@/components/widgets';
import { Button } from '@/components/ui';
import { APP_ROUTES } from '@/config/app-routes';
import { cn } from '@/libs/cn';
import type { BasicProduct } from '@/libs/types';

interface SuggestionCardProps {
  product: BasicProduct;
}

const SuggestionCard = ({
  product: { image, name, slug },
}: SuggestionCardProps) => {
  const headingId = useId();

  return (
    <article
      aria-labelledby={headingId}
      className={cn(
        'inline-full',
        'flex',
        'flex-col',
        'items-center',
        'gap-8',

        'md:gap-10',
        'overflow-hidden',
      )}
    >
      <ResponsiveImage
        alt=''
        loading='lazy'
        image={image}
        className={cn(
          'object-cover',
          'overflow-hidden',
          'rounded-lg',
          'aspect-327/120',

          'md:aspect-223/318',

          'lg:aspect-350/318',
        )}
      />

      <div className={cn('flex', 'flex-col', 'items-center', 'gap-8')}>
        <h3
          id={headingId}
          className={cn(
            'text-lg',
            'text-center',

            'text-black',
            'uppercase',
          )}
        >
          {name}
        </h3>
        <Button
          variant={'primary'}
          asChild
        >
          <Link
            aria-label={`See product - ${name}`}
            to={`${APP_ROUTES.products}/${slug}`}
          >
            See product
          </Link>
        </Button>
      </div>
    </article>
  );
};

export default SuggestionCard;
