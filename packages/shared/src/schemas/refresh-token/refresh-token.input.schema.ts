import {
  RefreshTokenCreateParamsSchema,
  RefreshTokenIdParamsSchema,
  RefreshTokenTokenParamsSchema,
} from './refresh-token.params.schema';

export const RefreshTokenCreateInputSchema =
  RefreshTokenCreateParamsSchema.extend({});

export const RefreshTokenIdInputSchema = RefreshTokenIdParamsSchema.extend({});

export const RefreshTokenTokenInputSchema =
  RefreshTokenTokenParamsSchema.extend({});
