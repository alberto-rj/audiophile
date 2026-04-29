import { z } from 'zod';

export const checkoutSchema = z
  .object({
    name: z
      .string({ error: 'Name must be a string.' })
      .min(1, { error: 'Name is required.' }),

    email: z.email({
      pattern: z.regexes.email,
      error: 'Wrong email format.',
    }),

    phone: z
      .string({ error: 'Phone must be a string.' })
      .min(1, { error: 'Phone number is required.' }),

    address: z
      .string({ error: 'Address must be a string.' })
      .min(1, { error: 'Address is required.' }),

    zip: z
      .string({ error: 'Zip code must be a string.' })
      .min(1, { error: 'Zip code is required.' }),

    city: z
      .string({ error: 'City must be a string.' })
      .min(1, { error: 'City must is required.' }),

    country: z
      .string({ error: 'Country must be a string.' })
      .min(1, { error: 'Country is required.' }),

    paymentMethod: z.enum(['e-money', 'cash-on-delivery']),

    eMoneyNumber: z
      .string({ error: 'e-Money Number must be a string.' })
      .optional(),

    eMoneyPin: z.string({ error: 'e-Money Pin must be a string.' }).optional(),
  })
  .refine(
    ({ paymentMethod, eMoneyNumber }) => {
      if (paymentMethod === 'e-money') {
        return !!eMoneyNumber;
      }

      return true;
    },
    {
      error: 'e-Money number is required.',
      path: ['eMoneyNumber'],
    },
  )
  .refine(
    ({ paymentMethod, eMoneyPin }) => {
      if (paymentMethod === 'e-money') {
        return !!eMoneyPin;
      }

      return true;
    },
    {
      error: 'e-Money PIN is required',
      path: ['eMoneyPin'],
    },
  );

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
