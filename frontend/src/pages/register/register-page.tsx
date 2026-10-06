import { Link } from 'react-router-dom';

import { Logo } from '@/assets/icons';
import { Button } from '@/components/ui';
import { FormCard, SEO } from '@/components/widgets';
import { APP_ROUTES } from '@/config/app-routes';
import { useSecondaryPage } from '@/hooks';
import { cn } from '@/libs/cn';

import { RegisterForm } from './register-form';

const RegisterPage = () => {
  useSecondaryPage();

  return (
    <>
      <SEO
        metadata={{
          title: 'Sign Up | Audiophile',
          description:
            'Create your Audiophile account to view orders, manage your profile, and start shopping.',
        }}
      />
      <FormCard>
        <Link
          to={APP_ROUTES.home}
          className={cn(
            'self-center',

            'text-black',
            'cursor-pointer',
          )}
        >
          <span className={cn('sr-only')}>Go to Audiophile homepage</span>
          <Logo
            aria-hidden={true}
            focusable={false}
          />
        </Link>
        <FormCard.Header>
          <FormCard.Title>Sign up</FormCard.Title>
          <FormCard.Description>
            Enter your details to create your account.
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
              variant="link"
              asChild
            >
              <Link to={APP_ROUTES.login}>Sign in</Link>
            </Button>
          </p>
        </FormCard.Footer>
      </FormCard>
    </>
  );
};

export default RegisterPage;
