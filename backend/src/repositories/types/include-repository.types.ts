import type { PaginateResult } from '@/helpers';
import type {
  Include,
  IncludeCreateParams,
  IncludeDeleteByIdParams,
  IncludeFindByIdParams,
  IncludeFindManyParams,
} from '@/schemas';

export interface IncludeRepository {
  create: (params: IncludeCreateParams) => Promise<Include>;

  createMany: (params: IncludeCreateParams[]) => Promise<Include[]>;

  findById: (params: IncludeFindByIdParams) => Promise<Include | null>;

  findMany: (params: IncludeFindManyParams) => Promise<PaginateResult<Include>>;

  deleteById: (params: IncludeDeleteByIdParams) => Promise<Include | null>;

  clear: () => Promise<void>;
}
