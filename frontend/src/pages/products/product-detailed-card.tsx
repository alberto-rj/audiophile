import { useId, useState } from 'react';

import type { ProductDetailedCardContent } from '@/libs/types';
import { cn } from '@/libs/cn';
import { formatPrice } from '@/libs/helpers';
import { QuantitySelector, ResponsiveImage } from '@/components/widgets';
import { Button } from '@/components/ui';

interface ProductDetailedCardProps {
  content: ProductDetailedCardContent;
  className?: string;
}

const ProductDetailedCard = ({
  content: { image, title, description, price, action, isNew },
  className,
}: ProductDetailedCardProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const headingId = useId();

  const formattedPrice = formatPrice(price);

  const handleAddToCart = () => {};

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        'inline-full',
        'flex',
        'flex-col',
        'gap-10',

        'md:flex-row',
        'md:items-start',
        'md:justify-between',
        'md:gap-17.25',

        'lg:gap-31.25',
        className,
      )}
    >
      <ResponsiveImage
        alt={title}
        loading='lazy'
        image={image}
        className={cn(
          'aspect-327/327',
          'object-cover',
          'overflow-hidden',
          'rounded-lg',

          'md:aspect-280/560',

          'lg:aspect-540/560',
        )}
        width={540}
        height={560}
      />

      <div
        className={cn(
          'flex',
          'flex-col',
          'gap-8',

          'md:gap-12',
          'md:self-center',
        )}
      >
        <div
          className={cn(
            'max-inline-111.5',
            'flex',
            'flex-col',
            'gap-6',

            'md:gap-8',
          )}
        >
          <div className={cn('flex', 'flex-col', 'gap-6')}>
            {isNew && (
              <span
                className={cn(
                  'uppercase',
                  'text-sm',

                  'text-primary-400',
                )}
              >
                New product
              </span>
            )}
            <h1
              id={headingId}
              className={cn(
                'uppercase',
                'text-xl',

                'lg:text-3xl',
              )}
            >
              {title}
            </h1>
          </div>
          <p
            className={cn(
              'text-base',

              'text-black-o-50',
            )}
          >
            {description}
          </p>
          <p
            className={cn(
              'text-md',

              'text-black',
            )}
          >
            <span className={cn('sr-only')}>Price: </span>
            <span>{formattedPrice}</span>
          </p>
        </div>

        <div className={cn('flex', 'flex-wrap', 'items-center', 'gap-4')}>
          <QuantitySelector
            value={quantity}
            onChange={(value) => setQuantity(value)}
            className={cn('max-inline-30')}
          />
          <Button
            variant={'primary'}
            onClick={handleAddToCart}
          >
            {action}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailedCard;
