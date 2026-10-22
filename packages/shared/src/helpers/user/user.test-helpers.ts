import type { UserCreateInput } from '@/schemas';

import type { MakeFieldInputOptions } from '../common/types';

export function makeNameInput(options: MakeFieldInputOptions = {}): string {
  const { isEmpty = false, isInvalid = false } = options;

  let name;

  if (isEmpty) {
    name = '';
  } else if (isInvalid) {
    name = '';
  } else {
    name = 'John Doe';
  }

  return name;
}

export function makeEmailInput(options: MakeFieldInputOptions = {}): string {
  const { isEmpty = false, isInvalid = false } = options;

  let email;

  if (isEmpty) {
    email = '';
  } else if (isInvalid) {
    email = 'johndoe#example.com';
  } else {
    email = 'johndoe@example.com';
  }

  return email;
}

export function makePasswordInput(options: MakeFieldInputOptions = {}): string {
  const { isEmpty = false, isInvalid = false } = options;

  let password;

  if (isEmpty) {
    password = '';
  } else if (isInvalid) {
    password = 'invalid-password';
  } else {
    password = 'JohnDoe12';
  }

  return password;
}

type MakeUserCreateInputOptions = {
  name?: MakeFieldInputOptions;
  email?: MakeFieldInputOptions;
  password?: MakeFieldInputOptions;
};

export function makeUserCreateInput(
  options: MakeUserCreateInputOptions = {},
): UserCreateInput {
  const { name, email, password } = options;

  return {
    name: makeNameInput(name),
    email: makeEmailInput(email),
    password: makePasswordInput(password),
  };
}
