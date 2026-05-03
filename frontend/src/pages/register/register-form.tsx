import { useRegisterForm } from '@/hooks';
import type { RegisterFormData } from '@/libs/schemas';
import { Button, Input, Label, Spinner } from '@/components/ui';
import { FormField, FormFieldAlert, FormFieldFlow } from '@/components/widgets';

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useRegisterForm();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Registration ok:', data);
      reset();
    } catch (error) {
      console.error('Registration failed:', error);
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
            htmlFor='name'
            isInvalid={!!errors.name}
          >
            Name
          </Label>
          <Input
            id='name'
            autoComplete='name'
            placeholder='Your full name'
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
            autoComplete='new-password'
            placeholder='Your password'
            required
            aria-required
            aria-describedby='passwordAlert'
            isInvalid={!!errors.password}
            {...register('password')}
          />
          {errors.password && (
            <FormFieldAlert id='passwordAlert'>
              {errors.password.message}
            </FormFieldAlert>
          )}
        </FormField>
        <FormField>
          <Label
            htmlFor='confirmPassword'
            isInvalid={!!errors.confirmPassword}
          >
            Confirm password
          </Label>
          <Input
            type='password'
            id='confirmPassword'
            autoComplete='new-password'
            placeholder='Your password'
            required
            aria-required
            aria-describedby='confirmPasswordAlert'
            isInvalid={!!errors.confirmPassword}
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <FormFieldAlert id='confirmPasswordAlert'>
              {errors.confirmPassword.message}
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
                aria-label='Creating your account'
              />{' '}
              <span aria-hidden={true}>Sign Up...</span>
            </>
          ) : (
            'Login'
          )}
        </Button>
      </FormFieldFlow>
    </form>
  );
};
