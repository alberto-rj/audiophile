import * as RadixToast from '@radix-ui/react-toast';
import type { ComponentProps, FunctionComponent, SVGProps } from 'react';

import { AlertCircle, CheckCircle, InfoCircle, XCircle } from '@/assets/icons';
import { cn } from '@/libs/cn';

import {
  defaultToastVariant,
  toastVariants,
  type ToastVariant,
} from './toast-context';

/* Provider (start) */
type ToastProviderProps = ComponentProps<typeof RadixToast.Provider>;

const ToastProvider = ({ ...props }: ToastProviderProps) => {
  return <RadixToast.Provider {...props} />;
};
/* Provider (end) */

/* Viewport (start) */
type ToastViewportProps = ComponentProps<typeof RadixToast.Viewport>;

const ToastViewport = ({ className, ...props }: ToastViewportProps) => {
  return (
    <RadixToast.Viewport
      {...props}
      className={cn(
        'fixed',
        'inset-bs-(--toast-offset)',
        'inset-e-(--toast-offset)',
        'z-9999',
        'inline-full',
        'max-inline-110',
        'flex',
        'flex-col',
        'gap-2',

        'outline-none',
        'pointer-events-none',
        '*:pointer-events-auto',

        className,
      )}
    />
  );
};
/* Viewport (end) */

/* Root (start) */

type ToastProps = ComponentProps<typeof RadixToast.Root> & {
  variant: ToastVariant;
};

const Toast = ({ className, variant, ...props }: ToastProps) => {
  return (
    <RadixToast.Root
      {...props}
      className={cn(
        'p-(--toast-spacing)',

        'rounded-lg',
        'shadow-md',

        'data-[state=open]:motion-safe:animate-toast-slide-in',

        'data-[state=closed]:motion-safe:animate-hide',

        'data-[swipe=move]:transform-[translateX(var(--radix-toast-swipe-move-x))]',

        'data-[swipe=cancel]:transform-[translateX(0)]',
        'data-[swipe=cancel]:motion-safe:transition-transform',
        'data-[swipe=cancel]:motion-safe:duration-200',
        'data-[swipe=cancel]:motion-safe:ease-out',

        'data-[swipe=end]:motion-safe:animate-toast-swipe-out',

        toastVariants({ variant }),

        className,
      )}
    />
  );
};
/* Root (end) */

/* Title (start) */
type ToastTitleProps = ComponentProps<typeof RadixToast.Title>;

const ToastTitle = ({ className, ...props }: ToastTitleProps) => {
  return (
    <RadixToast.Title
      {...props}
      className={cn(
        'text-base',

        'font-bold',
        'leading-none',

        className,
      )}
    />
  );
};
/* Title (end) */

/* Description (start) */
type ToastDescriptionProps = ComponentProps<typeof RadixToast.Description>;

const ToastDescription = ({ className, ...props }: ToastDescriptionProps) => {
  return (
    <RadixToast.Description
      {...props}
      className={cn(
        'text-xs',

        'font-normal',

        className,
      )}
    />
  );
};
/* Description (end) */

/* Close (start) */
type ToastCloseProps = ComponentProps<typeof RadixToast.Close>;

const ToastClose = ({ className, ...props }: ToastCloseProps) => {
  return (
    <RadixToast.Close
      {...props}
      className={cn(
        'cursor-pointer',
        'select-none',

        className,
      )}
    />
  );
};
/* Close (end) */

/* Action (start) */
type ToastActionProps = ComponentProps<typeof RadixToast.Action>;

const ToastAction = ({ className, ...props }: ToastActionProps) => {
  return (
    <RadixToast.Action
      {...props}
      className={cn(
        'text-2xs',

        'underline',

        'cursor-pointer',
        'select-none',

        className,
      )}
    />
  );
};
/* Action (end) */

/* Icon (start) */
type ToastIconProps = {
  variant: ToastVariant;
  className?: string;
};

const ToastIcon = ({ variant, className }: ToastIconProps) => {
  const iconList: Record<
    NonNullable<ToastVariant>,
    FunctionComponent<SVGProps<SVGSVGElement>>
  > = {
    success: CheckCircle,
    error: XCircle,
    info: InfoCircle,
    warning: AlertCircle,
  };

  const Icon = iconList[variant ?? defaultToastVariant];

  return (
    <Icon
      aria-hidden={true}
      focusable={false}
      className={cn(
        'inline-8',
        'block-8',

        className,
      )}
    />
  );
};
/* Icon (end) */

Toast.Provider = ToastProvider;
Toast.Viewport = ToastViewport;
Toast.Title = ToastTitle;
Toast.Description = ToastDescription;
Toast.Action = ToastAction;
Toast.Close = ToastClose;
Toast.Icon = ToastIcon;

export default Toast;
