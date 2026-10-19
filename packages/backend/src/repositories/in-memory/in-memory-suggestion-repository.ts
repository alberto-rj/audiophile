import {
  type Suggestion,
  type SuggestionCreateParams,
} from '@audiophile/shared';

import { db } from '@/db/in-memory';
import { makeSuggestion } from '@/helpers';

import type { SuggestionRepository } from '../types/suggestion-repository.types';

export class InMemorySuggestionRepository implements SuggestionRepository {
  async create(params: SuggestionCreateParams): Promise<Suggestion> {
    const createdItem = makeSuggestion(params);

    db.suggestions.set(createdItem.targetId, createdItem);

    return createdItem;
  }

  async createMany(
    paramsList: SuggestionCreateParams[],
  ): Promise<Suggestion[]> {
    const createdSuggestions = paramsList.map(makeSuggestion);

    for (const item of createdSuggestions) {
      db.suggestions.set(item.targetId, item);
    }

    return createdSuggestions;
  }

  async clear(): Promise<void> {
    db.suggestions.clear();
  }
}
