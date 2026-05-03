import { Link } from 'react-router-dom';

import { Button } from '@/components/ui';
import { FormCard } from '@/components/widgets';
import { cn } from '@/libs/cn';
import { useSecondaryPage } from '@/hooks';

import { LoginForm } from './login-form';

const LoginPage = () => {
  useSecondaryPage();

  return (
    <FormCard>
      <FormCard.Header>
        <FormCard.Title>Your account</FormCard.Title>
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
          Do not have an account?{' '}
          <Button
            variant='link'
            asChild
          >
            <Link to='/register'>Create account</Link>
          </Button>
        </p>
      </FormCard.Footer>
    </FormCard>
  );
};

export default LoginPage;
