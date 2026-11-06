import { DrizzleSuggestionRepository } from '@/repositories/drizzle';
import { InMemorySuggestionRepository } from '@/repositories/in-memory';
import type { SuggestionRepository } from '@/repositories/types';

import { DEFAULT_REPOSITORY_TYPE, type RepositoryType } from '../common';

export function makeSuggestionRepository(
  type: RepositoryType = DEFAULT_REPOSITORY_TYPE,
) {
  const repositories: Record<RepositoryType, SuggestionRepository> = {
    'in-memory': new InMemorySuggestionRepository(),
    drizzle: new DrizzleSuggestionRepository(),
  };

  return repositories[type];
}
