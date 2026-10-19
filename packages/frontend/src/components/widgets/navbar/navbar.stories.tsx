import type { Meta, StoryObj } from '@storybook/react-vite';

import { Navbar } from '@/components/widgets';
import { WithCredentialsDecorator } from '@/config/storybook';
import { cn } from '@/libs/cn';
import { makeGetCartHandler } from '@/mocks/handlers';

type StoryProps = React.ComponentProps<typeof Navbar>;

const meta = {
  title: 'widgets/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: (Story, ctx) => {
    return (
      <div
        className={cn(
          'inline-screen',
          'min-block-screen',

          'bg-black',
        )}
      >
        <Story {...ctx} />
      </div>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLoggedUser: Story = {
  decorators: [WithCredentialsDecorator],
  parameters: {
    msw: {
      handlers: [makeGetCartHandler({ limit: 0 })],
    },
  },
};

export const WithFilledCart: Story = {
  decorators: [WithCredentialsDecorator],
  parameters: {
    msw: {
      handlers: [makeGetCartHandler()],
    },
  },
};
