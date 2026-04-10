import type { ProductImage } from '@/libs/types';

interface ResponsiveImageProps {
  image: ProductImage;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

const ResponsiveImage = ({
  image,
  alt,
  className,
  width,
  height,
}: ResponsiveImageProps) => {
  return (
    <picture>
      <source
        media='(min-width: 1440px)'
        srcSet={image.desktop}
      />
      <source
        media='(min-width: 768px)'
        srcSet={image.tablet}
      />
      <img
        src={image.mobile}
        alt={alt}
        className={className}
        width={width}
        height={height}
      />
    </picture>
  );
};

export default ResponsiveImage;
