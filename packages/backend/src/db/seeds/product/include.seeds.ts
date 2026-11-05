import includeSeeds from './include.seeds.json' with { type: 'json' };

export type IncludeSeed = (typeof includeSeeds)[number];

export { includeSeeds };
