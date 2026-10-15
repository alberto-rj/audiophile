import type { ApiOrder } from '@audiophile/shared';

import { cn } from '@/libs/cn';

import { BasicOrderCard } from './basic-order-card';
import { OrderSummaryCard } from './order-summary-card';

interface OrderDetailsProps {
  order: ApiOrder;
}

export const OrderDetails = ({ order }: OrderDetailsProps) => {
  return (
    <div
      className={cn(
        'inline-full',
        'flex',
        'flex-col',
        'items-center',
        'gap-12',

        'lg:flex-row',
        'lg:justify-between',
        'lg:items-start',
      )}
    >
      <BasicOrderCard order={order} />
      <OrderSummaryCard order={order} />
    </div>
  );
};
