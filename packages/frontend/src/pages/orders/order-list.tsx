import type { ApiOrder } from '@audiophile/shared';

import { cn } from '@/libs/cn';

import OrderCard from './order-card';

interface OrderListProps {
  orders: ApiOrder[];
}

const OrderList = ({ orders }: OrderListProps) => {
  return (
    <>
      {orders.length === 0 ? (
        <p className={cn('text-center')}>You have no orders yet.</p>
      ) : (
        <ul
          role="list"
          className={cn(
            'inline-full',
            'grid',
            'grid-cols-1',
            'items-center',
            'gap-8',

            'md:grid-cols-2',
            'md:justify-center',

            'lg:grid-cols-3',
          )}
        >
          {orders.map((order) => (
            <li
              key={order.id}
              className={cn('inline-full', 'flex', 'justify-center')}
            >
              <OrderCard order={order} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default OrderList;
