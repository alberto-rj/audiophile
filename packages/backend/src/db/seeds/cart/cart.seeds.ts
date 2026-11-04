import cartSeeds from './cart.seeds.json' with { type: 'json' };

export type CartSeed = (typeof cartSeeds)[number];

export { cartSeeds };
