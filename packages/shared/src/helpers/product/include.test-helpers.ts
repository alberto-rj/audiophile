import type { Include, IncludeCreateParams } from '@/schemas';

import { makeId } from '../make-id';

export function makeInclude({ ...rest }: IncludeCreateParams): Include {
  return {
    ...rest,
    id: makeId(),
  };
}
