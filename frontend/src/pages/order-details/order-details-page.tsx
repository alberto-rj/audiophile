import type { ReactNode } from 'react';
import { useParams } from 'react-router-dom';

import { useGetOrderByIdQuery } from '@/app/services/orders-api';
import { Card, Spinner } from '@/components/ui';
import { ErrorMessage, GoBack } from '@/components/widgets';
import { useSecondaryPage } from '@/hooks';
import { cn } from '@/libs/cn';
import {
  toMoney,
  toOrderNumber,
  toStatusText,
  toTimeAgo,
} from '@/libs/helpers';
import type { Order } from '@/libs/types';

interface OrderCardProps {
  order: Order;
  children: ReactNode;
}

const OrderCard = ({ order, children }: OrderCardProps) => {
  const { status: orderStatus } = order;

  return (
    <Card
      className={cn(
        'max-inline-110',
        'flex',
        'flex-col',
        'gap-8',

        'border-bs-4',
        {
          'border-(--order-delivered)': orderStatus === 'delivered',
          'border-(--order-pending)': orderStatus === 'pending',
          'border-(--order-shipped)': orderStatus === 'shipped',
          'border-(--order-cancelled)': orderStatus === 'cancelled',
          'border-(--order-processing)': orderStatus === 'processing',
        },
      )}
    >
      {children}
    </Card>
  );
};

interface BaseCardProps {
  order: Order;
}

