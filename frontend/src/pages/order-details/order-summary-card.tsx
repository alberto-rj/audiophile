import { Card } from '@/components/ui';
import { cn } from '@/libs/cn';
import { toMoney } from '@/libs/helpers';
import type { Order, OrderItem } from '@/libs/types';

interface OrderItemsListProps {
  items: OrderItem[];
}

const OrderItemsList = ({ items }: OrderItemsListProps) => {
  return (
    <ul
      role="list"
      className={cn(
        'max-block-80',
        'overflow-auto',
        'my-6',
        'pe-4',
        'flex',
        'flex-col',
        'gap-6',
      )}
    >
      {items.map(({ id, image, name, price, quantity }) => (
        <li
          key={id}
          className={cn('flex', 'justify-between', 'items-start', 'gap-8')}
        >
          <div className={cn('flex', 'items-center', 'gap-4')}>
            <img
              alt={`${name}`}
              src={image}
              width={64}
              height={64}
              loading="lazy"
              className={cn(
                'aspect-64/64',

                'rounded-lg',
              )}
            />
            <div
              className={cn(
                'flex',
                'flex-col',
                'gap-1',
                'max-inline-20',

                'sm:max-inline-30',

                'md:max-inline-60',

                'uppercase',
              )}
            >
              <p
                className={cn(
                  'truncate',

                  'text-black',
                  'font-bold',
                )}
              >
                {name}
              </p>
              <p className={cn('truncate', 'text-xs')}>{toMoney(price)}</p>
            </div>
          </div>
          <dl>
            <dt className={cn('sr-only')}>Quantity</dt>
            <dd>
              <span className={cn('sr-only')}>{quantity}</span>
              <span
                className={cn('font-bold')}
                aria-hidden={true}
              >
                x{quantity}
              </span>
            </dd>
          </dl>
        </li>
      ))}
    </ul>
  );
};

interface OrderSummaryCardProps {
  order: Order;
}

export const OrderSummaryCard = ({ order }: OrderSummaryCardProps) => {
  const orderSummaryCard = [
    {
      name: 'Subtotal',
      value: toMoney(order.subtotal),
      isHighlighted: false,
    },
    {
      name: 'Shipping',
      value: toMoney(order.shipping),
      isHighlighted: false,
    },
    {
      name: 'VAT (Included)',
      value: toMoney(order.vat),
      isHighlighted: false,
    },
    {
      name: 'Grand Total',
      value: toMoney(order.grandTotal),
      isHighlighted: true,
    },
  ];

  return (
    <Card asChild>
      <section className={cn('inline-full', 'max-inline-110', 'p-6')}>
        <h2 className={cn('h6')}>Summary</h2>
        <OrderItemsList items={order.items!} />
        <dl
          className={cn(
            'flex',
            'flex-col',
            'gap-2',

            'uppercase',
          )}
        >
          {orderSummaryCard.map(({ name, value, isHighlighted }) => (
            <div
              key={name}
              className={cn(
                'flex',
                'justify-between',
                'items-center',
                'gap-8',
                {
                  'mbs-3': isHighlighted,
                },
              )}
            >
              <dt>{name}</dt>
              <dd
                className={cn(
                  'max-inline-20',
                  'text-md',
                  'truncate',

                  'md:max-inline-full',

                  'lg:max-inline-35',

                  {
                    'text-primary-700': isHighlighted,
                    'text-black': !isHighlighted,
                  },
                )}
              >
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </Card>
  );
};
