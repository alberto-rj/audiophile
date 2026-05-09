import { cn } from '@/libs/cn';
import type { Order } from '@/libs/types';

import OrderCard from './order-card';

interface OrderListProps {
  orders: Order[];
}

const OrderList = ({ orders }: OrderListProps) => {
  return (
    <>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <ul
          role='list'
          className={cn(
            'inline-full',
            'flex',
            'flex-col',
            'items-center',
            'gap-8',
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
