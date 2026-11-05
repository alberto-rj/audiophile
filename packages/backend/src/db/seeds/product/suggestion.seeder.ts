import {
  toSlug,
  type Product,
  type SuggestionCreateParams,
} from '@audiophile/shared';

import { logger } from '@/helpers/logger';
import type { SuggestionRepository } from '@/repositories/types';

import type { SuggestionSeed } from './suggestion.seeds';

type RunParams = {
  suggestions: SuggestionSeed[];
  products: Product[];
};

type ToCreateParams = {
  suggestion: SuggestionSeed;
  products: Product[];
};

export class SuggestionSeeder {
  constructor(private suggestionRepository: SuggestionRepository) {}

  static toCreateParams({
    suggestion,
    products,
  }: ToCreateParams): SuggestionCreateParams {
    const targetSlug = toSlug(suggestion.target);
    const target = products.find((p) => p.slug === targetSlug);

    const sourceSlug = toSlug(suggestion.source);
    const source = products.find((p) => p.slug === sourceSlug);

    if (!target) {
      throw new Error(`Cannot find target product with "${targetSlug}" slug`);
    }

    if (!source) {
      throw new Error(`Cannot find source product with "${source}" slug`);
    }

    return {
      targetId: target.id,
      sourceId: source.id,
    };
  }

  async run({ products, suggestions }: RunParams) {
    const paramsList = suggestions.map((suggestion) =>
      SuggestionSeeder.toCreateParams({
        products,
        suggestion,
      }),
    );

    const createdSuggestions =
      await this.suggestionRepository.createMany(paramsList);

    return createdSuggestions;
  }

  async safeRun({ products, suggestions }: RunParams) {
    try {
      logger.info('Seeding "suggestions"...');
      const createdSuggestions = await this.run({
        products,
        suggestions,
      });
      logger.info('"suggestions" was successfully seeded.');
      return createdSuggestions;
    } catch (error) {
      logger.error('Failed to seed "suggestions".', error);
      process.exit(1);
    }
  }
}
