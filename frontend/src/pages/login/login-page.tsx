import { Link } from 'react-router-dom';

import { Logo } from '@/assets/icons';
import { Button } from '@/components/ui';
import { FormCard } from '@/components/widgets';
import { APP_ROUTES } from '@/config/app-routes';
import { cn } from '@/libs/cn';
import { useSecondaryPage } from '@/hooks';

import { LoginForm } from './login-form';

const LoginPage = () => {
  useSecondaryPage();

  return (
    <div>
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
          <FormCard.Title>Sign in</FormCard.Title>
          <FormCard.Description>
            Please fill the fields below to have access to your account.
          </FormCard.Description>
        </FormCard.Header>
        <FormCard.Body>
          <LoginForm />
        </FormCard.Body>
        <FormCard.Footer>
          <p
            className={cn(
              'text-xs',

              'text-center',
              'font-medium',
            )}
          >
            Don't have an account?{' '}
            <Button
              variant='link'
              asChild
            >
              <Link to='/register'>Create one</Link>
            </Button>
          </p>
        </FormCard.Footer>
      </FormCard>
    </div>
  );
};

export default LoginPage;
