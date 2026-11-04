import categorySeeds from './category.seeds.json' with { type: 'json' };

export type CategorySeed = (typeof categorySeeds)[number];

export { categorySeeds };
