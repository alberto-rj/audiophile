import { makeUserRepository } from '@/helpers';
import type { UserRepository } from '@/repositories';

export const userRepository: UserRepository = makeUserRepository();
