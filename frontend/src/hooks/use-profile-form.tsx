import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { selectUser } from '@/app/features/auth';
import { profileFormSchema, type ProfileFormData } from '@/libs/schemas';

export const useProfileForm = () => {
  const user = useSelector(selectUser);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),

    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },

    mode: 'onBlur',

    reValidateMode: 'onChange',
  });

  return form;
};
