import { Button, Input, Label, Radio } from '@/components/ui';
import { cn } from '@/libs/cn';

const CheckoutPage = () => {
  return (
    <div className={cn('min-h-full', 'bg-gray-300')}>
      <div className={cn('flow', 'wrapper')}>
        <div className={cn('flow-spacing')}>
          <h1 className={cn('uppercase', 'text-2xl', 'text-black')}>
            Checkout
          </h1>
          <form className={cn('form')}>
            <fieldset className={cn('form__group')}>
              <legend className={cn('form__group-name')}>
                Billing Details
              </legend>
              <div className={cn('form__field')}>
                <Label htmlFor='name'>Name</Label>
                <Input
                  type='text'
                  id='name'
                  name='name'
                  placeholder='John Doe'
                />
              </div>
              <div className={cn('form__field')}>
                <Label htmlFor='email'>Email Address</Label>
                <Input
                  type='email'
                  inputMode='email'
                  id='email'
                  name='email'
                  placeholder='johndoe@example.com'
                />
              </div>
              <div className={cn('form__field')}>
                <Label htmlFor='phone'>Phone Number</Label>
                <Input
                  type='text'
                  id='phone'
                  name='phone'
                  placeholder='+1 202-55-0136'
                />
              </div>
            </fieldset>
            <fieldset className={cn('form__group')}>
              <legend className={cn('form__group-name')}>Shipping Info</legend>
              <div className={cn('form__field')}>
                <Label htmlFor='address'>Address</Label>
                <Input
                  type='text'
                  id='address'
                  name='address'
                  placeholder='1137 Williams Avenue'
                />
              </div>
              <div className={cn('form__field')}>
                <Label htmlFor='zipCode'>Zip Code</Label>
                <Input
                  type='text'
                  id='zipCode'
                  name='zipCode'
                  placeholder='10001'
                />
              </div>
              <div className={cn('form__field')}>
                <Label htmlFor='city'>City</Label>
                <Input
                  type='text'
                  id='city'
                  name='city'
                  placeholder='New York'
                />
              </div>
            </fieldset>
            <fieldset className={cn('form__group')}>
              <legend className={cn('form__group-name')}>
                Payment Details
              </legend>
              <fieldset className={cn('form__subgroup')}>
                <legend className={cn('form__subgroup-name')}>
                  Payment Method
                </legend>
                <Radio
                  name='paymentMethod'
                  label='Cash on Delivery'
                  value='cash-on-delivery'
                  onChange={(value) => console.log(value)}
                />
                <Radio
                  name='paymentMethod'
                  label='e-Money'
                  value='e-money'
                  onChange={(value) => console.log(value)}
                />
              </fieldset>
              <div className={cn('form__field')}>
                <Label htmlFor='eMoneyNumber'>e-Money Number</Label>
                <Input
                  type='text'
                  id='eMoneyNumber'
                  name='eMoneyNumber'
                  placeholder='238521993'
                />
              </div>
              <div className={cn('form__field')}>
                <Label htmlFor='eMoneyPIN'>e-Money PIN</Label>
                <Input
                  type='text'
                  id='eMoneyPIN'
                  name='eMoneyPIN'
                  placeholder='6891'
                />
              </div>
            </fieldset>
          </form>
        </div>
        <div>
          <summary>
            <h2 className={cn('uppercase', 'text-lg', 'text-black')}>
              Summary
            </h2>
            <Button
              type='submit'
              variant='primary'
            >
              Continue & pay
            </Button>
            <dl>
              <div>
                <dt>Total</dt>
                <dd>$ 5,396</dd>
              </div>
              <div>
                <dt>Shipping</dt>
                <dd>$ 50</dd>
              </div>
              <div>
                <dt>VAT (included)</dt>
                <dd>$ 1,079</dd>
              </div>
              <div>
                <dt>Grand Total</dt>
                <dd>$ 5,446</dd>
              </div>
            </dl>
          </summary>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
