import { useParams } from 'react-router-dom';

import { useGetOrderByIdQuery } from '@/app/services/orders-api';
import { ErrorMessage, GoBack } from '@/components/widgets';
import { cn } from '@/libs/cn';
import { Spinner } from '@/components/ui';

const OrderDetailsPage = () => {
  const slug = useParams()?.slug;
  const orderId = parseInt(slug!);

  const { isLoading, isError, refetch } = useGetOrderByIdQuery(orderId!, {
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
          Order details page
        </h1>
      </div>
    </>
  );
};

export default OrderDetailsPage;
