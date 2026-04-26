import { useId } from 'react';
import { useSelector } from 'react-redux';

import {
  selectGrandTotal,
  selectItems,
  selectShipping,
  selectSubtotal,
  selectVAT,
} from '@/app/features/cart';
import { cn } from '@/libs/cn';
import { toMoney } from '@/libs/helpers';
import { ResponsiveImage } from '@/components/widgets';

export const CartSummary = () => {
  const summaryHeadingId = useId();

  const cartItems = useSelector(selectItems);
  const total = useSelector(selectSubtotal);
  const shipping = useSelector(selectShipping);
  const VAT = useSelector(selectVAT);
  const grandTotal = useSelector(selectGrandTotal);

  const cartSummary = [
    { name: 'Total', value: total, isHighlighted: false },
    { name: 'Shipping', value: shipping, isHighlighted: false },
    { name: 'VAT (Included)', value: VAT, isHighlighted: false },
    { name: 'Grand Total', value: grandTotal, isHighlighted: true },
  ];

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
        {cartItems.map(({ image, name, price, quantity }) => (
          <li
            key={name}
            className={cn('flex', 'justify-between', 'items-start', 'gap-8')}
          >
            <div className={cn('flex', 'items-center', 'gap-4')}>
              <ResponsiveImage
                alt=''
                image={image}
                className={cn(
                  'aspect-64/64',
                  'object-cover',
                  'rounded-lg',
                  'overflow-hidden',
                )}
                width={64}
                height={64}
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
                    'text-base',
                    'truncate',

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
                    'truncate',

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
                  'text-black/50',
                )}
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
            <dt
              className={cn(
                'uppercase',
                'text-base',

                'text-black/50',
              )}
            >
              {name}
            </dt>
            <dd
              className={cn(
                'uppercase',
                'text-md',
                'truncate',
                'max-inline-20',

                'md:max-inline-full',

                'lg:max-inline-35',

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
