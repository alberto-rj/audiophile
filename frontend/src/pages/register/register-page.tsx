import { Link } from 'react-router-dom';

import { Logo } from '@/assets/icons';
import { Button } from '@/components/ui';
import { FormCard } from '@/components/widgets';
import { APP_ROUTES } from '@/config/app-routes';
import { useSecondaryPage } from '@/hooks';
import { cn } from '@/libs/cn';

import { RegisterForm } from './register-form';

const RegisterPage = () => {
  useSecondaryPage();

  return (
    <FormCard>
      <Link
        aria-label='Audiophile - home'
        to={APP_ROUTES.home}
        className={cn(
          'self-center',

          'text-black',
          'cursor-pointer',
        )}
      >
        <Logo
          aria-hidden={true}
          focusable={false}
        />
      </Link>
      <FormCard.Header>
        <FormCard.Title>Create account</FormCard.Title>
        <FormCard.Description>
          Please fill the fields below to create a new account.
        </FormCard.Description>
      </FormCard.Header>
      <FormCard.Body>
        <RegisterForm />
      </FormCard.Body>
      <FormCard.Footer>
        <p
          className={cn(
            'text-xs',

            'text-center',
            'font-medium',
          )}
        >
          Already have an account?{' '}
          <Button
            variant='link'
            asChild
          >
            <Link to={APP_ROUTES.login}>Sign in</Link>
          </Button>
        </p>
      </FormCard.Footer>
    </FormCard>
  );
};

export default RegisterPage;
