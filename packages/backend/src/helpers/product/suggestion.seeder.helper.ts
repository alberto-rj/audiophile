import { SuggestionSeeder } from '@/db/seeds/product';

import { DEFAULT_REPOSITORY_TYPE, type RepositoryType } from '../common';

import { makeSuggestionRepository } from './suggestion.repository.helper';

export function makeSuggestionSeeder(
  type: RepositoryType = DEFAULT_REPOSITORY_TYPE,
) {
  const suggestionRepository = makeSuggestionRepository(type);

  return {
    suggestionRepository,
    seeder: new SuggestionSeeder(suggestionRepository),
  };
}
