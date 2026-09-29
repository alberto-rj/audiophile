import { DrizzleOrderRepository, type OrderRepository } from '@/repositories';

type OrderRepositoryType = 'drizzle' | 'in-memory';

export function makeOrderRepository(type: OrderRepositoryType = 'drizzle') {
  const repositories: Record<OrderRepositoryType, OrderRepository> = {
    drizzle: new DrizzleOrderRepository(),
    'in-memory': new DrizzleOrderRepository(),
  };

  return repositories[type];
}
