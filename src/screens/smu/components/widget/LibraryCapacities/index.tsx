import React from 'react';

import { useFeature } from '@/shared/contexts/ContentContext';

import Header from './components/Header';
import LibraryOccupancySection from './components/LibraryOccupancySection';

const LibraryCapacities: React.FC = function () {
  const enabled = useFeature('library_occupancy');

  if (!enabled) {
    return null;
  }

  return (
    <>
      <Header />
      <LibraryOccupancySection />
    </>
  );
};

export default LibraryCapacities;
