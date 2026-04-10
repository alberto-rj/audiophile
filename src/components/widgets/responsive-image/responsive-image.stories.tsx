import type { Meta, StoryObj } from '@storybook/react-vite';

import { ResponsiveImage } from '@/components/widgets';
import { cn } from '@/libs/cn';

import mobile from '@/assets/product-xx59-headphones/mobile/image-category-page-preview.jpg';
import tablet from '@/assets/product-xx59-headphones/tablet/image-category-page-preview.jpg';
import desktop from '@/assets/product-xx59-headphones/desktop/image-category-page-preview.jpg';

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
      <div className={cn('w-150 flex justify-center')}>
        <ResponsiveImage {...responsiveImageProps} />
      </div>
    );
  },
  tags: ['autodocs'],
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
