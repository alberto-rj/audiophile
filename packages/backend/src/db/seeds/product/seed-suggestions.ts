import type { Product, SuggestionCreateParams } from '@audiophile/shared';

import { suggestionRepository } from '@/config';
import type { Suggestions } from '@/db/mocks';
import { logger, toSlug } from '@/helpers';

type CreateSuggestionsParams = {
  products: Product[];
  suggestions: Suggestions;
};

export function toSuggestionCreateParamsParamsList({
  products,
  suggestions,
}: CreateSuggestionsParams): SuggestionCreateParams[] {
  const paramsList = suggestions.map((suggestion) => {
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
  });

  return paramsList;
}

export async function createSuggestions({
  products,
  suggestions,
}: CreateSuggestionsParams) {
  const paramsList = toSuggestionCreateParamsParamsList({
    products,
    suggestions,
  });

  const createdSuggestions = await suggestionRepository.createMany(paramsList);

  return createdSuggestions;
}

export async function seedSuggestions({
  products,
  suggestions,
}: CreateSuggestionsParams) {
  try {
    logger.info('Seeding "suggestions"...');
    const createdSuggestions = await createSuggestions({
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
