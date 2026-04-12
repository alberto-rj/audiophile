import type { Meta, StoryObj } from '@storybook/react-vite';

import { FeatureHighLighted } from '@/components/widgets';
import { speakerZX9 } from '@/libs/mocks';
import { cn } from '@/libs/cn';

type StoryProps = React.ComponentProps<typeof FeatureHighLighted>;

const meta = {
  title: 'widgets/FeatureHighLighted',
  component: FeatureHighLighted,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    product: speakerZX9,
  },
  render: (props) => {
    return (
      <div className={cn('wrapper')}>
        <FeatureHighLighted {...props} />
      </div>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
