import type { User, UserCreateParams } from '@audiophile/shared';

import { makeId } from '../make-id';

export function makeUser(params: UserCreateParams): User {
  return {
    ...params,
    id: makeId(),
    createdAt: new Date().toISOString(),
  };
}
