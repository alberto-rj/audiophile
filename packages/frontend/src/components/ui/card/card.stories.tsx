import type { Meta, StoryObj } from '@storybook/react-vite';

import { Card } from '@/components/ui';
import { cn } from '@/libs/cn';

type StoryProps = React.ComponentProps<typeof Card> & {
  cardContent: string;
};

const meta = {
  title: 'ui/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  render: ({ cardContent, ...cardProps }) => {
    return (
      <div
        className={cn(
          'region',
          'wrapper',

          'bg-gray-300',
        )}
      >
        <Card {...cardProps}>{cardContent}</Card>
      </div>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    cardContent: 'Default',
  },
};
