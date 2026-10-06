import type { ApiUser, User } from '@audiophile/shared';

export function toApiUser({ id, name, email, createdAt }: User): ApiUser {
  return {
    id,
    name,
    email,
    createdAt,
  };
}
