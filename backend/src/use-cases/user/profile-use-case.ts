import { userRepository } from '@/config';
import { toSafeUser, UnauthorizedError } from '@/helpers';
import type { UserFindByIdParams } from '@/repositories';
import type { SafeUser } from '@/schemas';

interface ProfileUseCaseParams {
  payload: UserFindByIdParams;
}

interface ProfileUseCaseResult {
  user: SafeUser;
}

export async function profileUseCase({
  payload,
}: ProfileUseCaseParams): Promise<ProfileUseCaseResult> {
  const { id } = payload;

  const foundUser = await userRepository.findById({
    id,
  });

  if (!foundUser) {
    throw new UnauthorizedError();
  }

  return {
    user: toSafeUser(foundUser),
  };
}
