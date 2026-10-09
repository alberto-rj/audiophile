import type { Suggestion, SuggestionCreateParams } from '@audiophile/shared';

import {
  db,
  suggestions,
  type Suggestion as DrizzleSuggestion,
} from '@/db/drizzle';

import type { SuggestionRepository } from '../types/suggestion-repository.types';

function toSuggestion(item: DrizzleSuggestion): Suggestion {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createdAt, updatedAt, ...itemWithoutTimestamp } = item;

  return itemWithoutTimestamp;
}

export class DrizzleSuggestionRepository implements SuggestionRepository {
  async create(params: SuggestionCreateParams): Promise<Suggestion> {
    const [createdItem] = await db
      .insert(suggestions)
      .values(params)
      .returning();

    return toSuggestion(createdItem!);
  }

  async createMany(params: SuggestionCreateParams[]): Promise<Suggestion[]> {
    const createdItems = await db
      .insert(suggestions)
      .values(params)
      .returning();

    return createdItems.map(toSuggestion);
  }

  async clear(): Promise<void> {
    await db.delete(suggestions);
  }
}
