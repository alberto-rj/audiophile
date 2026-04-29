import { useEffect, useId, useState } from 'react';

import { Button, Card } from '@/components/ui';
import { GoBack } from '@/components/widgets';
import { cn } from '@/libs/cn';

import { CheckoutForm } from './checkout-form';
import { CartSummary } from './cart-summary';

const CheckoutPage = () => {
  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formId = useId();

  useEffect(() => {
    document.documentElement.setAttribute('data-current-page', 'checkout');

    return () => {
      document.documentElement.removeAttribute('data-current-page');
    };
  }, []);

  return (
    <>
      <GoBack>
        <GoBack.Control />
      </GoBack>
      <div
        className={cn(
          'wrapper',
          'flex',
          'flex-col',

          'gap-8',

          'lg:flex-row',
          'lg:justify-between',
          'lg:items-start',
          'lg:gap-7.5',
        )}
      >
        <Card
          className={cn(
            'p-6',

            'md:p-8',

            'lg:p-12',
          )}
        >
          <h1
            className={cn(
              'uppercase',
              'text-xl',

              'lg:text-2xl',
              'text-black',
            )}
          >
            Checkout
          </h1>
          <CheckoutForm
            id={formId}
            onSubmittingChange={setIsSubmitting}
            onValidChange={setIsValid}
          />
        </Card>
        <Card
          className={cn(
            'p-6',

            'md:p-8',

            'lg:max-inline-87.5',
          )}
        >
          <div
            className={cn(
              'size-full',
              'flex',
              'flex-col',
              'justify-between',
              'gap-8',
            )}
          >
            <CartSummary />
            <Button
              type='submit'
              form={formId}
              variant='primary'
              disabled={!isValid || isSubmitting}
              className={cn('inline-full')}
            >
              Continue & pay
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default CheckoutPage;
