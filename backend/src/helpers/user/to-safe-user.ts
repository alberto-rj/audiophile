import type { SafeUser, User } from '@/schemas';

export function toSafeUser(user: User): SafeUser {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: createdUserPassword, ...userWithoutPassword } = user;

  return userWithoutPassword;
}
