import { cva } from 'class-variance-authority';
import type { InputHTMLAttributes } from 'react';

import { cn } from '@/libs/cn';

const inputVariants = cva(
  cn(
    'inline-block',
    'w-full',
    'px-6',
    'py-4.5',
    'bg-white',
    'border',
    'rounded-lg',
    'font-display',
    'text-form',
    'text-black',
    'placeholder:text-black-o-40',

    'disabled:bg-gray-200',
    'disabled:border-gray-400',
    'disabled:opacity-50',
    'disabled:placeholder:text-black-o-50',
    'disabled:cursor-not-allowed',
    'disabled:pointer-events-none',
    'disabled:select-none',

    'focus:outline',
  ),
  {
    variants: {
      isInvalid: {
        false: cn(
          'border-gray-600',
          'focus:outline-primary-400',
          'focus:caret-primary-400',
          'focus-visible:outline-primary-400',
          'focus-visible:caret-primary-400',
        ),

        true: cn(
          'border-danger-400',
          'focus:outline-danger-400',
          'focus:caret-danger-400',
          'focus-visible:outline-danger-400',
          'focus-visible:caret-danger-400',
        ),
      },
    },

    defaultVariants: {
      isInvalid: false,
    },
  },
);

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
}

const Input = ({ isInvalid, className, ...props }: InputProps) => {
  const inputClasses = cn(inputVariants({ isInvalid }), className);

  return (
    <input
      aria-invalid={isInvalid ?? undefined}
      className={inputClasses}
      {...props}
    />
  );
};

export default Input;
