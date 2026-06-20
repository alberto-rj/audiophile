import {
  DrizzleOtherProductRepository,
  InMemoryOtherProductRepository,
  type OtherProductRepository,
} from '@/repositories';

type OtherProductRepositoryType = 'drizzle' | 'in-memory';

export function makeOtherProductRepository(
  type: OtherProductRepositoryType = 'drizzle',
) {
  const repositories: Record<
    OtherProductRepositoryType,
    OtherProductRepository
  > = {
    'in-memory': new InMemoryOtherProductRepository(),
    drizzle: new DrizzleOtherProductRepository(),
  };

  return repositories[type];
}
