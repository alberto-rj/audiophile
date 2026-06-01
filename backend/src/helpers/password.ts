import { hash, compare } from 'bcryptjs';

export async function getHash(password: string) {
  return await hash(password, 6);
}

export async function hasCorrectHash(password: string, hash: string) {
  return await compare(password, hash);
}
