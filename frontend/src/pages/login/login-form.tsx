import { useLoginForm } from '@/hooks';
import type { LoginFormData } from '@/libs/schemas';

import { Button, Input, Label, Spinner } from '@/components/ui';
import { FormField, FormFieldAlert, FormFieldFlow } from '@/components/widgets';

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useLoginForm();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Login:', data);
      reset();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormFieldFlow>
        <FormField>
          <Label
            htmlFor='email'
            isInvalid={!!errors.email}
          >
            Email
          </Label>
          <Input
            type='email'
            inputMode='email'
            id='email'
            autoComplete='email'
            placeholder='Your email'
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
            htmlFor='password'
            isInvalid={!!errors.password}
          >
            Password
          </Label>
          <Input
            type='password'
            id='password'
            autoComplete='current-password'
            placeholder='Your password'
            required
            aria-required
            aria-describedby='passwordAlert'
            isInvalid={!!errors.email}
            {...register('password')}
          />
          {errors.password && (
            <FormFieldAlert id='passwordAlert'>
              {errors.password.message}
            </FormFieldAlert>
          )}
        </FormField>
        <Button
          type='submit'
          variant='primary'
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Spinner
                variant='primary'
                size='sm'
                aria-label='Entering to your account'
              />{' '}
              <span aria-hidden={true}>Entering...</span>
            </>
          ) : (
            'Login'
          )}
        </Button>
      </FormFieldFlow>
    </form>
  );
};
