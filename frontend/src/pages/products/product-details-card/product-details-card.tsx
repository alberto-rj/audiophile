import { useId, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectIsAuthenticated } from '@/app/features/auth';
import { useAddCartItemMutation } from '@/app/services/cart-api';
import {
  QuantitySelector,
  ResponsiveImage,
  SignInRequiredAlert,
} from '@/components/widgets';
import { Button, Spinner } from '@/components/ui';
import { cn } from '@/libs/cn';
import {
  removePendingCartItem,
  setPendingCartItem,
  toMoney,
} from '@/libs/helpers';
import type { Product } from '@/libs/types';

interface ProductDetailsCardProps {
  product: Product;
  className?: string;
}

const ProductDetailsCard = ({
  product: { id, image, name, description, price, isNew },
  className,
}: ProductDetailsCardProps) => {
  const headingId = useId();

  const [open, setOpen] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [addCartItem, { isLoading }] = useAddCartItemMutation();

  const formattedPrice = toMoney(price);

  const handleAddCartItem = async () => {
    try {
      const { cart } = await addCartItem({ productId: id, quantity }).unwrap();
      console.log(cart);
    } catch (error) {
      alert('Failed to add item to cart.');
      console.error(error);
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setOpen(true);
      return;
    }

    handleAddCartItem();
  };

  const handleSignIn = () => {
    setPendingCartItem({ productId: id, quantity });
  };

  const handleCancel = () => {
    removePendingCartItem();
  };

  return (
    <>
      <SignInRequiredAlert
        open={open}
        onOpenChange={setOpen}
        onSignIn={handleSignIn}
        onCancel={handleCancel}
      />
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
          alt=''
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

                    'text-primary-700',
                  )}
                >
                  New product
                </span>
              )}
              <h1
                id={headingId}
                className={cn(
                  'text-xl',

                  'lg:text-3xl',

                  'text-black',
                  'uppercase',
                )}
              >
                {name}
              </h1>
            </div>
            <p>{description}</p>
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
              min={1}
              onChange={setQuantity}
              className={cn('max-inline-30')}
            />
            <Button
              variant='primary'
              onClick={handleAddToCart}
              aria-label={
                isLoading ? `Adding to cart - ${name}` : `Add to cart - ${name}`
              }
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner
                    aria-label={`Adding ${name} to cart`}
                    variant='primary'
                    size='sm'
                  />
                  Adding to cart...
                </>
              ) : (
                <>Add to cart</>
              )}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetailsCard;
