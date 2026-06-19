import type {
  categories,
  galleries,
  includes,
  otherProducts,
  products,
  users,
} from './schemas';

export type Category = typeof categories.$inferSelect;

export type User = typeof users.$inferSelect;

export type Product = typeof products.$inferSelect;

export type Gallery = typeof galleries.$inferSelect;

export type Include = typeof includes.$inferSelect;

export type OtherProduct = typeof otherProducts.$inferSelect;
