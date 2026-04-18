import type { Meta, StoryObj } from '@storybook/react-vite';

import { featuresSectionContent } from '@/libs/constants';
import { cn } from '@/libs/cn';
import FeaturesSection from './features-section';

type StoryProps = React.ComponentProps<typeof FeaturesSection>;

const meta = {
  title: 'pages/Product Detail/FeaturesSection',
  component: FeaturesSection,
  parameters: {
    layout: 'fullscreen',
  },
  render: (featuresSectionProps) => {
    return (
      <div className={cn('region', 'wrapper')}>
        <FeaturesSection {...featuresSectionProps} />
      </div>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: featuresSectionContent,
  },
};
