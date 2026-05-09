import { Link } from 'react-router-dom';

import { APP_ROUTES } from '@/config/app-routes';
import { cn } from '@/libs/cn';

interface AuthCTAProps {
  className?: string;
}

const AuthCTA = ({ className }: AuthCTAProps) => {
  return (
    <ul
      role='list'
      className={className}
    >
      <li>
        <Link
          to={APP_ROUTES.login}
          className={cn('link', 'nav-link')}
        >
          Sign in
        </Link>
      </li>
      <li>
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
      </li>
    </ul>
  );
};

export default AuthCTA;
