import { useParams } from 'react-router-dom';

import { useGetOrderByIdQuery } from '@/app/services/orders-api';
import { Spinner } from '@/components/ui';
import {
  ErrorMessage,
  GoBack,
  SEO,
  StatusVisuallyHidden,
} from '@/components/widgets';
import { useSecondaryPage } from '@/hooks';
import { cn } from '@/libs/cn';

import { OrderDetails } from './order-details';

const OrderDetailsPageQuery = () => {
  const { slug } = useParams() as { slug?: string };

  const orderId = typeof slug === 'string' ? parseInt(slug, 10) : undefined;

  const { isLoading, isError, refetch, data } = useGetOrderByIdQuery(orderId!, {
    skip: !orderId,
  });

  if (isLoading) {
    return (
      <>
        <StatusVisuallyHidden>
          Loading your order details...
        </StatusVisuallyHidden>
        <Spinner className={cn('mx-auto')} />
      </>
    );
  }

  if (isError || !data?.results?.[0]) {
    return (
      <ErrorMessage>
        <ErrorMessage.Description>
          We couldn't load your order details. Please try again.
        </ErrorMessage.Description>
        <ErrorMessage.Retry onClick={refetch}>Try again</ErrorMessage.Retry>
      </ErrorMessage>
    );
  }

  const [order] = data.results;

  return <OrderDetails order={order} />;
};

const OrderDetailsPage = () => {
  useSecondaryPage();

  return (
    <>
      <SEO
        metadata={{
          title: 'Order Details | Audiophile',
          description:
            'View full details of your order, including items purchased, shipping information and order status.',
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
          Order details
        </h1>
        <OrderDetailsPageQuery />
      </div>
    </>
  );
};

export default OrderDetailsPage;
