import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';

import { Button } from '@/components/ui';
import { SignInRequiredAlert } from '@/components/widgets';
import { cn } from '@/libs/cn';

type StoryProps = React.ComponentProps<typeof SignInRequiredAlert>;

const meta = {
  title: 'widgets/SignInRequiredAlert',
  component: SignInRequiredAlert,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    open: true,
    onSignIn: fn(),
    onCancel: fn(),
  },
  render: ({ open: isInitiallyOpen, ...props }) => {
    const [open, setOpen] = useState(isInitiallyOpen);

    return (
      <div
        className={cn(
          'min-block-screen',
          'flex',
          'justify-center',
          'items-center',
        )}
      >
        <Button
          type='button'
          value='primary'
          onClick={() => setOpen(true)}
        >
          Require sign in
        </Button>
        <SignInRequiredAlert
          {...props}
          open={open}
          onOpenChange={setOpen}
        />
      </div>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
