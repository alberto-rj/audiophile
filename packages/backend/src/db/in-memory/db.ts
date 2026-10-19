import type {
  Cart,
  CartItem,
  CartItemDetailed,
  Category,
  Gallery,
  Include,
  Order,
  OrderItem,
  Product,
  RefreshToken,
  Suggestion,
  User,
} from '@audiophile/shared';

export const db = {
  carts: new Map<Cart['id'], Cart>(),
  cartItems: new Map<CartItem['id'], CartItemDetailed>(),
  categories: new Map<Category['id'], Category>(),
  galleries: new Map<Gallery['id'], Gallery>(),
  includes: new Map<Include['id'], Include>(),
  suggestions: new Map<Product['id'], Suggestion>(),
  products: new Map<Product['id'], Product>(),
  refreshTokens: new Map<RefreshToken['id'], RefreshToken>(),
  users: new Map<User['id'], User>(),
  orders: new Map<Order['id'], Order>(),
  orderItems: new Map<OrderItem['id'], OrderItem>(),
} as const;
