import { useId } from 'react';
import { Link } from 'react-router-dom';

import type { BasicProduct } from '@/libs/types';
import { cn } from '@/libs/cn';
import { ResponsiveImage } from '@/components/widgets';
import { Button } from '@/components/ui';

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
        'w-full',
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
          'w-full',
          'h-30',
          'object-cover',
          'overflow-hidden',
          'rounded-lg',

          'md:h-79.5',
        )}
      />

      <div className={cn('flex', 'flex-col', 'items-center', 'gap-8')}>
        <h3
          id={headingId}
          className={cn(
            'text-lg',
            'uppercase',

            'text-black',
          )}
        >
          {name}
        </h3>
        <Button
          variant={'primary'}
          asChild
        >
          <Link to={`/products/${slug}`}>
            <span className={cn('sr-only')}>See product: {name}</span>
            <span aria-hidden={true}>See product</span>
          </Link>
        </Button>
      </div>
    </article>
  );
};

export default SuggestionCard;
