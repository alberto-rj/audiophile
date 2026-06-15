import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 125 }),
  email: varchar('email', { length: 256 }),
  password: varchar('password', { length: 256 }),
});
