import { DrizzleCartRepository, type CartRepository } from '@/repositories';

type CartRepositoryType = 'drizzle' | 'in-memory';

export function makeCartRepository(type: CartRepositoryType = 'drizzle') {
  const repositories: Record<CartRepositoryType, CartRepository> = {
    drizzle: new DrizzleCartRepository(),
    'in-memory': new DrizzleCartRepository(),
  };

  return repositories[type];
}
