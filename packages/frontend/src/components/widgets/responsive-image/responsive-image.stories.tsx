import type { Meta, StoryObj } from '@storybook/react-vite';

import { ResponsiveImage } from '@/components/widgets';
import { cn } from '@/libs/cn';

import mobile from '@/assets/shared/desktop/image-category-thumbnail-headphones.png';
import tablet from '@/assets/shared/desktop/image-category-thumbnail-headphones.png';
import desktop from '@/assets/shared/desktop/image-category-thumbnail-headphones.png';

type StoryProps = React.ComponentProps<typeof ResponsiveImage>;

const meta = {
  title: 'widgets/ResponsiveImage',
  component: ResponsiveImage,
  args: {
    alt: '',
    image: {
      desktop,
      tablet,
      mobile,
    },
  },
  parameters: {
    layout: 'centered',
  },
  render: (responsiveImageProps) => {
    return (
      <div className={cn('w-200 flex justify-center')}>
        <ResponsiveImage {...responsiveImageProps} />
      </div>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
