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
  unique,
  pgEnum,
} from 'drizzle-orm/pg-core';

const createdAt = timestamp('created_at', { withTimezone: true })
  .notNull()
  .defaultNow();

const updatedAt = timestamp('updated_at', { withTimezone: true })
  .notNull()
  .defaultNow()
  .$onUpdateFn(() => new Date());

export const users = pgTable(
  'users',
  {
    id: serial('id'),
    name: varchar('name', { length: 128 }).notNull(),
    email: varchar('email', { length: 256 }).notNull(),
    password: varchar('password', { length: 256 }).notNull(),
    createdAt,
    updatedAt,
  },
  ({ id, email }) => [
    primaryKey({
      name: 'users_pk_id',
      columns: [id],
    }),
    unique('users_uk_email').on(email),
  ],
);

export const refreshTokens = pgTable(
  'refresh_tokens',
  {
    id: serial('id'),
    userId: integer('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    token: text('token').notNull(),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    createdAt,
    updatedAt,
  },
  ({ id, token }) => [
    primaryKey({
      name: 'refresh_tokens_pk_id',
      columns: [id],
    }),
    unique('refresh_tokens_uk_token').on(token),
  ],
);

export const categories = pgTable(
  'categories',
  {
    id: serial('id'),
    slug: text('slug').notNull(),
    image: text('image').notNull(),
    name: varchar('name', { length: 128 }).notNull(),
    description: text('description'),
    createdAt,
    updatedAt,
  },
  ({ id, image, slug }) => [
    primaryKey({
      name: 'categories_pk_id',
      columns: [id],
    }),
    unique('categories_uk_image').on(image),
    unique('categories_uk_slug').on(slug),
  ],
);

export const products = pgTable(
  'products',
  {
    id: serial('id'),
    categoryId: integer('category_id')
      .notNull()
      .references(() => categories.id, { onDelete: 'cascade' }),
    slug: text('slug').notNull(),
    image: text('image').notNull(),
    name: varchar('name', { length: 128 }).notNull(),
    description: text('description'),
    features: text('features').notNull(),
    isNew: boolean('is_new').default(false).notNull(),
    price: integer('price').notNull(),
    createdAt,
    updatedAt,
  },
  ({ id, image, slug }) => [
    primaryKey({
      name: 'products_pk_id',
      columns: [id],
    }),
    unique('products_uk_image').on(image),
    unique('products_uk_slug').on(slug),
  ],
);

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
  ({ otherId, productId }) => [
    primaryKey({
      name: 'other_products_pk_other_id_product_id',
      columns: [otherId, productId],
    }),
  ],
);

export const galleries = pgTable(
  'galleries',
  {
    id: serial('id'),
    productId: integer('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    first: text('first').notNull(),
    second: text('second').notNull(),
    third: text('third').notNull(),
    createdAt,
    updatedAt,
  },
  ({ id, productId, first, second, third }) => [
    primaryKey({
      name: 'galleries_pk_id',
      columns: [id],
    }),
    unique('galleries_uk_product_id').on(productId),
    unique('galleries_uk_first').on(first),
    unique('galleries_uk_second').on(second),
    unique('galleries_uk_third').on(third),
  ],
);

export const includes = pgTable(
  'includes',
  {
    id: serial('id'),
    productId: integer('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    quantity: integer('quantity').notNull().default(0),
    item: varchar('item', { length: 128 }).notNull(),
    createdAt,
    updatedAt,
  },
  ({ id }) => [
    primaryKey({
      name: 'includes_pk_id',
      columns: [id],
    }),
  ],
);

export const carts = pgTable(
  'carts',
  {
    id: serial('id'),
    userId: integer('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    createdAt,
    updatedAt,
  },
  ({ id, userId }) => [
    primaryKey({
      name: 'carts_pk_id',
      columns: [id],
    }),
    unique('carts_uk_user_id').on(userId),
  ],
);

export const cartItems = pgTable(
  'cart_items',
  {
    id: serial('id'),
    cartId: integer('cart_id')
      .notNull()
      .references(() => carts.id, { onDelete: 'cascade' }),
    productId: integer('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    quantity: integer('quantity').notNull().default(1),
    createdAt,
    updatedAt,
  },
  ({ id, cartId, productId }) => [
    primaryKey({
      name: 'cart_items_pk_id',
      columns: [id],
    }),
    unique('cart_items_uk_cart_id_product_id').on(cartId, productId),
  ],
);

export const orderStatus = pgEnum('order_status', [
  'pending',
  'paid',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
]);

export const orderPaymentMethod = pgEnum('order_payment_method', [
  'e-money',
  'cash-on-delivery',
]);

export const orders = pgTable(
  'orders',
  {
    id: serial('id'),
    userId: integer('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    status: orderStatus('status').notNull().default('pending'),
    name: text('name').notNull(),
    email: text('email').notNull(),
    address: text('address').notNull(),
    zip: text('zip').notNull(),
    city: text('city').notNull(),
    country: text('country').notNull(),
    paymentMethod: orderPaymentMethod('payment_method')
      .notNull()
      .default('e-money'),
    subtotal: integer('subtotal').notNull(),
    shipping: integer('shipping').notNull(),
    vat: integer('vat').notNull(),
    grandTotal: integer('grand_total').notNull(),
    createdAt,
    updatedAt,
  },
  ({ id }) => [primaryKey({ name: 'orders_pk_id', columns: [id] })],
);

export const orderItems = pgTable(
  'order_items',
  {
    id: serial('id'),
    orderId: integer('order_id')
      .notNull()
      .references(() => orders.id, { onDelete: 'cascade' }),
    productId: integer('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    image: text('image').notNull(),
    price: integer('price').notNull(),
    quantity: integer('quantity').notNull(),
  },
  ({ id }) => [primaryKey({ name: 'order_items_pk_id', columns: [id] })],
);

export const userRelations = relations(users, ({ one, many }) => ({
  refreshTokens: many(refreshTokens),
  cart: one(carts),
  orders: many(orders),
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

export const cartRelations = relations(carts, ({ one, many }) => ({
  user: one(users, {
    fields: [carts.userId],
    references: [users.id],
  }),
  items: many(cartItems),
}));

export const cartItemRelations = relations(cartItems, ({ one }) => ({
  cart: one(carts, {
    fields: [cartItems.cartId],
    references: [carts.id],
  }),
  product: one(products, {
    fields: [cartItems.productId],
    references: [products.id],
  }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  items: many(orderItems),
}));

export const orderItemRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));
