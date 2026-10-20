import type { AuthLoginInput, AuthRegisterInput } from '@/schemas';

export function makeAuthLoginInput(): AuthLoginInput {
  return {
    email: 'johndoe@example.com',
    password: 'JohnDoe12',
  };
}

export function makeAuthRegisterInput(): AuthRegisterInput {
  return {
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'JohnDoe12',
  };
}
