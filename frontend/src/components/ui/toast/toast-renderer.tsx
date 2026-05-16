import { Close as CloseIcon } from '@/assets/icons';
import { cn } from '@/libs/cn';

import Toast from './toast';
import { useToastContext } from './toast-context';

export const ToastRenderer = () => {
  const { toasts, removeToast } = useToastContext();

  return (
    <Toast.Provider swipeDirection='right'>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          variant={toast.variant ?? 'info'}
          duration={toast.duration}
          onOpenChange={(open) => {
            if (!open) {
              removeToast(toast.id);
            }
          }}
          defaultOpen={true}
          className={cn(
            'flex',
            'items-center',
            'justify-between',
            'gap-[calc(2*var(--toast-spacing))]',
          )}
        >
          <div className={cn('flex', 'items-center', 'gap-(--toast-spacing)')}>
            <Toast.Icon
              variant={toast.variant}
              className={cn('shrink-0')}
            />
            <div
              className={cn(
                'flex',
                'flex-col',
                'gap-[calc(0.5*var(--toast-spacing))]',
                'inline-full',
              )}
            >
              <Toast.Title>{toast.title}</Toast.Title>
              {toast.description && (
                <Toast.Description className={cn('inline-full')}>
                  {toast.description}
                </Toast.Description>
              )}
              {toast.action && (
                <Toast.Action
                  type='button'
                  altText={toast.action.altText}
                  onClick={toast.action.onClick}
                  className={cn('self-start')}
                >
                  {toast.action.label}
                </Toast.Action>
              )}
            </div>
          </div>

          <Toast.Close
            aria-label='Close notification'
            className={cn('shrink-0')}
          >
            <CloseIcon
              aria-hidden={true}
              focusable={false}
            />
          </Toast.Close>
        </Toast>
      ))}

      <Toast.Viewport />
    </Toast.Provider>
  );
};
