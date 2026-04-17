import type { Meta, StoryObj } from '@storybook/react-vite';

import { Gallery } from '@/components/widgets';
import { galleryContent } from '@/libs/constants';
import { cn } from '@/libs/cn';

type StoryProps = React.ComponentProps<typeof Gallery>;

const meta = {
  title: 'widgets/Gallery',
  component: Gallery,
  parameters: {
    layout: 'fullscreen',
  },
  render: (galleryProps) => {
    return (
      <div className={cn('region', 'wrapper')}>
        <Gallery {...galleryProps} />
      </div>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: galleryContent,
  },
};
