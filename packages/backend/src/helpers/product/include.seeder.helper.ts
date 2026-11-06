import { IncludeSeeder } from '@/db/seeds/product';

import { DEFAULT_REPOSITORY_TYPE, type RepositoryType } from '../common';

import { makeIncludeRepository } from './include.repository.helper';

export function makeIncludeSeeder(
  type: RepositoryType = DEFAULT_REPOSITORY_TYPE,
) {
  const includeRepository = makeIncludeRepository(type);

  return {
    includeRepository,
    seeder: new IncludeSeeder(includeRepository),
  };
}
