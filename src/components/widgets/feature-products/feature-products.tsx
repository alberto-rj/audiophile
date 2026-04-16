import {
  FeatureHighLighted,
  FeatureLandscape,
  FeaturePortrait,
} from '@/components/widgets';
import type {
  FeatureHighLightedContent,
  FeatureLandscapeContent,
  FeaturePortraitContent,
} from '@/libs/types';
import { cn } from '@/libs/cn';

interface FeatureProductsProps {
  highLightedContent: FeatureHighLightedContent;
  landscapeContent: FeatureLandscapeContent;
  portraitContent: FeaturePortraitContent;
}

const FeatureProducts = ({
  highLightedContent,
  landscapeContent,
  portraitContent,
}: FeatureProductsProps) => {
  return (
    <div
      className={cn(
        'wrapper',
        'grid',
        'gap-6',

        'md:gap-8',

        'md:gap-12',
      )}
    >
      <FeatureHighLighted content={highLightedContent} />
      <FeatureLandscape content={landscapeContent} />
      <FeaturePortrait content={portraitContent} />
    </div>
  );
};

export default FeatureProducts;
