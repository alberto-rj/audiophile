import { useId, useState } from 'react';

import { Button, Card, Spinner } from '@/components/ui';
import { GoBack } from '@/components/widgets';
import { useSecondaryPage } from '@/hooks';
import { cn } from '@/libs/cn';

import { CheckoutForm } from './checkout-form';
import { CartSummaryQuery } from './cart-summary';

const CheckoutPage = () => {
  useSecondaryPage();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const formId = useId();

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
              'text-xl',

              'lg:text-2xl',

              'text-black',
              'uppercase',
            )}
          >
            Checkout
          </h1>
          <CheckoutForm
            id={formId}
            onSubmittingChange={setIsSubmitting}
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
            <CartSummaryQuery />
            <Button
              type='submit'
              form={formId}
              variant='primary'
              disabled={isSubmitting}
              className={cn('inline-full')}
            >
              {isSubmitting ? (
                <>
                  <Spinner
                    variant='primary'
                    size='sm'
                  />
                  Submitting...
                </>
              ) : (
                <>Continue & pay</>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default CheckoutPage;
