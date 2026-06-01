import type { User } from '@/schemas';

export interface UserCreateParams {
  name: string;
  email: string;
  password: string;
}

export interface UserFindByIdParams {
  id: number;
}

export interface UserFindByEmailParams {
  email: string;
}

export interface UserRepository {
  create: (params: UserCreateParams) => Promise<User>;

  findById: (params: UserFindByIdParams) => Promise<User | null>;

  findByEmail: (params: UserFindByEmailParams) => Promise<User | null>;

  clear: () => Promise<void>;
}
