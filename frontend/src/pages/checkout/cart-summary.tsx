import { useId } from 'react';

import { cn } from '@/libs/cn';
import { toMoney } from '@/libs/helpers';

const cartItems = [
  {
    image: 'https://tempimg.cc/64x64',
    name: 'xx99 Mk II',
    price: 2999,
    quantity: 2,
  },
  {
    image: 'https://tempimg.cc/64x64',
    name: 'xx59',
    price: 899,
    quantity: 3,
  },
  {
    image: 'https://tempimg.cc/64x64',
    name: 'yx1',
    price: 599,
    quantity: 1,
  },
];

const cartSummary = [
  { name: 'Total', value: 5396, isHighlighted: false },
  { name: 'Shipping', value: 50, isHighlighted: false },
  { name: 'VAT (Included)', value: 1079, isHighlighted: false },
  { name: 'Grand Total', value: 5446, isHighlighted: true },
];

export const CartSummary = () => {
  const summaryHeadingId = useId();

  return (
    <section aria-labelledby={summaryHeadingId}>
      <h2
        id={summaryHeadingId}
        className={cn('uppercase', 'text-md', 'text-black')}
      >
        Summary
      </h2>
      <ul
        role='list'
        className={cn('py-8', 'flex', 'flex-col', 'gap-6')}
      >
        {cartItems.map(({ image, name, price, quantity }) => (
          <li
            key={name}
            className={cn('flex', 'justify-between', 'items-start', 'gap-8')}
          >
            <div className={cn('flex', 'items-center', 'gap-4')}>
              <img
                src={image}
                className={cn(
                  'aspect-64/64',
                  'object-cover',
                  'rounded-lg',
                  'overflow-hidden',
                )}
                alt=''
                width={64}
                height={64}
              />
              <div className={cn('flex', 'flex-col')}>
                <span
                  className={cn(
                    'text-base',

                    'text-black',
                    'uppercase',
                    'font-bold',
                  )}
                >
                  {name}
                </span>
                <span
                  className={cn(
                    'uppercase',
                    'text-xs',

                    'font-bold',
                    'text-black-o-50',
                  )}
                >
                  {toMoney(price)}
                </span>
              </div>
            </div>
            <div>
              <span className={cn('sr-only')}>Times: {quantity}</span>
              <span
                aria-hidden={true}
                className={cn(
                  'text-base',

                  'font-bold',
                  'text-black-o-50',
                )}
              >
                x{quantity}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <dl className={cn('flex', 'flex-col', 'gap-2')}>
        {cartSummary.map(({ name, value, isHighlighted }) => (
          <div
            key={name}
            className={cn('flex', 'justify-between', 'items-center', 'gap-8', {
              'mbs-4': isHighlighted,
            })}
          >
            <dt
              className={cn(
                'uppercase',
                'text-base',

                'text-black-o-50',
              )}
            >
              {name}
            </dt>
            <dd
              className={cn(
                'uppercase',
                'text-md',

                {
                  'text-primary-400': isHighlighted,
                  'text-black': !isHighlighted,
                },
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
