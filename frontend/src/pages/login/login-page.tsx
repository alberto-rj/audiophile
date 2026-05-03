import { Link } from 'react-router-dom';

import { Button, Card, Input, Label, Spinner } from '@/components/ui';
import { FormField, FormFieldAlert, FormFieldFlow } from '@/components/widgets';
import { cn } from '@/libs/cn';
import { useLoginForm } from '@/hooks';
import type { LoginFormData } from '@/libs/schemas';

const LoginPage = () => {
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
    <Card
      className={cn(
        'max-inline-100',
        'flex',
        'flex-col',
        'gap-8',
        'p-6',

        'md:p-8',

        'lg:p-12',
      )}
    >
      <div className={cn('flex', 'flex-col', 'gap-3')}>
        <h1 className={cn('text-xl', 'lg:text-2xl', 'text-black', 'uppercase')}>
          Your account
        </h1>
        <p>Please fill the fields below to have access to your account.</p>
      </div>
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
          <p
            className={cn(
              'text-xs',

              'text-center',
              'font-medium',
            )}
          >
            Do not have an account?{' '}
            <Button
              variant='link'
              asChild
            >
              <Link to='/register'>Create account</Link>
            </Button>
          </p>
        </FormFieldFlow>
      </form>
    </Card>
  );
};

export default LoginPage;
