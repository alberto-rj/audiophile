import {
  AuthLoginParamsSchema,
  AuthRegisterParamsSchema,
} from './auth.params.schema';

export const AuthLoginInputSchema = AuthLoginParamsSchema.extend({});

export const AuthRegisterInputSchema = AuthRegisterParamsSchema.extend({});
