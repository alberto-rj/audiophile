import { Link } from 'react-router-dom';

import { Button } from '@/components/ui';
import { FormCard } from '@/components/widgets';
import { cn } from '@/libs/cn';
import { useSecondaryPage } from '@/hooks';

import { RegisterForm } from './register-form';

const RegisterPage = () => {
  useSecondaryPage();

  return (
    <FormCard className={cn('max-inline-110')}>
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
            <Link to='/login'>Login</Link>
          </Button>
        </p>
      </FormCard.Footer>
    </FormCard>
  );
};

export default RegisterPage;
