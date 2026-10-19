import {
  DrizzleSuggestionRepository,
  InMemorySuggestionRepository,
  type SuggestionRepository,
} from '@/repositories';

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
