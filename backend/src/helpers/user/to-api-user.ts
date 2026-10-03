import type { ApiUser, User } from '@/schemas';

export function toApiUser({ id, name, email, createdAt }: User): ApiUser {
  return {
    id,
    name,
    email,
    createdAt,
  };
}
