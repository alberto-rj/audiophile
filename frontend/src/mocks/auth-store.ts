import type { AuthUser } from '@/libs/types';

interface MockUser extends AuthUser {
  password: string;
}

const defaultUser: MockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
};

export const mockUsers: MockUser[] = [defaultUser];

export const mockSessions = new Map<string, number>();

export function generateMockToken(userId: number): string {
  const unique = Math.floor(Date.now() * Math.random());
  const token = `mock-token-${userId}-${unique}`;

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
