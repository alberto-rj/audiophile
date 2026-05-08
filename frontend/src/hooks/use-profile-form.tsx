import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { profileFormSchema, type ProfileFormData } from '@/libs/schemas';

export const useProfileForm = () => {
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),

    defaultValues: {
      name: '',
      email: '',
    },

    mode: 'onBlur',

    reValidateMode: 'onChange',
  });

  return form;
};
