import { useEffect, type ComponentProps } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controller } from 'react-hook-form';

import { clearCart, selectGrandTotal, selectItems } from '@/app/features/cart';
import type { AppDispatch } from '@/app/store';
import { Input, Label, Radio } from '@/components/ui';
import { useCheckoutForm } from '@/hooks';
import { cn } from '@/libs/cn';
import type { CheckoutFormData } from '@/libs/schemas';
import { CashOnDelivery } from '@/assets/icons';

type FormFieldAlertProps = React.ComponentProps<'p'>;

const FormFieldAlert = ({ ...props }: FormFieldAlertProps) => {
  return (
    <p
      {...props}
      role='alert'
      aria-live='polite'
      className={cn('text-3xs', 'text-danger-400')}
    />
  );
};

type FormGroupProps = ComponentProps<'fieldset'>;

const FormGroup = ({ className, ...props }: FormGroupProps) => {
  return (
    <fieldset
      {...props}
      className={cn(
        'pbs-4',
        'first:mbs-(--form-flow-spacing)',

        'first:lg:mbs-(--form-flow-spacing)',

        className,
      )}
    />
  );
};

type FormGroupTitleProps = ComponentProps<'legend'>;

const FormGroupTitle = ({ className, ...props }: FormGroupTitleProps) => {
  return (
    <legend
      {...props}
      className={cn(
        'block',
        'text-2xs',

        'text-primary-400',
        'uppercase',

        className,
      )}
    />
  );
};

type FormGroupContentProps = ComponentProps<'div'>;

const FormGroupContent = ({ className, ...props }: FormGroupContentProps) => {
  return (
    <div
      {...props}
      className={cn(
        'inline-full',
        'grid',
        'gap-x-4',
        'gap-y-4',

        'md:grid-cols-2',

        'lg:gap-y-6',

        className,
      )}
    />
  );
};

type FormFieldProps = ComponentProps<'div'>;

const FormField = ({ className, ...props }: FormFieldProps) => {
  return (
    <div
      {...props}
      className={cn(
        'inline-full',
        'flex',
        'flex-col',
        'gap-2',

        className,
      )}
    />
  );
};

type FormFlowProps = ComponentProps<'div'>;

const FormFlow = ({ className, ...props }: FormFlowProps) => {
  return (
    <div
      {...props}
      className={cn(
        'flex',
        'flex-col',
        'gap-(--form-flow-spacing)',

        'lg:gap-(--form-flow-spacing-lg)',

        className,
      )}
    />
  );
};

type FormSubgroupProps = ComponentProps<'fieldset'>;

const FormSubgroup = ({ className, ...props }: FormSubgroupProps) => {
  return (
    <fieldset
      {...props}
      className={cn('pbs-4', className)}
    />
  );
};

type FormSubgroupTitleProps = ComponentProps<'legend'>;

const FormSubgroupTitle = ({ className, ...props }: FormSubgroupTitleProps) => {
  return (
    <legend
      {...props}
      className={cn('text-2xs', className)}
    />
  );
};

interface CheckoutFormProps extends ComponentProps<'form'> {
  id: string;
  onSubmittingChange: (isSubmitting: boolean) => void;
  onValidChange: (isValid: boolean) => void;
}

