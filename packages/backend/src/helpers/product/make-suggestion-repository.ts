import { DrizzleSuggestionRepository } from '@/repositories/drizzle';
import { InMemorySuggestionRepository } from '@/repositories/in-memory';
import type { SuggestionRepository } from '@/repositories/types';

type SuggestionRepositoryType = 'drizzle' | 'in-memory';

export function makeSuggestionRepository(
  type: SuggestionRepositoryType = 'drizzle',
) {
  const repositories: Record<SuggestionRepositoryType, SuggestionRepository> = {
    'in-memory': new InMemorySuggestionRepository(),
    drizzle: new DrizzleSuggestionRepository(),
  };

  return repositories[type];
}
