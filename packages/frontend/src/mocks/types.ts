import type { UserBasic } from '@audiophile/shared';

export interface MockUser extends UserBasic {
  password: string;
  createdAt: string;
}

export type AuthenticatedRequest = Request & {
  authUser: MockUser;
};
