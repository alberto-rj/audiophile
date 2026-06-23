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

export type Gallery = typeof galleries.$inferSelect;

export type Include = typeof includes.$inferSelect;

export type OtherProduct = typeof otherProducts.$inferSelect;

export type Product = typeof products.$inferSelect;

export type ProductDetailed = Omit<Product, 'categoryId'> & {
  category: Pick<Category, 'name' | 'slug' | 'description' | 'image'>;
  gallery: Pick<Gallery, 'first' | 'second' | 'third'> | null;
  includes: Array<Pick<Include, 'item' | 'quantity'>>;
  suggestedIns: Array<{
    suggestion: Pick<Product, 'name' | 'slug' | 'image'>;
  }>;
};
