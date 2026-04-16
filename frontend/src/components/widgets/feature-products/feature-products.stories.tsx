import type { Meta, StoryObj } from '@storybook/react-vite';

import { FeatureProducts } from '@/components/widgets';
import {
  featureHighLightedContent,
  featureLandscapeContent,
  featurePortraitContent,
} from '@/libs/constants';
import { cn } from '@/libs/cn';

type StoryProps = React.ComponentProps<typeof FeatureProducts>;

const meta = {
  title: 'widgets/FeatureProducts',
  component: FeatureProducts,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    highLightedContent: featureHighLightedContent,
    portraitContent: featurePortraitContent,
    landscapeContent: featureLandscapeContent,
  },
  render: (featureProductProps) => {
    return (
      <div className={cn('wrapper', 'region')}>
        <FeatureProducts {...featureProductProps} />
      </div>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