export const CheckoutForm = ({
  id,
  onValidChange,
  onSubmittingChange,
  ...formProps
}: CheckoutFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector(selectItems);
  const grandTotal = useSelector(selectGrandTotal);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useCheckoutForm();

  useEffect(() => {
    onValidChange(isValid);
    onSubmittingChange(isSubmitting);
  }, [isValid, onValidChange, isSubmitting, onSubmittingChange]);

  const paymentMethod = watch('paymentMethod');

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 5 * 1000));

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, items: cartItems, total: grandTotal }),
      });

      const responseBody = await response.json();

      console.log(responseBody);
      dispatch(clearCart());

      // open order conformation modal
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      {...formProps}
      id={id}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormFlow>
        <FormGroup data-group='billing-details'>
          <FormGroupTitle>Billing Details</FormGroupTitle>
          <FormGroupContent>
            <FormField>
              <Label
                htmlFor='name'
                isInvalid={!!errors.name}
              >
                Name
              </Label>
              <Input
                type='text'
                id='name'
                autoComplete='cc-name'
                placeholder='John Doe'
                required
                aria-required
                aria-describedby='nameAlert'
                isInvalid={!!errors.name}
                {...register('name')}
              />
              {errors.name && (
                <FormFieldAlert id='nameAlert'>
                  {errors.name.message}
                </FormFieldAlert>
              )}
            </FormField>
            <FormField>
              <Label
                htmlFor='email'
                isInvalid={!!errors.email}
              >
                Email Address
              </Label>
              <Input
                type='email'
                inputMode='email'
                id='email'
                autoComplete='email'
                placeholder='johndoe@example.com'
                required
                aria-required
                aria-describedby='emailAlert'
                isInvalid={!!errors.email}
                {...register('email')}
              />
              {errors.email && (
                <FormFieldAlert id='emailAlert'>
                  {errors.email.message}
                </FormFieldAlert>
              )}
            </FormField>
            <FormField>
              <Label
                htmlFor='phone'
                isInvalid={!!errors.phone}
              >
                Phone Number
              </Label>
              <Input
                type='text'
                id='phone'
                autoComplete='tel'
                placeholder='+1 202-55-0136'
                required
                aria-required
                aria-describedby='phoneAlert'
                isInvalid={!!errors.phone}
                {...register('phone')}
              />
              {errors.phone && (
                <FormFieldAlert id='phoneAlert'>
                  {errors.phone.message}
                </FormFieldAlert>
              )}
            </FormField>
          </FormGroupContent>
        </FormGroup>
        <FormGroup data-group='shipping-info'>
          <FormGroupTitle>Shipping Info</FormGroupTitle>
          <FormGroupContent>
            <FormField>
              <Label
                htmlFor='address'
                isInvalid={!!errors.address}
              >
                Address
              </Label>
              <Input
                type='text'
                id='address'
                autoCapitalize='address-line1'
                placeholder='1137 Williams Avenue'
                required
                aria-required
                aria-describedby='addressAlert'
                isInvalid={!!errors.address}
                {...register('address')}
              />
              {errors.address && (
                <FormFieldAlert id='addressAlert'>
                  {errors.address.message}
                </FormFieldAlert>
              )}
            </FormField>
            <FormField>
              <Label
                htmlFor='zip'
                isInvalid={!!errors.zip}
              >
                Zip Code
              </Label>
              <Input
                type='text'
                id='zip'
                autoComplete='postal-code'
                placeholder='10001'
                required
                aria-required
                aria-describedby='zipAlert'
                isInvalid={!!errors.zip}
                {...register('zip')}
              />
              {errors.zip && (
                <FormFieldAlert id='zipAlert'>
                  {errors.zip.message}
                </FormFieldAlert>
              )}
            </FormField>
            <FormField>
              <Label
                htmlFor='city'
                isInvalid={!!errors.city}
              >
                City
              </Label>
              <Input
                type='text'
                id='city'
                placeholder='New York'
                autoComplete='address-level2'
                required
                aria-required
                aria-describedby='cityAlert'
                isInvalid={!!errors.city}
                {...register('city')}
              />
              {errors.city && (
                <FormFieldAlert id='cityAlert'>
                  {errors.city.message}
                </FormFieldAlert>
              )}
            </FormField>
            <FormField>
              <Label
                htmlFor='country'
                isInvalid={!!errors.country}
              >
                Country
              </Label>
              <Input
                type='text'
                id='country'
                placeholder='United States'
                autoComplete='country-name'
                required
                aria-required
                aria-describedby='countryAlert'
                isInvalid={!!errors.country}
                {...register('country')}
              />
              {errors.country && (
                <FormFieldAlert id='countryAlert'>
                  {errors.country.message}
                </FormFieldAlert>
              )}
            </FormField>
          </FormGroupContent>
        </FormGroup>
        <FormGroup data-group='payment-details'>
          <FormGroupTitle>Payment Details</FormGroupTitle>
          <FormFlow>
            <FormSubgroup>
              <FormSubgroupTitle>Payment Method</FormSubgroupTitle>
              <FormGroupContent
                className={cn(
                  'grid-cols-1',
                  'gap-4',

                  'sm:grid-cols-2',
                )}
              >
                <Controller
                  name='paymentMethod'
                  control={control}
                  render={({ field }) => (
                    <>
                      <Radio
                        label='e-Money'
                        value='e-money'
                        name={field.name}
                        checked={field.value === 'e-money'}
                        onChange={field.onChange}
                      />
                      <Radio
                        label='Cash on Delivery'
                        value='cash-on-delivery'
                        ariaDescribedby='cashOnDeliveryAlert'
                        name={field.name}
                        checked={field.value === 'cash-on-delivery'}
                        onChange={field.onChange}
                      />
                    </>
                  )}
                />
              </FormGroupContent>
            </FormSubgroup>

            {paymentMethod === 'cash-on-delivery' && (
              <div
                className={cn(
                  'flex',
                  'items-start',
                  'gap-4',

                  'md:gap-6',

                  'lg:gap-8',
                )}
              >
                <CashOnDelivery
                  aria-hidden={true}
                  focusable={false}
                  className={cn('shrink-0')}
                />
                <p
                  id='cashOnDeliveryAlert'
                  aria-live='polite'
                  role='alert'
                  className={cn(
                    'text-base',

                    'text-black/50',
                  )}
                >
                  The{' '}
                  <strong className={cn('font-bold')}>Cash on Delivery</strong>{' '}
                  option enables you to pay in cash when our delivery courier
                  arrives at your residence. Just make sure your address is
                  correct so that your order will not be cancelled.
                </p>
              </div>
            )}
            {paymentMethod === 'e-money' && (
              <FormGroupContent>
                <FormField>
                  <Label
                    htmlFor='eMoneyNumber'
                    isInvalid={!!errors.eMoneyNumber}
                  >
                    e-Money Number
                  </Label>
                  <Input
                    type='text'
                    id='eMoneyNumber'
                    autoComplete='cc-number'
                    placeholder='238521993'
                    required
                    aria-required
                    aria-describedby='eMoneyNumberAlert'
                    isInvalid={!!errors.eMoneyNumber}
                    {...register('eMoneyNumber')}
                  />
                  {errors.eMoneyNumber && (
                    <FormFieldAlert id='eMoneyNumberAlert'>
                      {errors.eMoneyNumber.message}
                    </FormFieldAlert>
                  )}
                </FormField>
                <FormField>
                  <Label
                    htmlFor='eMoneyPin'
                    isInvalid={!!errors.eMoneyPin}
                  >
                    e-Money PIN
                  </Label>
                  <Input
                    type='text'
                    id='eMoneyPin'
                    autoComplete='cc-csc'
                    placeholder='6891'
                    required
                    aria-required
                    aria-describedby='eMoneyPinAlert'
                    isInvalid={!!errors.eMoneyPin}
                    {...register('eMoneyPin')}
                  />
                  {errors.eMoneyPin && (
                    <FormFieldAlert id='eMoneyPinAlert'>
                      {errors.eMoneyPin.message}
                    </FormFieldAlert>
                  )}
                </FormField>
              </FormGroupContent>
            )}
          </FormFlow>
        </FormGroup>
      </FormFlow>
    </form>
  );
};
