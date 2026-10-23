import type { User } from '@audiophile/shared';

import { userRepository } from '@/config/repositories';
import { UnauthorizedError } from '@/helpers/app-error';
import { toUserUpdateProfileInput } from '@/helpers/user';

interface UpdateProfileUseCaseParams {
  input: unknown;
}

interface UpdateProfileUseCaseResult {
  user: User;
}

export async function updateProfileUseCase({
  input,
}: UpdateProfileUseCaseParams): Promise<UpdateProfileUseCaseResult> {
  const { id, name, email } = toUserUpdateProfileInput(input);

  const foundUser = await userRepository.findById({
    id,
  });

  if (!foundUser) {
    throw new UnauthorizedError();
  }

  const updatedUser = await userRepository.update({
    id,
    name,
    email,
  });

  if (!updatedUser) {
    throw new UnauthorizedError();
  }

  return {
    user: updatedUser,
  };
}
