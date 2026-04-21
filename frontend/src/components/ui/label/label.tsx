import type { LabelHTMLAttributes } from 'react';

import { cn } from '@/libs/cn';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  isInvalid?: boolean;
}

const Label = ({ isInvalid = false, children, ...props }: LabelProps) => {
  return (
    <label
      className={cn('text-xs', {
        'text-danger-400': isInvalid,
        'text-black': !isInvalid,
      })}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
