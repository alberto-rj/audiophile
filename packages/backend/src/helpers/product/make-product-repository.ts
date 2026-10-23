import { DrizzleProductRepository } from '@/repositories/drizzle';
import { InMemoryProductRepository } from '@/repositories/in-memory';
import type { ProductRepository } from '@/repositories/types';

type ProductRepositoryType = 'drizzle' | 'in-memory';

export function makeProductRepository(type: ProductRepositoryType = 'drizzle') {
  const repositories: Record<ProductRepositoryType, ProductRepository> = {
    drizzle: new DrizzleProductRepository(),
    'in-memory': new InMemoryProductRepository(),
  };

  return repositories[type];
}
