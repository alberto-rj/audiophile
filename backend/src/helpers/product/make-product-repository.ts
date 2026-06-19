import {
  DrizzleProductRepository,
  InMemoryProductRepository,
  type ProductRepository,
} from '@/repositories';

type ProductRepositoryType = 'drizzle' | 'in-memory';

export function makeProductRepository(type: ProductRepositoryType = 'drizzle') {
  const repositories: Record<ProductRepositoryType, ProductRepository> = {
    drizzle: new DrizzleProductRepository(),
    'in-memory': new InMemoryProductRepository(),
  };

  return repositories[type];
}
