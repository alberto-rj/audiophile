import {
  useToastContext,
  type ToastVariant,
} from '@/components/ui/toast/toast-context';

interface ShowToastOptions {
  title: string;
  description?: string;
  duration?: number;
}

export const useToast = () => {
  const { addToast } = useToastContext();

  const show = (variant: ToastVariant, options: ShowToastOptions) => {
    addToast({ variant, duration: 5000, ...options });
  };

  return {
    success: (options: ShowToastOptions) => show('success', options),
    error: (options: ShowToastOptions) => show('error', options),
    info: (options: ShowToastOptions) => show('info', options),
    warning: (options: ShowToastOptions) => show('warning', options),
  };
};
