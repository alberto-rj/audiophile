import productSeeds from './product.seeds.json' with { type: 'json' };

export type ProductSeed = (typeof productSeeds)[number];

export { productSeeds };
