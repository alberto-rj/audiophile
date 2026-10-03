import { userRepository } from '@/config';
import { toUserUpdateProfileInput, UnauthorizedError } from '@/helpers';
import type { User } from '@/schemas';

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
