import React from 'react';

import { CardTemplate } from '../styled';
import Header from './components/Header';
import LibraryOccupancySection from './components/LibraryOccupancySection';

const LibraryCapacities: React.FC = function () {
  return (
    <CardTemplate className="p-0! flex flex-col">
      <Header />
      <LibraryOccupancySection />
    </CardTemplate>
  );
};

export default LibraryCapacities;
