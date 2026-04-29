import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { checkoutSchema, type CheckoutFormData } from '@/libs/schemas/checkout';

export const useCheckoutForm = () => {
  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),

    defaultValues: {
      name: '',
      email: '',
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
