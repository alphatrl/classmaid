import React from 'react';
import styled from 'styled-components';

import { CardTemplate } from '../styled';
import Header from './components/Header';
import LibraryOccupancySection from './components/LibraryOccupancySection';

const Card = styled(CardTemplate)`
  padding: 0;

  display: flex;
  flex-direction: column;
`;

const LibraryCapacities: React.FC = function () {
  return (
    <Card>
      <Header />
      <LibraryOccupancySection />
    </Card>
  );
};

export default LibraryCapacities;
