import {
  IncludeCreateInputSchema,
  IncludeFindManyInputSchema,
  IncludeIdInputSchema,
  makeId,
} from '@audiophile/shared';
import type {
  Include,
  IncludeCreateInput,
  IncludeCreateParams,
  IncludeFindManyInput,
  IncludeIdInput,
} from '@audiophile/shared';

import { parseSchema } from '../parse-schema';

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
