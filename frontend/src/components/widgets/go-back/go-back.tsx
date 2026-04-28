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
      onClick={handleClick}
      className={cn('link', 'text-base', 'capitalize', 'text-black/50')}
    >
      <span className={cn('sr-only')}>{label} - return to previous page</span>
      <span aria-hidden={true}>{label}</span>
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
