import type {
  User,
  UserCreateParams,
  UserFindByEmailParams,
  UserFindByIdParams,
  UserUpdateParams,
} from '@audiophile/shared';
import { eq } from 'drizzle-orm';

import { db, users, type User as DrizzleUser } from '@/db/drizzle';

import type { UserRepository } from '../types/user-repository.types';

function toUser(user: DrizzleUser): User {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { updatedAt, ...userWithoutTimestamp } = user;

  return {
    ...userWithoutTimestamp,
    createdAt: userWithoutTimestamp.createdAt.toISOString(),
  };
}

export class DrizzleUserRepository implements UserRepository {
  async create(params: UserCreateParams): Promise<User> {
    const [createdUser] = await db.insert(users).values(params).returning();

    return toUser(createdUser!);
  }

  async createMany(params: UserCreateParams[]): Promise<User[]> {
    const createdUsers = await db.insert(users).values(params).returning();

    return createdUsers.map(toUser);
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

    return toUser(foundUser);
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

    return toUser(foundUser);
  }

  async update({ id, ...changes }: UserUpdateParams): Promise<User | null> {
    const [updatedUser] = await db
      .update(users)
      .set({ ...changes })
      .where(eq(users.id, id))
      .returning();

    if (!updatedUser) {
      return null;
    }

    return toUser(updatedUser);
  }

  async clear(): Promise<void> {
    await db.delete(users);
  }
}
