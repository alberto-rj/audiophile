import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { cn } from '@/libs/cn';

interface GoBackControlProps {
  label?: string;
}

const GoBackControl = ({ label = 'Go back' }: GoBackControlProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (window.history.length <= 1) {
      navigate('/');
      return;
    }

    navigate(-1);
  };

  return (
    <button
      type='button'
      aria-label={`${label} - return to previous page`}
      onClick={handleClick}
      className={cn('link', 'capitalize')}
    >
      {label}
    </button>
  );
};

interface GoBackProps {
  children?: ReactNode;
}

const GoBack = ({ children }: GoBackProps) => {
  return (
    <div
      className={cn(
        'wrapper',
        'py-6',

        'md:py-8',

        'lg:py-14',
      )}
    >
      {children}
    </div>
  );
};

GoBack.Control = GoBackControl;

export default GoBack;
