import { useState } from 'react';

import { Input, Label, Radio } from '@/components/ui';
import { cn } from '@/libs/cn';
import type { PaymentMethod } from '@/libs/types';

interface CheckoutFormProps {
  formId: string;
}

export const CheckoutForm = ({ formId }: CheckoutFormProps) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('e-money');

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value as PaymentMethod);
  };

  return (
    <form
      id={formId}
      className={cn('form-flow')}
    >
      <fieldset
        data-group='billing-details'
        className={cn('form-group')}
      >
        <legend className={cn('form-group-name')}>Billing Details</legend>
        <div className={cn('form-grid')}>
          <div className={cn('form-grid-item', 'form-field')}>
            <Label htmlFor='name'>Name</Label>
            <Input
              type='text'
              id='name'
              name='name'
              placeholder='John Doe'
            />
          </div>
          <div className={cn('form-grid-item', 'form-field')}>
            <Label htmlFor='email'>Email Address</Label>
            <Input
              type='email'
              inputMode='email'
              id='email'
              name='email'
              placeholder='johndoe@example.com'
            />
          </div>
          <div className={cn('form-grid-item', 'form-field')}>
            <Label htmlFor='phone'>Phone Number</Label>
            <Input
              type='text'
              id='phone'
              name='phone'
              placeholder='+1 202-55-0136'
            />
          </div>
        </div>
      </fieldset>
      <fieldset
        data-group='shipping-info'
        className={cn('form-group')}
      >
        <legend className={cn('form-group-name')}>Shipping Info</legend>

        <div className={cn('form-grid')}>
          <div className={cn('form-grid-item', 'form-field')}>
            <Label htmlFor='address'>Address</Label>
            <Input
              type='text'
              id='address'
              name='address'
              placeholder='1137 Williams Avenue'
            />
          </div>
          <div className={cn('form-grid-item', 'form-field')}>
            <Label htmlFor='zipCode'>Zip Code</Label>
            <Input
              type='text'
              id='zipCode'
              name='zipCode'
              placeholder='10001'
            />
          </div>
          <div className={cn('form-grid-item', 'form-field')}>
            <Label htmlFor='city'>City</Label>
            <Input
              type='text'
              id='city'
              name='city'
              placeholder='New York'
            />
          </div>
          <div className={cn('form-grid-item', 'form-field')}>
            <Label htmlFor='country'>Country</Label>
            <Input
              type='text'
              id='country'
              name='country'
              placeholder='United States'
            />
          </div>
        </div>
      </fieldset>
      <fieldset
        data-group='payment-details'
        className={cn('form-group')}
      >
        <legend className={cn('form-group-name')}>Payment Details</legend>
        <div className={cn('form-flow')}>
          <fieldset className={cn('form-subgroup')}>
            <legend className={cn('form-subgroup-name')}>Payment Method</legend>
            <div className={cn('form-grid')}>
              <div className={cn('form-grid-item')}>
                <Radio
                  name='paymentMethod'
                  label='Cash on Delivery'
                  value='cash-on-delivery'
                  checked={paymentMethod === 'cash-on-delivery'}
                  onChange={handlePaymentMethodChange}
                />
              </div>
              <div className={cn('form-grid-item')}>
                <Radio
                  name='paymentMethod'
                  label='e-Money'
                  value='e-money'
                  checked={paymentMethod === 'e-money'}
                  onChange={handlePaymentMethodChange}
                />
              </div>
            </div>
          </fieldset>
          {paymentMethod === 'e-money' && (
            <div className={cn('form-grid')}>
              <div className={cn('form-grid-item', 'form-field')}>
                <Label htmlFor='eMoneyNumber'>e-Money Number</Label>
                <Input
                  type='text'
                  id='eMoneyNumber'
                  name='eMoneyNumber'
                  placeholder='238521993'
                />
              </div>
              <div className={cn('form-grid-item', 'form-field')}>
                <Label htmlFor='eMoneyPIN'>e-Money PIN</Label>
                <Input
                  type='text'
                  id='eMoneyPIN'
                  name='eMoneyPIN'
                  placeholder='6891'
                />
              </div>
            </div>
          )}
        </div>
      </fieldset>
    </form>
  );
};
