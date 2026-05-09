import { useId } from 'react';
import { Link } from 'react-router-dom';

import { Button, Card } from '@/components/ui';
import { APP_ROUTES } from '@/config/app-routes';
import { cn } from '@/libs/cn';
import { toStatusText, toMoney, toTimeAgo } from '@/libs/helpers';
import type { Order } from '@/libs/types';

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({
  order: { createdAt, id, items, subtotal, status },
}: OrderCardProps) => {
  const headingId = useId();

  const orderSummary = [
    {
      isHighlighted: false,
      name: 'Order number',
      value: id,
    },
    {
      isHighlighted: false,
      name: 'Created at',
      value: toTimeAgo(createdAt),
    },
    {
      isHighlighted: false,
      name: 'Number of items',
      value: items?.length || 0,
    },
    {
      isHighlighted: false,
      name: 'Subtotal',
      value: toMoney(subtotal),
    },
    {
      isHighlighted: true,
      name: 'Status',
      value: toStatusText(status),
    },
  ];

  return (
    <Card
      className={cn(
        'inline-full',
        'max-inline-140',
        'p-6',

        'md:p-8',

        'border-bs-4',
        {
          'border-(--order-delivered)': status === 'delivered',
          'border-(--order-cancelled)': status === 'cancelled',
          'border-(--order-processing)': status === 'processing',
          'border-(--order-pending)': status === 'pending',
          'border-(--order-shipped)': status === 'shipped',
        },
      )}
      asChild
    >
      <article aria-labelledby={headingId}>
        <h2
          id={headingId}
          className={cn('sr-only')}
        >
          Order summary - {id}
        </h2>
        <div
          className={cn(
            'flex',
            'flex-col',
            'gap-8',

            'uppercase',
          )}
        >
          <ul
            role='list'
            className={cn('flex', 'flex-col', 'gap-8', 'md:gap-2')}
          >
            {orderSummary.map(({ isHighlighted, name, value }) => (
              <li key={name}>
                <dl
                  className={cn(
                    'flex',
                    'flex-col',
                    'justify-between',
                    'items-center',
                    'gap-1',
                    'text-center',

                    'md:flex-row',
                    'md:text-start',
                  )}
                >
                  <dt>{name}</dt>
                  <dd
                    className={cn(
                      'flex',
                      'items-center',
                      'gap-2',
                      'text-md',

                      isHighlighted && {
                        'text-(--order-delivered)': status === 'delivered',
                        'text-(--order-cancelled)': status === 'cancelled',
                        'text-(--order-processing)': status === 'processing',
                        'text-(--order-pending)': status === 'pending',
                        'text-(--order-shipped)': status === 'shipped',
                      },
                    )}
                  >
                    {value}
                  </dd>
                </dl>
              </li>
            ))}
          </ul>

          <Button
            variant={'link'}
            className={cn('md:self-end')}
            asChild
          >
            <Link
              aria-label={`View order - ${id}`}
              to={`${APP_ROUTES.orders}/${id}`}
            >
              View order
            </Link>
          </Button>
        </div>
      </article>
    </Card>
  );
};

export default OrderCard;
