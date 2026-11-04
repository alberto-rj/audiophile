import userSeeds from './user.seeds.json' with { type: 'json' };

export type UserSeed = (typeof userSeeds)[number];

export { userSeeds };
