import {
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
  email: varchar('email', { length: 256 }).notNull(),
  password: varchar('password', { length: 256 }).notNull(),
  createdAt,
  updatedAt,
});

export const refreshTokens = pgTable('refresh_tokens', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  token: text('token').notNull().unique(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  createdAt,
  updatedAt,
});

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull(),
  image: text('image').notNull(),
  name: varchar('name', { length: 128 }).notNull(),
  description: text('description'),
  createdAt,
  updatedAt,
});

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  categoryId: integer('category_id')
    .notNull()
    .references(() => categories.id),
  slug: text('slug').notNull(),
  image: text('image').notNull(),
  name: varchar('name', { length: 128 }).notNull(),
  description: text('description'),
  features: text('features').notNull(),
  createdAt,
  updatedAt,
});

export const otherProducts = pgTable(
  'other_products',
  {
    otherId: integer()
      .notNull()
      .references(() => products.id),
    productId: integer('product_id')
      .notNull()
      .references(() => products.id),
    createdAt,
    updatedAt,
  },
  (table) => [primaryKey({ columns: [table.otherId, table.productId] })],
);

export const galleries = pgTable('galleries', {
  id: serial('id').primaryKey(),
  productId: integer('product_id')
    .notNull()
    .references(() => products.id)
    .unique(),
  first: text('first').notNull(),
  second: text('second').notNull(),
  third: text('third').notNull(),
  createdAt,
  updatedAt,
});

export const includes = pgTable('includes', {
  id: serial('id').primaryKey(),
  productId: integer('product_id')
    .notNull()
    .references(() => products.id)
    .unique(),
  quantity: integer('quantity').notNull().default(0),
  item: varchar('item', { length: 128 }).notNull(),
  createdAt,
  updatedAt,
});
