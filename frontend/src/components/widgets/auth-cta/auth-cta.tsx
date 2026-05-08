import { Link } from 'react-router-dom';

import { APP_ROUTES } from '@/config/app-routes';
import { cn } from '@/libs/cn';

const AuthCTA = () => {
  return (
    <div className={cn('flex', 'flex-wrap', 'items-center', 'gap-8')}>
      <Link
        to={APP_ROUTES.login}
        className={cn('link', 'nav-link')}
      >
        Sign in
      </Link>
      <Link
        to={APP_ROUTES.register}
        className={cn(
          'p-2',

          'link',
          'nav-link',
          'border',
          'border-current',
          'rounded-lg',
        )}
      >
        Sign up
      </Link>
    </div>
  );
};

export default AuthCTA;
