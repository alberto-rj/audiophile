import type { Meta, StoryObj } from '@storybook/react-vite';

import { Footer } from '@/components/widgets';
import { cn } from '@/libs/cn';

type StoryProps = React.ComponentProps<typeof Footer>;

const meta = {
  title: 'widgets/Footer',
  component: Footer,
  parameters: {
    layout: 'centered',
  },
  render: () => {
    return (
      <div className={cn('w-360')}>
        <Footer />
      </div>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
