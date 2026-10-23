import { DrizzleOrderRepository } from '@/repositories/drizzle';
import { InMemoryOrderRepository } from '@/repositories/in-memory';
import type { OrderRepository } from '@/repositories/types';

type OrderRepositoryType = 'drizzle' | 'in-memory';

export function makeOrderRepository(type: OrderRepositoryType = 'drizzle') {
  const repositories: Record<OrderRepositoryType, OrderRepository> = {
    drizzle: new DrizzleOrderRepository(),
    'in-memory': new InMemoryOrderRepository(),
  };

  return repositories[type];
}
