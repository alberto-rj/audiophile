import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { registerSchema, type RegisterFormData } from '@/libs/schemas';

export const useRegisterForm = () => {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      name: '',
      email: '',
      password: '',
    },

    mode: 'onBlur',

    reValidateMode: 'onChange',
  });

  return form;
};
