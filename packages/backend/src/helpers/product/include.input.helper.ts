import {
  IncludeCreateInputSchema,
  IncludeFindManyInputSchema,
  IncludeIdInputSchema,
} from '@audiophile/shared';
import type {
  IncludeCreateInput,
  IncludeFindManyInput,
  IncludeIdInput,
} from '@audiophile/shared';

import { parseSchema } from '../parse-schema';

export function toIncludeIdInput(data: unknown): IncludeIdInput {
  return parseSchema(IncludeIdInputSchema, data);
}

export function toIncludeCreateInput(data: unknown): IncludeCreateInput {
  return parseSchema(IncludeCreateInputSchema, data);
}

export function toIncludeFindManyInput(data: unknown): IncludeFindManyInput {
  return parseSchema(IncludeFindManyInputSchema, data);
}
