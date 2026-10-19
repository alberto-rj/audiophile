import type {
  cartItems,
  carts,
  categories,
  galleries,
  includes,
  orderItems,
  orders,
  suggestions,
  products,
  refreshTokens,
  users,
} from './schemas';

export type Category = typeof categories.$inferSelect;

export type User = typeof users.$inferSelect;

export type RefreshToken = typeof refreshTokens.$inferSelect;

export type Gallery = typeof galleries.$inferSelect;

export type Include = typeof includes.$inferSelect;

export type Suggestion = typeof suggestions.$inferSelect;

export type Product = typeof products.$inferSelect;

export type Cart = typeof carts.$inferSelect;

export type CartItem = typeof cartItems.$inferSelect;

export type Order = typeof orders.$inferSelect;

export type OrderItem = typeof orderItems.$inferSelect;
