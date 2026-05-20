export const APP_ROUTES = {
  home: '/',
  products: '/products',
  productDetails: '/products/:slug',
  categories: '/categories',
  categoryProducts: '/categories/:slug/products',
  checkout: '/checkout',

  login: '/login',
  register: '/register',

  profile: '/profile',
  orders: '/orders',

  notFound: '*',
} as const;
