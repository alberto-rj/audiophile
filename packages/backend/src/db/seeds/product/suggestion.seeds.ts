import suggestionSeeds from './suggestion.seeds.json' with { type: 'json' };

export type SuggestionSeed = (typeof suggestionSeeds)[number];

export { suggestionSeeds };
