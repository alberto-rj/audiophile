import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { loginSchema, type LoginFormData } from '@/libs/schemas';

export const useLoginForm = () => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: '',
      password: '',
    },

    mode: 'onBlur',

    reValidateMode: 'onChange',
  });

  return form;
};
