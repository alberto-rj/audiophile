import {
  ApiUserUpdateProfileBodySchema,
  type ApiUserUpdateProfileBody,
} from '@audiophile/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { selectUser } from '@/app/features/auth';

export const useProfileForm = () => {
  const user = useSelector(selectUser);

  const form = useForm<ApiUserUpdateProfileBody>({
    resolver: zodResolver(ApiUserUpdateProfileBodySchema),

    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },

    mode: 'onBlur',

    reValidateMode: 'onChange',
  });

  return form;
};
