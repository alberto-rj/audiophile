import { DrizzleCartRepository } from '@/repositories/drizzle';
import { InMemoryCartRepository } from '@/repositories/in-memory';
import type { CartRepository } from '@/repositories/types';

type CartRepositoryType = 'drizzle' | 'in-memory';

export function makeCartRepository(type: CartRepositoryType = 'drizzle') {
  const repositories: Record<CartRepositoryType, CartRepository> = {
    drizzle: new DrizzleCartRepository(),
    'in-memory': new InMemoryCartRepository(),
  };

  return repositories[type];
}
