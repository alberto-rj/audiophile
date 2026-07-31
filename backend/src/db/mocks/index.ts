import categories from './categories.mock.json' with { type: 'json' };
import galleries from './galleries.mock.json' with { type: 'json' };
import includes from './includes.mock.json' with { type: 'json' };
import otherProducts from './other-products.mock.json' with { type: 'json' };
import products from './products.mock.json' with { type: 'json' };
import users from './users.mock.json' with { type: 'json' };

export type Categories = typeof categories;

export type Galleries = typeof galleries;

export type Includes = typeof includes;

export type OtherProducts = typeof otherProducts;

export type Products = typeof products;

export type Users = typeof users;

export { categories, galleries, includes, otherProducts, products, users };
