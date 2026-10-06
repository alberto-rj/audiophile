import type { PaginateResult } from '@/helpers';
import type {
  Order,
  OrderCreateParams,
  OrderFindByIdParams,
  OrderFindManyParams,
} from '@audiophile/shared';

export interface OrderRepository {
  create: (params: OrderCreateParams) => Promise<Order>;

  findById: (params: OrderFindByIdParams) => Promise<Order | null>;

  findMany: (params: OrderFindManyParams) => Promise<PaginateResult<Order>>;

  clear: () => Promise<void>;
}
