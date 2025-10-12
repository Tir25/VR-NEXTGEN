import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Industry } from '@/types/components';
import { getResponsiveValue, RESPONSIVE_CAROUSEL_CONFIG, hasIndustryBackgroundImage, getIndustryBackgroundImage } from '@/config';
import { MAGIC_NUMBERS } from '@/constants';
import { useViewport } from '@/hooks/useViewport';

interface UseIndustryCardProps {
  industry: Industry;
  isActive: boolean;
}

export function useIndustryCard({ industry, isActive }: UseIndustryCardProps) {
  const router = useRouter();
  const [isFlipped, setIsFlipped] = useState(false);
  const { width } = useViewport();
  const [cardDimensions, setCardDimensions] = useState({ 
    width: `${MAGIC_NUMBERS.SIZES.CARD_WIDTH_DEFAULT}px`, 
    height: `${MAGIC_NUMBERS.SIZES.CARD_HEIGHT_DEFAULT}px` 
  });

  const handleLearnMore = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/industries/${industry.id}`);
  };

  // Helper functions
  const hasBackgroundImage = (cardId: string) => hasIndustryBackgroundImage(cardId);
  const getBackgroundImagePath = (cardId: string) => getIndustryBackgroundImage(cardId);

  // Responsive card dimensions driven by shared viewport
  useEffect(() => {
    const cardSizes = getResponsiveValue(
      RESPONSIVE_CAROUSEL_CONFIG.cardSizes as Record<string, { width: string; height: string }>, 
      RESPONSIVE_CAROUSEL_CONFIG.cardSizes.lg
    );
    setCardDimensions({ width: cardSizes.width, height: cardSizes.height });
  }, [width]);

  // Reset flip state when card becomes inactive
  useEffect(() => {
    if (!isActive && isFlipped) {
      setIsFlipped(false);
    }
  }, [isActive, isFlipped]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isActive && !(e.target as HTMLElement).closest('button')) {
      setIsFlipped(!isFlipped);
    }
  };

  // Get responsive text scaling
  const getTextScaling = () => {
    return getResponsiveValue(
      RESPONSIVE_CAROUSEL_CONFIG.textScaling as Record<string, Record<string, string>>,
      RESPONSIVE_CAROUSEL_CONFIG.textScaling.lg
    );
  };

  // Get responsive padding
  const getResponsivePadding = () => {
    return getResponsiveValue(
      RESPONSIVE_CAROUSEL_CONFIG.mobilePadding as Record<string, string>,
      RESPONSIVE_CAROUSEL_CONFIG.mobilePadding.lg
    );
  };

  const textScaling = getTextScaling();
  const responsivePadding = getResponsivePadding();

  return {
    isFlipped,
    cardDimensions,
    handleLearnMore,
    handleClick,
    hasBackgroundImage,
    getBackgroundImagePath,
    textScaling,
    responsivePadding
  };
}
