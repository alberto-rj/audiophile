import categories from './categories.mock.json' with { type: 'json' };
import galleries from './galleries.mock.json' with { type: 'json' };
import includes from './includes.mock.json' with { type: 'json' };
import orders from './orders.mock.json' with { type: 'json' };
import suggestions from './suggestions.mock.json' with { type: 'json' };
import products from './products.mock.json' with { type: 'json' };
import users from './users.mock.json' with { type: 'json' };
import carts from './cart.mock.json' with { type: 'json' };

export type Cart = (typeof carts)[number];

export type Category = (typeof categories)[number];

export type Gallery = (typeof galleries)[number];

export type Include = (typeof includes)[number];

export type Order = (typeof orders)[number];

export type Suggestion = (typeof suggestions)[number];

export type Product = (typeof products)[number];

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
