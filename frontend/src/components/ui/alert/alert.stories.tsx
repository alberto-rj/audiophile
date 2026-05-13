import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Button, Alert } from '@/components/ui';
import { cn } from '@/libs/cn';

type StoryProps = React.ComponentProps<typeof Alert>;

const meta = {
  title: 'ui/Alert',
  component: Alert,
  tags: ['autodocs'],
  args: {
    onOpenChange: fn(),
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (aleAlertProps) => {
    return (
      <Alert {...aleAlertProps}>
        <Alert.Trigger asChild>
          <Button
            type='button'
            variant='danger'
          >
            Delete account
          </Button>
        </Alert.Trigger>

        <Alert.Portal>
          <Alert.Overlay />

          <Alert.Content>
            <Alert.Title className={cn('h6')}>
              Are you absolutely sure?
            </Alert.Title>
            <Alert.Description className={cn('mbs-3', 'mbe-6')}>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </Alert.Description>
            <div
              className={cn(
                'flex',
                'flex-col',
                'items-center',
                'gap-6',

                'sm:flex-row-reverse',
                'sm:justify-start',
              )}
            >
              <Alert.Action asChild>
                <Button
                  type='button'
                  variant='danger'
                >
                  Yes, delete account
                </Button>
              </Alert.Action>
              <Alert.Cancel asChild>
                <Button
                  type='button'
                  variant='link'
                >
                  Cancel
                </Button>
              </Alert.Cancel>
            </div>
          </Alert.Content>
        </Alert.Portal>
      </Alert>
    );
  },
};
