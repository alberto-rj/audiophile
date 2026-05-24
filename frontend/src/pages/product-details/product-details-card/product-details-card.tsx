import { useId, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectIsAuthenticated } from '@/app/features/auth';
import { useAddCartItemMutation } from '@/app/services/cart-api';
import {
  QuantitySelector,
  ResponsiveImage,
  SignInRequiredAlert,
  StatusVisuallyHidden,
} from '@/components/widgets';
import { Button, Spinner } from '@/components/ui';
import { cn } from '@/libs/cn';
import { setPendingCartItem, toMoney } from '@/libs/helpers';
import type { Product } from '@/libs/types';
import { useToast } from '@/hooks';

interface ProductDetailsCardProps {
  product: Product;
  className?: string;
}

const ProductDetailsCard = ({
  product: { id, image, name, description, price, isNew },
  className,
}: ProductDetailsCardProps) => {
  const headingId = useId();

  const [isSignAlertOpen, setIsSignAlertOpen] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [addCartItem, { isLoading }] = useAddCartItemMutation();

  const toast = useToast();

  const formattedPrice = toMoney(price);

  const handleAddCartItem = async () => {
    try {
      await addCartItem({ productId: id, quantity }).unwrap();
    } catch {
      toast.error({
        title: 'Add to cart failed',
        description:
          "We couldn't add this item to your cart. Please try again.",
      });
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setIsSignAlertOpen(true);
      return;
    }

    handleAddCartItem();
  };

  const handleSignIn = () => {
    setPendingCartItem({ productId: id, quantity });
  };

  return (
    <>
      <SignInRequiredAlert
        open={isSignAlertOpen}
        onOpenChange={setIsSignAlertOpen}
        title='Sign in required'
        description='Sign in to add items to your cart.'
        onSignIn={handleSignIn}
      />
      <StatusVisuallyHidden>
        {isLoading ? `Adding ${name} to your cart...` : ''}
      </StatusVisuallyHidden>
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
              <dt className={cn('sr-only')}>Price</dt>
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
              onClick={handleAddToCart}
              disabled={isLoading || undefined}
            >
              {isLoading ? (
                <>
                  <Spinner size='sm' />
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
