import { DrizzleOrderRepository } from '@/repositories/drizzle';
import { InMemoryOrderRepository } from '@/repositories/in-memory';
import type { OrderRepository } from '@/repositories/types';
import { DEFAULT_REPOSITORY_TYPE } from '../common';

type OrderRepositoryType = 'drizzle' | 'in-memory';

export function makeOrderRepository(
  type: OrderRepositoryType = DEFAULT_REPOSITORY_TYPE,
) {
  const repositories: Record<OrderRepositoryType, OrderRepository> = {
    drizzle: new DrizzleOrderRepository(),
    'in-memory': new InMemoryOrderRepository(),
  };

  return repositories[type];
}
