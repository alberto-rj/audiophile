import { userRepository } from '@/config';
import { ConflictError, getHash } from '@/helpers';
import type { UserCreateParams } from '@/repositories';
import { makeRegisterPresenter, type SafeUser } from '@/schemas';

interface RegisterUseCaseParams {
  payload: UserCreateParams;
}

interface RegisterUseCaseReturn {
  user: SafeUser;
}

export async function registerUseCase({
  payload,
}: RegisterUseCaseParams): Promise<RegisterUseCaseReturn> {
  const { name, email, password } = makeRegisterPresenter(payload);

  const foundUserWithEmail = await userRepository.findByEmail({
    email,
  });

  if (typeof foundUserWithEmail === 'object') {
    throw new ConflictError('Email already exists.');
  }

  const passwordHash = await getHash(password);

  const createdUser = await userRepository.create({
    name,
    email,
    password: passwordHash,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: createdUserPassword, ...userWithoutPassword } = createdUser;

  return { user: userWithoutPassword };
}
