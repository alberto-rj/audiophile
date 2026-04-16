import type { ImgHTMLAttributes } from 'react';

import type { ResponsiveImageType } from '@/libs/types';

interface ResponsiveImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  image: ResponsiveImageType;
}

const ResponsiveImage = ({
  image,
  alt,
  className,
  ...props
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
        {...props}
      />
    </picture>
  );
};

export default ResponsiveImage;
