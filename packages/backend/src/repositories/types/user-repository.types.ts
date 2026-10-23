import type { PaginateResult } from '@/helpers/paginate';
import type {
  User,
  UserCreateParams,
  UserFindByEmailParams,
  UserFindByIdParams,
  UserFindManyParams,
  UserUpdateParams,
} from '@audiophile/shared';

export interface UserRepository {
  create: (params: UserCreateParams) => Promise<User>;

  createMany: (params: UserCreateParams[]) => Promise<User[]>;

  findById: (params: UserFindByIdParams) => Promise<User | null>;

  findByEmail: (params: UserFindByEmailParams) => Promise<User | null>;

  findMany: (params: UserFindManyParams) => Promise<PaginateResult<User>>;

  update: (params: UserUpdateParams) => Promise<User | null>;

  clear: () => Promise<void>;
}
