import type {
  Include,
  IncludeCreateParams,
  IncludeFindManyParams,
  IncludeIdParams,
} from '@audiophile/shared';

import type { PaginateResult } from '@/helpers/paginate';

export interface IncludeRepository {
  create: (params: IncludeCreateParams) => Promise<Include>;

  createMany: (params: IncludeCreateParams[]) => Promise<Include[]>;

  findById: (params: IncludeIdParams) => Promise<Include | null>;

  findMany: (params: IncludeFindManyParams) => Promise<PaginateResult<Include>>;

  deleteById: (params: IncludeIdParams) => Promise<Include | null>;

  clear: () => Promise<void>;
}
