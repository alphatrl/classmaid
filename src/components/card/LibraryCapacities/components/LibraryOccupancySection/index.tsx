import React from 'react';
import styled from 'styled-components';

import { LibraryOccupancy } from '../../../../../pages/api/smusg/getLibrariesOccupancy';
import KGCCard from './components/KGCCard';
import LKSCard from './components/LKSCard';

const Wrapper = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas: 'lks kgc';
`;

const LibraryOccupancySection: React.FC = function () {
  const [lksOccupancy, setLksOccupancy] = React.useState(0);
  const [kgcOccupancy, setKgcOccupancy] = React.useState(0);
  const [isFetchingOccupancy, setFetchingOccupancy] = React.useState(true);

  const getLibrariesOccupancy = React.useCallback(async () => {
    setFetchingOccupancy(true);
    const response = await fetch('/api/smusg/getLibrariesOccupancy');
    const resJson: LibraryOccupancy = await response.json();

    const newLksOccupancy = parseInt(resJson.lks.inside);
    if (Number.isInteger(newLksOccupancy)) {
      setLksOccupancy(newLksOccupancy);
    }

    const newKgcOccupancy = parseInt(resJson.kgc.inside);
    if (Number.isInteger(newKgcOccupancy)) {
      setKgcOccupancy(newKgcOccupancy);
    }

    setFetchingOccupancy(false);
  }, []);

  React.useEffect(() => {
    getLibrariesOccupancy();
  }, [getLibrariesOccupancy]);

  return (
    <Wrapper>
      <LKSCard loading={isFetchingOccupancy} occupancy={lksOccupancy} />
      <KGCCard loading={isFetchingOccupancy} occupancy={kgcOccupancy} />
    </Wrapper>
  );
};

export default LibraryOccupancySection;
