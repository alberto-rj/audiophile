import { z } from '@/config';

import {
  AuthLoginInputSchema,
  AuthRegisterInputSchema,
} from './auth.input.schema';

export type AuthRegisterInput = z.infer<typeof AuthRegisterInputSchema>;

export type AuthLoginInput = z.infer<typeof AuthLoginInputSchema>;
