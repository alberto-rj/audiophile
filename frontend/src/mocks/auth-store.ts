import { user, users } from '@/libs/mocks';

import type { MockUser } from './types';
import type { UserBasic } from '@audiophile/shared';

export const defaultUser: MockUser = {
  id: user.id,
  name: user.name,
  email: user.email,
  password: 'password123',
  createdAt: new Date().toISOString(),
};

export const mockUsers: MockUser[] = users.map((user) => ({
  ...user,
  password: 'password123',
  createdAt: new Date().toISOString(),
}));

export const mockSessions = new Map<string, number>();
export const mockRefreshSessions = new Map<string, number>();

export function getMockCredentials(): { user: UserBasic; accessToken: string } {
  return {
    user,
    accessToken: generateMockToken(user.id),
  };
}

export function generateMockToken(userId: number): string {
  const unique = Math.floor(Date.now() * Math.random());
  const token = `mock-token-${userId}-${unique}`;
  mockSessions.set(token, userId);

  return token;
}

export function generateMockRefreshToken(userId: number): string {
  const token = `mock-refresh-${userId}-${Date.now()}`;
  mockRefreshSessions.set(token, userId);
  return token;
}

export function generateUserFromToken(token: string): MockUser | null {
  const userId = mockSessions.get(token);

  if (typeof userId === 'undefined') {
    return null;
  }

  const foundUser = mockUsers.find((user) => user.id === userId);

  if (typeof foundUser === 'undefined') {
    return null;
  }

  return foundUser;
}

export function generateUserFromRefreshToken(
  refreshToken: string,
): MockUser | null {
  const userId = mockRefreshSessions.get(refreshToken);
  if (typeof userId === 'undefined') return null;

  const user = mockUsers.find((u) => u.id === userId);
  return user ?? null;
}

export function extractTokenFromHeader(
  authHeader: string | null,
): string | null {
  if (!authHeader) {
    return null;
  }

  const [, token] = authHeader.split(' ');

  return token ?? null;
}

export function invalidateRefreshToken(refreshToken: string): void {
  mockRefreshSessions.delete(refreshToken);
}
