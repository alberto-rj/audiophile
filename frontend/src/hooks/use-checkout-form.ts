import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { selectUser } from '@/app/features/auth';
import { checkoutSchema, type CheckoutFormData } from '@/libs/schemas';

export const useCheckoutForm = () => {
  const user = useSelector(selectUser);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),

    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      address: '',
      zip: '',
      city: '',
      country: '',
      paymentMethod: 'e-money',
      eMoneyNumber: '',
      eMoneyPin: '',
    },

    mode: 'onBlur',

    reValidateMode: 'onChange',
  });

  return form;
};
