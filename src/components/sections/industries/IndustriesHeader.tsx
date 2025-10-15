/**
 * IndustriesHeader Component
 * Header section for the Industries page
 */

import React from 'react';
import { SectionHeader } from '@/components/common';

export default function IndustriesHeader() {
  return (
    <header className="text-center mb-20">
      <SectionHeader
        badge={{
          text: "Industries We Serve",
          color: "gold",
          size: "xl"
        }}
        showTitle={false}
        showDescription={false}
      />
    </header>
  );
}
