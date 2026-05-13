import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import type { AppDispatch } from '@/app/store';
import { useRegisterMutation } from '@/app/services/auth-api';
import { setCredentials } from '@/app/features/auth';
import { Button, Input, Label, Spinner } from '@/components/ui';
import {
  FormField,
  FormFieldAlert,
  FormFieldFlow,
  StatusVisuallyHidden,
} from '@/components/widgets';
import { APP_ROUTES } from '@/config/app-routes';
import { useRegisterForm } from '@/hooks';
import type { RegisterFormData } from '@/libs/schemas';
import type { ApiError } from '@/libs/types';

export const RegisterForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [registerUser, { isLoading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useRegisterForm();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const { name, email, password } = data;
      const { user, accessToken } = await registerUser({
        name,
        email,
        password,
      }).unwrap();

      reset();

      dispatch(setCredentials({ user, accessToken }));

      navigate(APP_ROUTES.home, { replace: true });
    } catch (error) {
      const apiError = error as ApiError;

      if (apiError.status === 409) {
        setError('email', { message: 'This email is already in use.' });
      }

      console.error('Registration failed:', error);
    }
  };

  return (
    <>
      <StatusVisuallyHidden>
        {isLoading ? 'Creating account' : ''}
      </StatusVisuallyHidden>
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
              type='text'
              id='name'
              autoComplete='name'
              placeholder='John Doe'
              required
              aria-required
              aria-describedby={errors.name ? 'nameAlert' : undefined}
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
              placeholder='johndoe@example.com'
              required
              aria-required
              aria-describedby={errors.email ? 'emailAlert' : undefined}
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
              placeholder='Min. 8 characters'
              required
              aria-required
              aria-describedby={errors.password ? 'passwordAlert' : undefined}
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
              aria-describedby={
                errors.confirmPassword ? 'confirmPasswordAlert' : undefined
              }
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
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner
                  variant='primary'
                  size='sm'
                />
                Creating account...
              </>
            ) : (
              <>Create account</>
            )}
          </Button>
        </FormFieldFlow>
      </form>
    </>
  );
};
