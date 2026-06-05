import type {
  User,
  UserCreateParams,
  UserFindByEmailParams,
  UserFindByIdParams,
  UserUpdateParams,
} from '@/schemas';

export interface UserRepository {
  create: (params: UserCreateParams) => Promise<User>;

  findById: (params: UserFindByIdParams) => Promise<User | null>;

  findByEmail: (params: UserFindByEmailParams) => Promise<User | null>;

  update: (params: UserUpdateParams) => Promise<User | null>;

  clear: () => Promise<void>;
}
