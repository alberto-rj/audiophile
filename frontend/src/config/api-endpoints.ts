export const API_ENDPOINTS = {
  /* auth */
  auth: '/auth',
  login: '/auth/login',
  register: '/auth/register',
  logout: '/auth/logout',
  refresh: '/auth/refresh',

  /* cart */
  cart: '/cart',
  cartItems: '/cart/items',

  /* orders */
  orders: '/orders',

  /* products */
  products: '/products',

  /* categories */
  categories: '/categories',
} as const;
