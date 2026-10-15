import {
  ApiAuthLoginBodySchema,
  type ApiAuthLoginBody,
} from '@audiophile/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const useLoginForm = () => {
  const form = useForm<ApiAuthLoginBody>({
    resolver: zodResolver(ApiAuthLoginBodySchema),

    defaultValues: {
      email: '',
      password: '',
    },

    mode: 'onBlur',

    reValidateMode: 'onChange',
  });

  return form;
};
