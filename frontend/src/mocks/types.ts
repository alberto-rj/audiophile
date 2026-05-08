import type { BaseUser } from '@/libs/types';

export interface MockUser extends BaseUser {
  password: string;
}

export type AuthenticatedRequest = Request & {
  authUser: MockUser;
};
