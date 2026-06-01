import type { UserCreateParams } from '@/repositories';
import type { User } from '@/schemas';

export function makeUser(params: UserCreateParams): User {
  return {
    ...params,
    id: Math.floor(Date.now() * Math.random()),
    createdAt: new Date().toISOString(),
  };
}
