import type { UserBasic } from '@audiophile/shared';

export const user: UserBasic = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
};

export const john: UserBasic = {
  id: 2,
  name: 'John Doe',
  email: 'john@example.com',
};

export const jane: UserBasic = {
  id: 3,
  name: 'Jane Doe',
  email: 'jane@example.com',
};

export const demo: UserBasic = {
  id: 4,
  name: 'Demo User',
  email: 'demo@example.com',
};

export const users: UserBasic[] = [user, john, jane, demo];
