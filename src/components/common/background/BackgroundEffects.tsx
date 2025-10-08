import React from 'react';

interface BackgroundEffectsProps {
  currentSection: string;
}

export default function BackgroundEffects({ }: BackgroundEffectsProps) {
  return (
    <>
      <div className="site-bg__grid" />
      <div className="site-bg__aurora" />
      <div className="site-bg__shine" />
      <div className="site-bg__vignette" />
    </>
  );
}
