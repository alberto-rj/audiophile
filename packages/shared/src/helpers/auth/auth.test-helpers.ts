import type { AuthLoginInput, AuthRegisterInput } from '@/schemas';

import type { MakeFieldInputOptions } from '../common/types';
import {
  makeEmailInput,
  makeNameInput,
  makePasswordInput,
} from '../user/user.test-helpers';

type MakeAuthLoginInputOptions = {
  email?: MakeFieldInputOptions;
  password?: MakeFieldInputOptions;
};

export function makeAuthLoginInput(
  options: MakeAuthLoginInputOptions = {},
): AuthLoginInput {
  const { email, password } = options;

  return {
    email: makeEmailInput(email),
    password: makePasswordInput(password),
  };
}

type MakeAuthRegisterInputOptions = {
  name?: MakeFieldInputOptions;
  email?: MakeFieldInputOptions;
  password?: MakeFieldInputOptions;
};

export function makeAuthRegisterInput(
  options: MakeAuthRegisterInputOptions = {},
): AuthRegisterInput {
  const { name, email, password } = options;

  return {
    name: makeNameInput(name),
    email: makeEmailInput(email),
    password: makePasswordInput(password),
  };
}
