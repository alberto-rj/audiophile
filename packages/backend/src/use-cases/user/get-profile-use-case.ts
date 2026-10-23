import type { User } from '@audiophile/shared';

import { userRepository } from '@/config/repositories';
import { UnauthorizedError } from '@/helpers/app-error';
import { toUserFindByIdInput } from '@/helpers/user';

interface GetProfileUseCaseParams {
  input: unknown;
}

interface GetProfileUseCaseResult {
  user: User;
}

export async function getProfileUseCase({
  input,
}: GetProfileUseCaseParams): Promise<GetProfileUseCaseResult> {
  const { id } = toUserFindByIdInput(input);

  const foundUser = await userRepository.findById({
    id,
  });

  if (!foundUser) {
    throw new UnauthorizedError();
  }

  return {
    user: foundUser,
  };
}
