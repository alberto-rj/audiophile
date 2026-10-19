export const API_ENDPOINTS = {
  /* auth */
  auth: '/auth',
  login: '/auth/login',
  register: '/auth/register',
  logout: '/auth/logout',
  refresh: '/auth/refresh',

  /* users */
  users: '/users',
  userProfile: '/users/me',

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
