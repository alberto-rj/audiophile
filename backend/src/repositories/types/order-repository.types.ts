import type { PaginateResult } from '@/helpers';
import type {
  Order,
  OrderCreateParams,
  OrderFindByIdParams,
  OrderFindManyParams,
} from '@/schemas';

export interface OrderRepository {
  create: (params: OrderCreateParams) => Promise<Order>;

  createMany: (params: OrderCreateParams[]) => Promise<Order[]>;

  findById: (params: OrderFindByIdParams) => Promise<Order | null>;

  findMany: (params: OrderFindManyParams) => Promise<PaginateResult<Order>>;

  clear: () => Promise<void>;
}
