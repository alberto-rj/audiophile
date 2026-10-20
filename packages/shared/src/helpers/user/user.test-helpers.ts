import type { UserCreateInput } from '@/schemas';

export function makeUserCreateInput(): UserCreateInput {
  return {
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'JohnDoe12',
  };
}
