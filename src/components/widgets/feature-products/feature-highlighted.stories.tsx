import type { Meta, StoryObj } from '@storybook/react-vite';

import { FeatureHighLighted } from '@/components/widgets';

import { cn } from '@/libs/cn';
import { featureHighLightedContent } from '@/libs/constants';

type StoryProps = React.ComponentProps<typeof FeatureHighLighted>;

const meta = {
  title: 'widgets/FeatureProducts/FeatureHighLighted',
  component: FeatureHighLighted,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    content: featureHighLightedContent,
  },
  render: (props) => {
    return (
      <div className={cn('region', 'wrapper')}>
        <FeatureHighLighted {...props} />
      </div>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
