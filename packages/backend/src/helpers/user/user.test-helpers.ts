import type { UserCreateInput } from '@audiophile/shared';

export function makeUserCreateInput(): UserCreateInput {
  return {
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'JohnDoe12',
  };
}
