import { useGetOrdersQuery } from '@/app/services/orders-api';
import { ErrorMessage, GoBack } from '@/components/widgets';
import { Spinner } from '@/components/ui';
import { useSecondaryPage } from '@/hooks';
import { cn } from '@/libs/cn';

import OrderList from './order-list';

const OrdersPage = () => {
  useSecondaryPage();

  const { isLoading, isError, data, refetch } = useGetOrdersQuery();

  if (isLoading) {
    return (
      <Spinner
        aria-label='Loading orders...'
        className={cn('mx-auto')}
      />
    );
  }

  if (isError) {
    return (
      <ErrorMessage>
        <ErrorMessage.Description>
          Failed to load orders.
        </ErrorMessage.Description>
        <ErrorMessage.Retry
          onClick={refetch}
          aria-label='Try again - reload orders'
        >
          Try again
        </ErrorMessage.Retry>
      </ErrorMessage>
    );
  }

  const orders = data!.orders;

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
