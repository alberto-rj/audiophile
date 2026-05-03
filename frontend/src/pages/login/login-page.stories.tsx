import type { Meta, StoryObj } from '@storybook/react-vite';

import { LoginPage } from '@/pages';
import { cn } from '@/libs/cn';
type StoryProps = React.ComponentProps<typeof LoginPage>;

const meta = {
  title: 'pages/LoginPage',
  component: LoginPage,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: (Story, context) => {
    return (
      <div
        className={cn(
          'min-block-screen',
          'flex',
          'justify-center',
          'items-center',

          'bg-gray-300',
        )}
      >
        <Story {...context} />
      </div>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
