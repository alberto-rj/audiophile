import { GoBack } from '@/components/widgets';
import { useSecondaryPage } from '@/hooks';
import { cn } from '@/libs/cn';
import { orders } from '@/libs/mocks/orders';

import OrderList from './order-list';

const OrdersPage = () => {
  useSecondaryPage();

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
          My Orders
        </h1>
        <OrderList orders={orders} />
      </div>
    </>
  );
};

export default OrdersPage;
