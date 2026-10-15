import type { ApiOrder } from '@audiophile/shared';

import { Card } from '@/components/ui';
import { OrderStatusBadge } from '@/components/widgets';
import { cn } from '@/libs/cn';
import {
  getItemsCount,
  toOrderNumber,
  toPaymentMethodText,
  toTimeAgo,
} from '@/libs/helpers';

interface BaseOrderDetailsProps {
  order: ApiOrder;
}

const BasicOrderDetails = ({ order }: BaseOrderDetailsProps) => {
  const { id, createdAt, status, paymentMethod, items } = order;

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
    <section>
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
        <h2 className={cn('h6')}>Order {toOrderNumber(id)}</h2>
        <OrderStatusBadge status={status} />
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
    </section>
  );
};

const OrderDeliveryDetails = ({ order }: BaseOrderDetailsProps) => {
  const shippingInfo = [
    {
      name: 'Client',
      value: order.name,
    },
    {
      name: 'Address',
      value: order.address,
    },
    {
      name: 'Zip code',
      value: order.zip,
    },
    {
      name: 'City',
      value: order.city,
    },
    {
      name: 'Country',
      value: order.country,
    },
  ];

  return (
    <section>
      <div
        className={cn(
          'p-6',

          'border-bs',
          'border-gray-300',
        )}
      >
        <h2 className={cn('h6')}>Delivery details</h2>
      </div>
      <div
        className={cn(
          'p-6',

          'border-bs',
          'border-gray-300',
        )}
      >
        <dl className={cn('flex', 'flex-col', 'gap-2')}>
          {shippingInfo.map(({ name, value }) => (
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
    </section>
  );
};

interface BasicOrderCardProps {
  order: ApiOrder;
}

export const BasicOrderCard = ({ order }: BasicOrderCardProps) => {
  return (
    <Card className={cn('inline-full', 'max-inline-110')}>
      <BasicOrderDetails order={order} />
      <OrderDeliveryDetails order={order} />
    </Card>
  );
};
