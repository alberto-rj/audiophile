import {
  IncludeCreateParamsSchema,
  IncludeFindManyParamsSchema,
  IncludeIdParamsSchema,
} from './include.params.schema';

export const IncludeIdInputSchema = IncludeIdParamsSchema.extend({});

export const IncludeCreateInputSchema = IncludeCreateParamsSchema.extend({});

export const IncludeFindManyInputSchema = IncludeFindManyParamsSchema.extend(
  {},
);
