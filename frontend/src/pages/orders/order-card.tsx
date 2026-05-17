import { useId } from 'react';
import { Link } from 'react-router-dom';

import { ChevronDown } from '@/assets/icons';
import { Card, DropdownMenu } from '@/components/ui';
import { APP_ROUTES } from '@/config/app-routes';
import { cn } from '@/libs/cn';
import {
  toStatusText,
  toMoney,
  toTimeAgo,
  getItemsCount,
  toOrderNumber,
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
      <DropdownMenu.Trigger type='button'>
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

  const { createdAt, id, items, subtotal, status } = order;

  return (
    <Card
      className={cn('inline-full', 'max-inline-96')}
      asChild
    >
      <article aria-labelledby={headingId}>
        <div
          className={cn(
            'inline-full',
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
        <div className={cn('inline-full', 'p-6')}>
          <dl className={cn('flex', 'flex-col', 'gap-2')}>
            <div
              className={cn('flex', 'justify-between', 'items-center', 'gap-6')}
            >
              <dt>Created on:</dt>
              <dd>{toTimeAgo(createdAt)}</dd>
            </div>
            <div
              className={cn('flex', 'justify-between', 'items-center', 'gap-6')}
            >
              <dt>Number of items:</dt>
              <dd>{getItemsCount(items ?? [])}</dd>
            </div>
          </dl>
        </div>

        <div
          className={cn(
            'inline-full',
            'p-6',

            'border-bs',
            'border-gray-300',
          )}
        >
          <dl
            className={cn('flex', 'justify-between', 'items-center', 'gap-6')}
          >
            <div>
              <dt className={cn('sr-only')}>Status</dt>
              <dd
                className={cn(
                  'inline-fit',
                  'py-1',
                  'px-3',

                  'h8',
                  'rounded-lg',

                  {
                    'bg-success-50': status === 'delivered',
                    'text-success-1400': status === 'delivered',
                    'bg-info-50': status === 'processing',
                    'text-info-950': status === 'processing',
                    'bg-warning-100': status === 'pending',
                    'text-warning-1100': status === 'pending',
                    'bg-danger-300': status === 'cancelled',
                    'text-danger-950': status === 'cancelled',
                    'bg-primary-50': status === 'shipped',
                    'text-primary-950': status === 'shipped',
                  },
                )}
              >
                {toStatusText(status)}
              </dd>
            </div>
            <div>
              <dt className={cn('sr-only')}>Subtotal</dt>
              <dd className={cn('h6')}>{toMoney(subtotal)}</dd>
            </div>
          </dl>
        </div>
      </article>
    </Card>
  );
};

export default OrderCard;
