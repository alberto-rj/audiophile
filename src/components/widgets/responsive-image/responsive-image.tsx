import type { ResponsiveImageType } from '@/libs/types';

interface ResponsiveImageProps {
  image: ResponsiveImageType;
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
        media='(min-width: 64em)'
        srcSet={image.desktop}
      />
      <source
        media='(min-width: 48em)'
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
