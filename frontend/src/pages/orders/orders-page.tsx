import { useGetOrdersQuery } from '@/app/services/orders-api';
import { Spinner } from '@/components/ui';
import { ErrorMessage, GoBack } from '@/components/widgets';
import { useSecondaryPage } from '@/hooks';
import { cn } from '@/libs/cn';

import OrderList from './order-list';

const OrdersPageQuery = () => {
  const { isLoading, isError, data, refetch } = useGetOrdersQuery();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <ErrorMessage>
        <ErrorMessage.Description>
          We couldn't load your orders. Please try again.
        </ErrorMessage.Description>

        <ErrorMessage.Retry
          onClick={refetch}
          aria-label='Try again loading orders'
        >
          Try again
        </ErrorMessage.Retry>
      </ErrorMessage>
    );
  }

  return <OrderList orders={data!.orders} />;
};

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
        <OrdersPageQuery />
      </div>
    </>
  );
};

export default OrdersPage;
