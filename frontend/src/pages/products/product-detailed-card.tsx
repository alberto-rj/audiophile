import { useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { Product } from '@/libs/types';
import { cn } from '@/libs/cn';
import { toMoney } from '@/libs/helpers';
import { QuantitySelector, ResponsiveImage } from '@/components/widgets';
import { Button } from '@/components/ui';
import type { AppDispatch } from '@/app/store';
import { addItem, selectItemById, updateQuantity } from '@/app/features/cart';

interface ProductDetailedCardProps {
  product: Product;
  className?: string;
}

const ProductDetailedCard = ({
  product: { id, slug, image, name, description, price, isNew },
  className,
}: ProductDetailedCardProps) => {
  const selectedItem = useSelector(selectItemById(id));
  const quantity = selectedItem?.quantity || 0;

  const dispatch = useDispatch<AppDispatch>();

  const headingId = useId();

  const formattedPrice = toMoney(price);

  const handleAddToCart = () => {
    dispatch(addItem({ id, image, name, price, slug, quantity: 1 }));
  };

  const handleQuantityChange = (value: number) => {
    if (quantity === 0) {
      dispatch(addItem({ id, image, name, price, slug, quantity: value }));
    } else {
      dispatch(updateQuantity({ id, quantity: value }));
    }
  };

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
        alt={name}
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
          'inline-full',
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
              {name}
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
          <dl
            className={cn(
              'text-md',

              'text-black',
            )}
          >
            <dt className={cn('sr-only')}>Price: </dt>
            <dd>{formattedPrice}</dd>
          </dl>
        </div>

        <div className={cn('flex', 'flex-wrap', 'items-center', 'gap-4')}>
          <QuantitySelector
            label={`Quantity for ${name}`}
            value={quantity}
            onChange={handleQuantityChange}
            className={cn('max-inline-30')}
          />
          <Button
            variant={'primary'}
            onClick={handleAddToCart}
          >
            <span className={cn('sr-only')}>Add {name} to cart</span>
            <span>Add to cart</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailedCard;
