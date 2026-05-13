import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import type { AppDispatch } from '@/app/store';
import { useLoginMutation } from '@/app/services/auth-api';
import { setCredentials } from '@/app/features/auth';
import { Button, Input, Label, Spinner } from '@/components/ui';
import {
  FormField,
  FormFieldAlert,
  FormFieldFlow,
  StatusVisuallyHidden,
} from '@/components/widgets';
import { APP_ROUTES } from '@/config/app-routes';
import { useLoginForm } from '@/hooks';
import type { LoginFormData } from '@/libs/schemas';
import type { ApiError } from '@/libs/types';

export const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch<AppDispatch>();

  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useLoginForm();

  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname ??
    APP_ROUTES.home;

  const onSubmit = async (data: LoginFormData) => {
    try {
      const { user, accessToken } = await login(data).unwrap();

      reset();

      dispatch(setCredentials({ user, accessToken }));
      navigate(from, { replace: true });
    } catch (error) {
      const apiError = error as ApiError;

      if (apiError?.status == 401) {
        setError('password', { message: 'Invalid email or password.' });
      } else {
        setError('password', { message: 'Failed to sign in.' });
      }

      console.error('Failed to sign in:', error);
    }
  };

  return (
    <>
      <StatusVisuallyHidden>
        {isLoading ? 'Signing in' : ''}
      </StatusVisuallyHidden>
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
              autoComplete='current-password'
              placeholder='Your password'
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
                Signing in...
              </>
            ) : (
              <>Sign in</>
            )}
          </Button>
        </FormFieldFlow>
      </form>
    </>
  );
};
