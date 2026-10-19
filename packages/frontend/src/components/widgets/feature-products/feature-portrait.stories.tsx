import type { Meta, StoryObj } from '@storybook/react-vite';

import { FeaturePortrait } from '@/components/widgets';

import { cn } from '@/libs/cn';
import { featurePortraitContent } from '@/libs/constants';

type StoryProps = React.ComponentProps<typeof FeaturePortrait>;

const meta = {
  title: 'widgets/FeatureProducts/FeaturePortrait',
  component: FeaturePortrait,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    content: featurePortraitContent,
  },
  render: (props) => {
    return (
      <div className={cn('region', 'wrapper')}>
        <FeaturePortrait {...props} />
      </div>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
