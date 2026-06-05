import { userRepository } from '@/config';
import { toSafeUser, UnauthorizedError } from '@/helpers';
import type { SafeUser, UserFindByIdParams } from '@/schemas';

interface GetProfileUseCaseParams {
  payload: UserFindByIdParams;
}

interface GetProfileUseCaseResult {
  user: SafeUser;
}

export async function getProfileUseCase({
  payload,
}: GetProfileUseCaseParams): Promise<GetProfileUseCaseResult> {
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
