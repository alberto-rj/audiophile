import { userRepository } from '@/config';
import {
  makeUpdateProfilePresenter,
  toSafeUser,
  UnauthorizedError,
} from '@/helpers';
import type { UserUpdateParams } from '@/repositories';
import type { SafeUser } from '@/schemas';

interface UpdateProfileUseCaseParams {
  payload: UserUpdateParams;
}

interface UpdateProfileUseCaseResult {
  user: SafeUser;
}

export async function updateProfileUseCase({
  payload,
}: UpdateProfileUseCaseParams): Promise<UpdateProfileUseCaseResult> {
  const { id, ...changes } = payload;

  const parsedChanges = makeUpdateProfilePresenter(changes);

  const foundUser = await userRepository.findById({
    id,
  });

  if (!foundUser) {
    throw new UnauthorizedError();
  }

  const updatedUser = await userRepository.update({
    id,
    ...parsedChanges,
  });

  if (!updatedUser) {
    throw new UnauthorizedError();
  }

  return {
    user: toSafeUser(updatedUser),
  };
}
