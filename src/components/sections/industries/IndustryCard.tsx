/**
 * IndustryCard Component
 * Individual industry card with 3D flip functionality
 * Refactored for modularity and reusability
 */

import React from 'react';
import { IndustryCardProps } from '@/types/components';
import { useIndustryCard } from './hooks/useIndustryCard';
import IndustryCardContainer from './components/IndustryCardContainer';
import IndustryCardFront from './components/IndustryCardFront';
import IndustryCardBack from './components/IndustryCardBack';

export default function IndustryCard({ industry, isActive, index = 0 }: IndustryCardProps) {
  const {
    isFlipped,
    cardDimensions,
    handleLearnMore,
    handleClick,
    hasBackgroundImage,
    getBackgroundImagePath,
    textScaling,
    responsivePadding
  } = useIndustryCard({ industry, isActive });

  return (
    <IndustryCardContainer
      industry={industry}
      isActive={isActive}
      index={index}
      cardDimensions={cardDimensions}
      isFlipped={isFlipped}
      onCardClick={handleClick}
    >
      <IndustryCardFront
        industry={industry}
        isFlipped={isFlipped}
        hasBackgroundImage={hasBackgroundImage}
        getBackgroundImagePath={getBackgroundImagePath}
        textScaling={textScaling}
        responsivePadding={responsivePadding}
        onLearnMore={handleLearnMore}
      />
      
      <IndustryCardBack
        industry={industry}
        isFlipped={isFlipped}
        hasBackgroundImage={hasBackgroundImage}
        getBackgroundImagePath={getBackgroundImagePath}
        textScaling={textScaling}
        responsivePadding={responsivePadding}
        onLearnMore={handleLearnMore}
      />
    </IndustryCardContainer>
  );
}