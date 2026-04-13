import type { Meta, StoryObj } from '@storybook/react-vite';

import { FeatureLandscape } from '@/components/widgets';

import { cn } from '@/libs/cn';
import { featureLandscapeContent } from '@/libs/constants';

type StoryProps = React.ComponentProps<typeof FeatureLandscape>;

const meta = {
  title: 'widgets/FeatureLandscape',
  component: FeatureLandscape,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    content: featureLandscapeContent,
  },
  render: (props) => {
    return (
      <div className={cn('region', 'wrapper')}>
        <FeatureLandscape {...props} />
      </div>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
