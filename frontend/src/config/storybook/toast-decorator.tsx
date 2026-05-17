import type { Decorator } from '@storybook/react-vite';

import { ToastProvider, ToastRenderer } from '@/components/ui';

export const ToastDecorator: Decorator = (Story, ctx) => {
  return (
    <ToastProvider>
      <Story {...ctx} />
      <ToastRenderer />
    </ToastProvider>
  );
};
