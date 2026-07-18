import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within } from 'storybook/test';
import type { Canvas } from 'storybook/internal/types';

import { ProfileMenu } from '@/components/widgets';
import { WithCredentialsDecorator } from '@/config/storybook';
import { cn } from '@/libs/cn';
import { makeLogoutHandler } from '@/mocks/handlers';

async function openMenuAndSignOut(canvas: Canvas) {
  await userEvent.click(canvas.getByTestId('profileMenuTrigger'));
  await userEvent.click(await canvas.findByTestId('signOutItem'));
}

type StoryProps = React.ComponentProps<typeof ProfileMenu>;

const meta = {
  title: 'widgets/ProfileMenu',
  component: ProfileMenu,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    WithCredentialsDecorator,
    (Story, ctx) => {
      return (
        <div
          className={cn(
            'min-block-screen',
            'region',
            'flex',
            'justify-center',
            'items-center',

            'bg-gray-900',
          )}
        >
          <div className={cn('wrapper', 'flex', 'justify-center')}>
            <Story {...ctx} />
          </div>
        </div>
      );
    },
  ],
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DesktopLayout: Story = {
  args: {
    isOnMobile: false,
  },
};

export const MobileMenuOpen: Story = {
  play: async () => {
    const canvas = within(document.body);
    await userEvent.click(canvas.getByTestId('profileMenuTrigger'));
  },
};

export const DesktopMenuOpen: Story = {
  args: {
    isOnMobile: false,
  },
  play: async () => {
    const canvas = within(document.body);
    await userEvent.click(canvas.getByTestId('profileMenuTrigger'));
  },
};

export const SigningOut: Story = {
  parameters: {
    msw: {
      handlers: [makeLogoutHandler({ type: 'infinite' })],
    },
  },
  play: async () => {
    const canvas = within(document.body);

    await openMenuAndSignOut(canvas);

    await userEvent.click(await canvas.findByTestId('profileMenuTrigger'));
  },
};

export const SignOutFailed: Story = {
  parameters: {
    msw: {
      handlers: [makeLogoutHandler({ type: 'error' })],
    },
  },
  play: async () => {
    const canvas = within(document.body);

    await openMenuAndSignOut(canvas);
  },
};

export const SignOutSucceeds: Story = {
  parameters: {
    msw: {
      handlers: [makeLogoutHandler()],
    },
  },
  play: async () => {
    const canvas = within(document.body);

    await openMenuAndSignOut(canvas);
  },
};
