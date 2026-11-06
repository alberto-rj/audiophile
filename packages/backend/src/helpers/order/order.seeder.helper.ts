import { OrderSeeder } from '@/db/seeds/order';

import { DEFAULT_REPOSITORY_TYPE, type RepositoryType } from '../common';

import { makeOrderRepository } from './order.repository.helper';

export function makeOrderSeeder(
  type: RepositoryType = DEFAULT_REPOSITORY_TYPE,
) {
  const orderRepository = makeOrderRepository(type);

  return {
    orderRepository,
    seeder: new OrderSeeder(orderRepository),
  };
}
