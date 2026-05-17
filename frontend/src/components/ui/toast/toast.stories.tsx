import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within } from 'storybook/test';

import { Button } from '@/components/ui';
import { useToast } from '@/hooks';
import { cn } from '@/libs/cn';

import type { ToastVariant } from './toast-context';

interface ToastDemoProps {
  variant: NonNullable<ToastVariant>;
  title: string;
  description?: string;
  actionLabel?: string;
}

const ToastDemo = ({
  variant,
  title,
  description,
  actionLabel,
}: ToastDemoProps) => {
  const toast = useToast();

  const handleClick = () => {
    toast[variant]({
      title,
      description,
      ...(actionLabel && {
        action: {
          label: actionLabel,
          altText: `${actionLabel} - toast action`,
          onClick: () => console.log('Action clicked'),
        },
      }),
    });
  };

  return (
    <div
      className={cn(
        'flex',
        'items-center',
        'justify-center',

        'bg-gray-900',
      )}
    >
      <Button
        type='button'
        variant='primary'
        onClick={handleClick}
      >
        Show toast
      </Button>
    </div>
  );
};

const meta = {
  title: 'ui/Toast',
  component: ToastDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'Notification title',
  },
} satisfies Meta<typeof ToastDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'info',
    title: 'Profile updated',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Congratulations!',
    description: 'Your OS has been updated to the latest version.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /show toast/i }));
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Did you know?',
    description: 'You can switch between artboards using Ctrl + T.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /show toast/i }));
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning!',
    description: 'Your password strength is too low.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /show toast/i }));
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Something went wrong!',
    description: 'The program has turned off unexpectedly.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /show toast/i }));
  },
};

export const WithAction: Story = {
  args: {
    variant: 'error',
    title: 'Something went wrong!',
    description: 'The program has turned off unexpectedly.',
    actionLabel: 'Send report',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /show toast/i }));
  },
};

export const Multiple: Story = {
  args: {
    variant: 'success',
    title: 'Congratulations!',
    description: 'Your profile was updated successfully.',
    actionLabel: 'save status',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /show toast/i });

    await userEvent.click(button);
    await userEvent.click(button);
    await userEvent.click(button);
  },
};
