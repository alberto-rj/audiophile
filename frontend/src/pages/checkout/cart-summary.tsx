import { useId } from 'react';

import { useGetCartQuery } from '@/app/services/cart-api';
import { Spinner } from '@/components/ui';
import { ErrorMessage, ResponsiveImage } from '@/components/widgets';
import { cn } from '@/libs/cn';
import { toMoney } from '@/libs/helpers';
import type { Cart } from '@/libs/types';

interface CartSummaryProps {
  cart: Cart;
}

export const CartSummary = ({ cart }: CartSummaryProps) => {
  const summaryHeadingId = useId();

  const { items, subtotal, shipping, vat, grandTotal } = cart;

  const cartSummary = [
    { name: 'Subtotal', value: subtotal, isHighlighted: false },
    { name: 'Shipping', value: shipping, isHighlighted: false },
    { name: 'VAT (Included)', value: vat, isHighlighted: false },
    { name: 'Grand Total', value: grandTotal, isHighlighted: true },
  ];

  return (
    <section aria-labelledby={summaryHeadingId}>
      <h2
        id={summaryHeadingId}
        className={cn('h6')}
      >
        Summary
      </h2>
      <ul
        role='list'
        className={cn(
          'flex',
          'flex-col',
          'gap-6',
          'inline-full',
          'max-block-80',
          'pe-4',
          'my-8',
          'overflow-auto',
        )}
      >
        {items.map(({ id, image, name, price, quantity }) => (
          <li
            key={id}
            className={cn('flex', 'justify-between', 'items-start', 'gap-8')}
          >
            <div className={cn('flex', 'items-center', 'gap-4')}>
              <ResponsiveImage
                alt=''
                width={64}
                height={64}
                loading='lazy'
                image={image}
                className={cn(
                  'aspect-64/64',

                  'rounded-lg',
                  'object-cover',
                )}
              />
              <div
                className={cn(
                  'flex',
                  'flex-col',
                  'max-inline-24',
                  'sm:max-inline-30',
                )}
              >
                <span
                  className={cn(
                    'truncate',

                    'text-black',
                    'uppercase',
                    'font-bold',
                  )}
                >
                  {name}
                </span>
                <span className={cn('uppercase', 'text-xs', 'truncate')}>
                  {toMoney(price)}
                </span>
              </div>
            </div>
            <div>
              <span className={cn('sr-only')}>Times: {quantity}</span>
              <span
                aria-hidden={true}
                className={cn('font-bold')}
              >
                x{quantity}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <dl className={cn('flex', 'flex-col', 'gap-2', 'overflow-auto')}>
        {cartSummary.map(({ name, value, isHighlighted }) => (
          <div
            key={name}
            className={cn('flex', 'justify-between', 'items-center', 'gap-8', {
              'mbs-4': isHighlighted,
            })}
          >
            <dt className={cn('uppercase')}>{name}</dt>
            <dd
              className={cn(
                'text-md',
                'truncate',
                'max-inline-20',

                'md:max-inline-full',

                'lg:max-inline-35',

                {
                  'text-primary-700': isHighlighted,
                  'text-black': !isHighlighted,
                },
                'uppercase',
              )}
            >
              {toMoney(value)}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export const CartSummaryQuery = () => {
  const { isLoading, isError, refetch, data } = useGetCartQuery();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <ErrorMessage>
        <ErrorMessage.Description>
          We could not load your cart. Please try again.
        </ErrorMessage.Description>

        <ErrorMessage.Retry
          onClick={refetch}
          aria-label='Try again loading cart'
        >
          Try again
        </ErrorMessage.Retry>
      </ErrorMessage>
    );
  }

  return <CartSummary cart={data!.cart} />;
};
