import { cva, type VariantProps } from 'class-variance-authority';
import { createContext, useContext } from 'react';

import { cn } from '@/libs/cn';

export const toastVariants = cva(cn('border'), {
  variants: {
    variant: {
      success: cn(
        'bg-success-50',
        'border-success-1200',
        'outline-success-600',
        'text-success-1400',
      ),
      error: cn(
        'bg-danger-300',
        'border-danger-950',
        'outline-danger-600',
        'text-danger-950',
      ),
      warning: cn(
        'bg-warning-100',
        'border-warning-900',
        'outline-warning-600',
        'text-warning-1100',
      ),
      info: cn(
        'bg-info-50',
        'border-info-600',
        'outline-info-500',
        'text-info-950',
      ),
    },
  },

  defaultVariants: {
    variant: 'info',
  },
});

export type ToastVariants = VariantProps<typeof toastVariants>;

export type ToastVariant = ToastVariants['variant'];

export const defaultToastVariant: NonNullable<ToastVariant> = 'info';

export interface ToastAction {
  label: string;
  altText: string;
  onClick: () => void;
}

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
  duration?: number;
  action?: ToastAction;
}

export type AddToastParams = Omit<ToastItem, 'id'>;

export interface ToastContextValue {
  toasts: ToastItem[];
  addToast: (toast: AddToastParams) => void;
  removeToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

export const useToastContext = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToastContext must be used within ToastProvider');
  }

  return context;
};
