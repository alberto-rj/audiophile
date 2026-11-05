import categories from './categories.mock.json' with { type: 'json' };
import galleries from './galleries.mock.json' with { type: 'json' };
import includes from './includes.mock.json' with { type: 'json' };
import orders from './orders.mock.json' with { type: 'json' };
import suggestions from './suggestions.mock.json' with { type: 'json' };
import products from './products.mock.json' with { type: 'json' };
import users from './users.mock.json' with { type: 'json' };
import carts from './cart.mock.json' with { type: 'json' };

/**
 * @deprecated
 */
export type Cart = (typeof carts)[number];

/**
 * @deprecated
 */
export type Category = (typeof categories)[number];

/**
 * @deprecated
 */
export type Gallery = (typeof galleries)[number];

/**
 * @deprecated
 */
export type Include = (typeof includes)[number];

/**
 * @deprecated
 */
export type Order = (typeof orders)[number];

/**
 * @deprecated
 */
export type Suggestion = (typeof suggestions)[number];

/**
 * @deprecated
 */
export type Product = (typeof products)[number];

/**
 * @deprecated
 */
export type User = (typeof users)[number];

export {
  categories,
  carts,
  galleries,
  includes,
  orders,
  suggestions,
  products,
  users,
};
