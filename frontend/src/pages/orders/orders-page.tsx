import type { ApiOrderListingQuery } from '@audiophile/shared';

import { useGetOrdersQuery } from '@/app/services/orders-api';
import { Spinner } from '@/components/ui';
import {
  ErrorMessage,
  GoBack,
  SEO,
  StatusVisuallyHidden,
} from '@/components/widgets';
import { useSecondaryPage } from '@/hooks';
import { cn } from '@/libs/cn';

import OrderList from './order-list';

interface OrdersPageQueryProps {
  filters?: Partial<ApiOrderListingQuery>;
}

const OrdersPageQuery = ({ filters }: OrdersPageQueryProps) => {
  const { isLoading, isError, data, refetch } = useGetOrdersQuery(filters);

  if (isLoading) {
    return (
      <>
        <StatusVisuallyHidden>
          Loading your order history...
        </StatusVisuallyHidden>
        <Spinner className={cn('mx-auto')} />
      </>
    );
  }

  if (isError || !data?.results) {
    return (
      <ErrorMessage>
        <ErrorMessage.Description>
          We couldn't load your order history. Please try again.
        </ErrorMessage.Description>
        <ErrorMessage.Retry onClick={refetch}>Try again</ErrorMessage.Retry>
      </ErrorMessage>
    );
  }

  const { results: orders } = data;

  return <OrderList orders={orders} />;
};

const OrdersPage = () => {
  useSecondaryPage();

  return (
    <>
      <SEO
        metadata={{
          title: 'My Orders | Audiophile',
          description:
            'View and track your order history at Audiophile. Check order status, details, and past purchases in one place.',
        }}
      />
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
