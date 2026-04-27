import type { Meta, StoryObj } from '@storybook/react-vite';

import { inTheBoxSectionContent } from '@/libs/constants';
import { cn } from '@/libs/cn';

import InTheBoxSection from './in-the-box-section';

type StoryProps = React.ComponentProps<typeof InTheBoxSection>;

const meta = {
  title: 'pages/ProductPage/InTheBoxSection',
  component: InTheBoxSection,
  parameters: {
    layout: 'fullscreen',
  },
  render: (inTheBoxSectionProps) => {
    return (
      <InTheBoxSection
        {...inTheBoxSectionProps}
        className={cn('region', 'wrapper')}
      />
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: inTheBoxSectionContent,
  },
};
