import type { User, UserCreateParams } from '@/schemas';

export function makeUser(params: UserCreateParams): User {
  return {
    ...params,
    id: Math.floor(Date.now() * Math.random()),
    createdAt: new Date().toISOString(),
  };
}
