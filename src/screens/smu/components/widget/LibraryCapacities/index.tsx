import React from 'react';
import styled from 'styled-components';

import useWidgetSize from '../../../../../shared/hooks/useWidgetSize';
import { CardTemplate } from '../styled';
import Header from './components/Header';
import LibraryOccupancySection from './components/LibraryOccupancySection';

const Card = styled(CardTemplate)`
  padding: 0;

  display: flex;
  flex-direction: column;
`;

const LibraryCapacities: React.FC = function () {
  const widgetSize = useWidgetSize('large');

  return (
    <Card width={widgetSize.width} height={widgetSize.height}>
      <Header />
      <LibraryOccupancySection />
    </Card>
  );
};

export default LibraryCapacities;
