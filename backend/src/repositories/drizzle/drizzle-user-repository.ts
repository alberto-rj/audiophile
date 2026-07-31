import { eq } from 'drizzle-orm';

import { db, users, type User as DrizzleUser } from '@/db/drizzle';
import type {
  User,
  UserCreateParams,
  UserFindByEmailParams,
  UserFindByIdParams,
  UserUpdateParams,
} from '@/schemas';

import type { UserRepository } from '../types/user-repository.types';

function parseItem(rawItem: DrizzleUser): User {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { updatedAt, ...itemWithoutTimestamp } = rawItem;

  return {
    ...itemWithoutTimestamp,
    createdAt: itemWithoutTimestamp.createdAt.toISOString(),
  };
}

export class DrizzleUserRepository implements UserRepository {
  async create(params: UserCreateParams): Promise<User> {
    const [createdUser] = await db.insert(users).values(params).returning();

    return parseItem(createdUser!);
  }

  async createMany(params: UserCreateParams[]): Promise<User[]> {
    const createdUsers = await db.insert(users).values(params).returning();

    return createdUsers.map(parseItem);
  }

  async findById({ id }: UserFindByIdParams): Promise<User | null> {
    const [foundUser] = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (!foundUser) {
      return null;
    }

    return parseItem(foundUser);
  }

  async findByEmail({ email }: UserFindByEmailParams): Promise<User | null> {
    const [foundUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!foundUser) {
      return null;
    }

    return parseItem(foundUser);
  }

  async update({ id, ...changes }: UserUpdateParams): Promise<User | null> {
    const [updatedItem] = await db
      .update(users)
      .set({ ...changes })
      .where(eq(users.id, id))
      .returning();

    if (!updatedItem) {
      return null;
    }

    return parseItem(updatedItem);
  }

  async clear(): Promise<void> {
    await db.delete(users);
  }
}
