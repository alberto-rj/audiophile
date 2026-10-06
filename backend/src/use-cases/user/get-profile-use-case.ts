import { userRepository } from '@/config';
import { toUserFindByIdInput, UnauthorizedError } from '@/helpers';
import type { User } from '@audiophile/shared';

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