const BasicInfoCard = ({ order }: BaseCardProps) => {
  const orderStatus = order.status;

  const basicInfo = [
    {
      name: 'Number',
      value: toOrderNumber(order.id),
      isHighlighted: false,
    },
    {
      name: 'Created at',
      value: toTimeAgo(order.createdAt),
      isHighlighted: false,
    },
    {
      name: 'Status',
      value: toStatusText(order.status),
      isHighlighted: true,
    },
  ];

  return (
    <OrderCard order={order}>
      <h2 className={cn('h6')}>Order {toOrderNumber(order.id)}</h2>
      <dl className={cn('flex', 'flex-col', 'gap-2')}>
        {basicInfo.map(({ name, value, isHighlighted }) => (
          <div
            key={name}
            className={cn('flex', 'justify-between', 'items-center', 'gap-8', {
              'mbs-4': isHighlighted,
            })}
          >
            <dt className={cn('uppercase')}>{name}</dt>
            <dd
              className={cn(
                'text-2xs',
                {
                  'text-(--order-delivered)':
                    isHighlighted && orderStatus === 'delivered',
                  'text-(--order-pending)':
                    isHighlighted && orderStatus === 'pending',
                  'text-(--order-shipped)':
                    isHighlighted && orderStatus === 'shipped',
                  'text-(--order-cancelled)':
                    isHighlighted && orderStatus === 'cancelled',
                  'text-(--order-processing)':
                    isHighlighted && orderStatus === 'processing',
                  'text-black': !isHighlighted,
                },
                'uppercase',
              )}
            >
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </OrderCard>
  );
};

const ItemsOrderedCard = ({ order }: BaseCardProps) => {
  return (
    <OrderCard order={order}>
      <h2 className={cn('h6')}>Items</h2>
      <ul
        role='list'
        className={cn('flex', 'flex-col', 'gap-6')}
      >
        {order.items?.map((item) => (
          <li
            key={item.id}
            className={cn('flex', 'justify-between', 'items-start', 'gap-8')}
          >
            <div className={cn('flex', 'items-center', 'gap-4')}>
              <img
                alt={`${item.name}`}
                src={item.image}
                width={64}
                height={64}
                loading='lazy'
                className={cn(
                  'aspect-64/64',

                  'rounded-lg',
                )}
              />
              <div className={cn('flex', 'flex-col', 'gap-1')}>
                <p className={cn('text-black', 'font-bold')}>{item.name}</p>
                <p className={cn('text-xs')}>{toMoney(item.price)}</p>
              </div>
            </div>
            <dl>
              <dt className={cn('sr-only')}>Quantity</dt>
              <dd>
                <span className={cn('sr-only')}>{item.quantity}</span>
                <span
                  className={cn('font-bold')}
                  aria-hidden={true}
                >
                  x{item.quantity}
                </span>
              </dd>
            </dl>
          </li>
        ))}
      </ul>
    </OrderCard>
  );
};

const SummaryCard = ({ order }: BaseCardProps) => {
  const orderStatus = order.status;

  const orderSummary = [
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
    <OrderCard order={order}>
      <h2 className={cn('h6')}>Order summary</h2>
      <dl className={cn('flex', 'flex-col', 'gap-2')}>
        {orderSummary.map(({ name, value, isHighlighted }) => (
          <div
            key={name}
            className={cn('flex', 'justify-between', 'items-center', 'gap-8', {
              'mbs-4': isHighlighted,
            })}
          >
            <dt className={cn('uppercase')}>{name}</dt>
            <dd
              className={cn(
                'max-inline-20',
                'text-xs',
                'truncate',

                'md:max-inline-full',

                'lg:max-inline-35',

                {
                  'text-(--order-delivered)':
                    isHighlighted && orderStatus === 'delivered',
                  'text-(--order-pending)':
                    isHighlighted && orderStatus === 'pending',
                  'text-(--order-shipped)':
                    isHighlighted && orderStatus === 'shipped',
                  'text-(--order-cancelled)':
                    isHighlighted && orderStatus === 'cancelled',
                  'text-(--order-processing)':
                    isHighlighted && orderStatus === 'processing',
                  'text-black': !isHighlighted,
                },
                'uppercase',
              )}
            >
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </OrderCard>
  );
};

const ShippingAddressCard = ({ order }: BaseCardProps) => {
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
    <OrderCard order={order}>
      <h2 className={cn('h6')}>Delivery details</h2>
      <dl className={cn('flex', 'flex-col', 'gap-2')}>
        {shippingInfo.map(({ name, value }) => (
          <div
            key={name}
            className={cn('flex', 'justify-between', 'items-center', 'gap-6')}
          >
            <dt className={cn('uppercase')}>{name}</dt>
            <dd
              className={cn(
                'max-inline-40',
                'text-2xs',
                'truncate',

                'md:max-inline-full',

                'text-black',
                'uppercase',
              )}
            >
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </OrderCard>
  );
};

const OrderDetailsPage = () => {
  useSecondaryPage();

  const slug = useParams()?.slug;
  const orderId = slug ? parseInt(slug, 10) : undefined;

  const { isLoading, isError, refetch, data } = useGetOrderByIdQuery(orderId!, {
    skip: typeof orderId === 'undefined',
  });

  if (isLoading) {
    return (
      <Spinner
        aria-label='Loading order...'
        className={cn('mx-auto')}
      />
    );
  }

  if (isError) {
    return (
      <ErrorMessage>
        <ErrorMessage.Description>
          Failed to load order.
        </ErrorMessage.Description>
        <ErrorMessage.Retry
          onClick={refetch}
          aria-label='Try again - reload order'
        >
          Try again
        </ErrorMessage.Retry>
      </ErrorMessage>
    );
  }

  const order = data!.order;

  return (
    <>
      <GoBack>
        <GoBack.Control />
      </GoBack>
      <div
        className={cn(
          'region-end',
          'wrapper',
          'flex',
          'flex-col',
          'items-center',
          'gap-8',

          'md:gap-24',
        )}
      >
        <h1
          className={cn(
            'text-center',
            'text-xl',

            'lg:text-2xl',

            'text-black',
            'uppercase',
          )}
        >
          Order details
        </h1>
        <div
          className={cn(
            'inline-full',
            'grid',
            'gap-12',

            'md:grid-cols-2',
            'md:items-start',
            'md:justify-center',
            'md:justify-items-center',
          )}
        >
          <BasicInfoCard order={order} />
          <ShippingAddressCard order={order} />
          <ItemsOrderedCard order={order} />
          <SummaryCard order={order} />
        </div>
      </div>
    </>
  );
};

export default OrderDetailsPage;
