import orderSeeds from './order.seeds.json' with { type: 'json' };

export type OrderSeed = (typeof orderSeeds)[number];

export { orderSeeds };
