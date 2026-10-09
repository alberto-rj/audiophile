import {
  IncludeCreateInputSchema,
  IncludeFindManyInputSchema,
  IncludeIdInputSchema,
} from '@audiophile/shared';
import type {
  Include,
  IncludeCreateInput,
  IncludeCreateParams,
  IncludeFindManyInput,
  IncludeIdInput,
} from '@audiophile/shared';

import { makeId, parseSchema } from '@/helpers';

export function makeInclude({ ...rest }: IncludeCreateParams): Include {
  return {
    ...rest,
    id: makeId(),
  };
}

export function toIncludeIdInput(data: unknown): IncludeIdInput {
  return parseSchema(IncludeIdInputSchema, data);
}

export function toIncludeCreateInput(data: unknown): IncludeCreateInput {
  return parseSchema(IncludeCreateInputSchema, data);
}

export function toIncludeFindManyInput(data: unknown): IncludeFindManyInput {
  return parseSchema(IncludeFindManyInputSchema, data);
}
