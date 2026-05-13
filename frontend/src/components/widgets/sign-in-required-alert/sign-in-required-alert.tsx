import type { ComponentProps } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Alert, Button } from '@/components/ui';
import { APP_ROUTES } from '@/config/app-routes';
import { cn } from '@/libs/cn';

interface SignInRequiredAlertProps extends Omit<
  ComponentProps<typeof Alert>,
  'children'
> {
  onSignIn?: () => void;
  onCancel?: () => void;
}

const SignInRequiredAlert = ({
  onSignIn,
  onCancel,
  ...props
}: SignInRequiredAlertProps) => {
  const location = useLocation();

  return (
    <Alert {...props}>
      <Alert.Portal>
        <Alert.Overlay />
        <Alert.Content>
          <Alert.Title className={cn('h6')}>Sign in required</Alert.Title>
          <Alert.Description className={cn('mbs-3', 'mbe-6')}>
            You need an account to add items to your cart.
          </Alert.Description>

          <div
            className={cn(
              'flex',
              'flex-col',
              'items-center',
              'gap-6',

              'sm:flex-row-reverse',
              'sm:justify-start',
            )}
          >
            <Alert.Action asChild>
              <Button
                variant='primary'
                asChild
              >
                <Link
                  to={APP_ROUTES.login}
                  state={{ from: location }}
                  onClick={onSignIn}
                >
                  Sign in
                </Link>
              </Button>
            </Alert.Action>
            <Alert.Cancel asChild>
              <Button
                variant='link'
                onClick={onCancel}
              >
                Cancel
              </Button>
            </Alert.Cancel>
          </div>
        </Alert.Content>
      </Alert.Portal>
    </Alert>
  );
};

export default SignInRequiredAlert;
