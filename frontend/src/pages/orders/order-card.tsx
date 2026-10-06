import { useId } from 'react';
import { Link } from 'react-router-dom';

import { ChevronDown } from '@/assets/icons';
import { Card, DropdownMenu } from '@/components/ui';
import { OrderStatusBadge } from '@/components/widgets';
import { APP_ROUTES } from '@/config/app-routes';
import { cn } from '@/libs/cn';
import {
  toMoney,
  toTimeAgo,
  getItemsCount,
  toOrderNumber,
  toPaymentMethodText,
} from '@/libs/helpers';
import type { Order } from '@/libs/types';

interface OrderCardMenuProps {
  order: Order;
}

const OrderCardMenu = ({ order: { id, status } }: OrderCardMenuProps) => {
  const handleCancel = async () => {};
  const handleRemove = async () => {};

  const isCancellable =
    status !== 'cancelled' && status !== 'shipped' && status !== 'delivered';

  const isRemovable = status === 'cancelled' || status === 'delivered';

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger type="button">
        <ChevronDown
          focusable={false}
          aria-hidden={true}
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className={cn('min-inline-fit')}>
          <DropdownMenu.Item>
            <Link
              aria-label={`View order - ${id}`}
              to={`${APP_ROUTES.orders}/${id}`}
              className={cn('outline-none', 'text-inherit')}
            >
              View order
            </Link>
          </DropdownMenu.Item>
          {(isCancellable || isRemovable) && <DropdownMenu.Separator />}

          {isCancellable && (
            <DropdownMenu.Item onSelect={handleCancel}>
              Cancel
            </DropdownMenu.Item>
          )}
          {isRemovable && (
            <DropdownMenu.Item onSelect={handleRemove}>
              Remove
            </DropdownMenu.Item>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu>
  );
};

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  const headingId = useId();

  const { createdAt, id, items, subtotal, paymentMethod, status } = order;

  const details = [
    {
      name: 'Created at',
      value: toTimeAgo(createdAt),
    },
    {
      name: 'Number of items',
      value: getItemsCount(items ?? []),
    },
    {
      name: 'Payment method',
      value: toPaymentMethodText(paymentMethod),
    },
  ];

  return (
    <Card asChild>
      <article
        aria-labelledby={headingId}
        className={cn('inline-full', 'max-inline-96')}
      >
        <div
          className={cn(
            'flex',
            'justify-between',
            'items-center',
            'gap-4',
            'p-6',

            'border-be',
            'border-be-gray-300',
          )}
        >
          <h2
            id={headingId}
            className={cn('h6')}
          >
            Order {toOrderNumber(id)}
          </h2>
          <OrderCardMenu order={order} />
        </div>
        <div className={cn('p-6')}>
          <dl className={cn('flex', 'flex-col', 'gap-2')}>
            {details.map(({ name, value }) => (
              <div
                key={name}
                className={cn(
                  'flex',
                  'justify-between',
                  'items-center',
                  'gap-6',

                  'uppercase',
                )}
              >
                <dt>{name}</dt>
                <dd className={cn('h8')}>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div
          className={cn(
            'p-6',

            'border-bs',
            'border-gray-300',
          )}
        >
          <div
            className={cn('flex', 'justify-between', 'items-center', 'gap-6')}
          >
            <OrderStatusBadge status={status} />
            <dl>
              <dt className={cn('sr-only')}>Subtotal</dt>
              <dd className={cn('h6')}>{toMoney(subtotal)}</dd>
            </dl>
          </div>
        </div>
      </article>
    </Card>
  );
};

export default OrderCard;
