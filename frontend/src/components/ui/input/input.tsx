import type { InputHTMLAttributes } from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '@/libs/cn';

const inputVariants = cva(
  cn(
    'inline-block',
    'inline-full',
    'px-6',
    'py-4.5',
    'bg-white',
    'border',
    'rounded-lg',
    'font-display',
    'text-xs',
    'text-black',
    'placeholder:text-black/40',

    'disabled:bg-gray-200',
    'disabled:border-gray-400',
    'disabled:opacity-50',
    'disabled:placeholder:text-black/50',
    'disabled:pointer-events-none',
    'disabled:cursor-not-allowed',
    'disabled:select-none',
  ),
  {
    variants: {
      isInvalid: {
        false: cn(
          'border-gray-600',
          'focus:border-primary-400',
          'focus:caret-primary-400',
          'focus-visible:caret-primary-400',
        ),

        true: cn(
          'border-danger-400',
          'focus:caret-danger-400',
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
