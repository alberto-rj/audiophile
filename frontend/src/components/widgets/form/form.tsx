import type { ComponentProps } from 'react';

import { cn } from '@/libs/cn';

type FormGroupProps = ComponentProps<'fieldset'>;

export const FormGroup = ({ className, ...props }: FormGroupProps) => {
  return (
    <fieldset
      {...props}
      className={cn(
        'pbs-4',
        'first:mbs-(--form-flow-spacing)',

        'first:lg:mbs-(--form-flow-spacing)',

        className,
      )}
    />
  );
};

type FormGroupTitleProps = ComponentProps<'legend'>;

export const FormGroupTitle = ({
  className,
  ...props
}: FormGroupTitleProps) => {
  return (
    <legend
      {...props}
      className={cn(
        'block',
        'text-2xs',

        'text-primary-700',
        'uppercase',

        className,
      )}
    />
  );
};

type FormGroupContentProps = ComponentProps<'div'>;

export const FormGroupContent = ({
  className,
  ...props
}: FormGroupContentProps) => {
  return (
    <div
      {...props}
      className={cn(
        'inline-full',
        'grid',
        'gap-x-4',
        'gap-y-4',

        'md:grid-cols-2',

        'lg:gap-y-6',

        className,
      )}
    />
  );
};

type FormFieldProps = ComponentProps<'div'>;

export const FormField = ({ className, ...props }: FormFieldProps) => {
  return (
    <div
      {...props}
      className={cn(
        'inline-full',
        'flex',
        'flex-col',
        'gap-2',

        className,
      )}
    />
  );
};

type FormFieldAlertProps = ComponentProps<'p'>;

export const FormFieldAlert = ({ ...props }: FormFieldAlertProps) => {
  return (
    <p
      {...props}
      role='alert'
      aria-live='polite'
      className={cn('text-3xs', 'text-danger-950')}
    />
  );
};

type FormFieldFlowProps = ComponentProps<'div'>;

export const FormFieldFlow = ({ className, ...props }: FormFieldFlowProps) => {
  return (
    <div
      {...props}
      className={cn(
        'inline-full',
        'flex',
        'flex-col',
        'gap-4',

        'lg:gap-4',

        className,
      )}
    />
  );
};

type FormFlowProps = ComponentProps<'div'>;

export const FormFlow = ({ className, ...props }: FormFlowProps) => {
  return (
    <div
      {...props}
      className={cn(
        'flex',
        'flex-col',
        'gap-(--form-flow-spacing)',

        'lg:gap-(--form-flow-spacing-lg)',

        className,
      )}
    />
  );
};

type FormSubgroupProps = ComponentProps<'fieldset'>;

export const FormSubgroup = ({ className, ...props }: FormSubgroupProps) => {
  return (
    <fieldset
      {...props}
      className={cn('pbs-4', className)}
    />
  );
};

type FormSubgroupTitleProps = ComponentProps<'legend'>;

export const FormSubgroupTitle = ({
  className,
  ...props
}: FormSubgroupTitleProps) => {
  return (
    <legend
      {...props}
      className={cn('text-2xs', className)}
    />
  );
};
