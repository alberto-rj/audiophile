import type { ResponsiveImageType } from '@/libs/types';

import heroMobile from '@/assets/home/mobile/image-header.jpg';
import heroTablet from '@/assets/home/tablet/image-header.jpg';
import heroDesktop from '@/assets/home/desktop/image-hero.jpg';

import speakerZX7Mobile from '@/assets/home/mobile/image-speaker-zx7.jpg';
import speakerZX7Tablet from '@/assets/home/tablet/image-speaker-zx7.jpg';
import speakerZX7Desktop from '@/assets/home/desktop/image-speaker-zx7.jpg';

import earphonesYX1Mobile from '@/assets/home/mobile/image-earphones-yx1.jpg';
import earphonesYX1Tablet from '@/assets/home/tablet/image-earphones-yx1.jpg';
import earphonesYX1Desktop from '@/assets/home/desktop/image-earphones-yx1.jpg';

import bestGearMobile from '@/assets/shared/mobile/image-best-gear.jpg';
import bestGearTablet from '@/assets/shared/tablet/image-best-gear.jpg';
import bestGearDesktop from '@/assets/shared/desktop/image-best-gear.jpg';

export const earphonesYX1: ResponsiveImageType = {
  mobile: earphonesYX1Mobile,
  tablet: earphonesYX1Tablet,
  desktop: earphonesYX1Desktop,
};

export const speakerZX7: ResponsiveImageType = {
  mobile: speakerZX7Mobile,
  tablet: speakerZX7Tablet,
  desktop: speakerZX7Desktop,
};

export const hero: ResponsiveImageType = {
  mobile: heroMobile,
  tablet: heroTablet,
  desktop: heroDesktop,
};

export const bestGear: ResponsiveImageType = {
  mobile: bestGearMobile,
  tablet: bestGearTablet,
  desktop: bestGearDesktop,
};
