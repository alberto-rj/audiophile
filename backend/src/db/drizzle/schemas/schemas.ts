import { relations } from 'drizzle-orm';
import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

const createdAt = timestamp('created_at', { withTimezone: true })
  .notNull()
  .defaultNow();

const updatedAt = timestamp('updated_at', { withTimezone: true })
  .notNull()
  .defaultNow()
  .$onUpdateFn(() => new Date());

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 128 }).notNull(),
  email: varchar('email', { length: 256 }).notNull().unique(),
  password: varchar('password', { length: 256 }).notNull(),
  createdAt,
  updatedAt,
});

export const refreshTokens = pgTable('refresh_tokens', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  token: text('token').notNull().unique(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  createdAt,
  updatedAt,
});

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  image: text('image').notNull().unique(),
  name: varchar('name', { length: 128 }).notNull(),
  description: text('description'),
  createdAt,
  updatedAt,
});

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  categoryId: integer('category_id')
    .notNull()
    .references(() => categories.id, { onDelete: 'cascade' }),
  slug: text('slug').notNull().unique(),
  image: text('image').notNull().unique(),
  name: varchar('name', { length: 128 }).notNull(),
  description: text('description'),
  features: text('features').notNull(),
  isNew: boolean('is_new').default(false).notNull(),
  price: integer('price').notNull(),
  createdAt,
  updatedAt,
});

export const otherProducts = pgTable(
  'other_products',
  {
    otherId: integer('other_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    productId: integer('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    createdAt,
    updatedAt,
  },
  (table) => [primaryKey({ columns: [table.otherId, table.productId] })],
);

export const galleries = pgTable('galleries', {
  id: serial('id').primaryKey(),
  productId: integer('product_id')
    .notNull()
    .references(() => products.id, { onDelete: 'cascade' })
    .unique(),
  first: text('first').notNull().unique(),
  second: text('second').notNull().unique(),
  third: text('third').notNull().unique(),
  createdAt,
  updatedAt,
});

export const includes = pgTable('includes', {
  id: serial('id').primaryKey(),
  productId: integer('product_id')
    .notNull()
    .references(() => products.id, { onDelete: 'cascade' }),
  quantity: integer('quantity').notNull().default(0),
  item: varchar('item', { length: 128 }).notNull(),
  createdAt,
  updatedAt,
});

export const userRelations = relations(users, ({ many }) => ({
  refreshTokens: many(refreshTokens),
}));

export const refreshTokenToUserRelations = relations(
  refreshTokens,
  ({ one }) => ({
    user: one(users, {
      fields: [refreshTokens.userId],
      references: [users.id],
    }),
  }),
);

export const categoryRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  gallery: one(galleries),
  includes: many(includes),
  suggestedIns: many(otherProducts, {
    relationName: 'sourceProduct',
  }),
  suggestions: many(otherProducts, {
    relationName: 'targetProduct',
  }),
}));

export const galleryRelations = relations(galleries, ({ one }) => ({
  product: one(products, {
    fields: [galleries.productId],
    references: [products.id],
  }),
}));

export const includeRelations = relations(includes, ({ one }) => ({
  product: one(products, {
    fields: [includes.productId],
    references: [products.id],
  }),
}));

export const otherProductRelations = relations(otherProducts, ({ one }) => ({
  suggestedIn: one(products, {
    fields: [otherProducts.productId],
    references: [products.id],
    relationName: 'sourceProduct',
  }),
  suggestion: one(products, {
    fields: [otherProducts.otherId],
    references: [products.id],
    relationName: 'targetProduct',
  }),
}));
