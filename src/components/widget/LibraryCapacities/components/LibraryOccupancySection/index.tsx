import React from 'react';
import styled from 'styled-components';

import { LibraryOccupancy } from '../../../../../pages/api/smusg/getLibrariesOccupancy';
import {
  DESKTOP_WIDTH_SIZE_S,
  MOBILE_WIDTH_SIZE_L,
} from '../../../../../themes/size';
import Library from './components/Library';
import {
  KGC_LIBRARY_NAME,
  KGC_MAX_OCCUPANCY,
  LKS_LIBRARY_NAME,
  LKS_MAX_OCCUPANCY,
} from './constants';

const Wrapper = styled.div`
  padding: 16px;
  display: grid;
  flex: 1;
  gap: 16px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas: 'lks kgc';

  @media screen and (max-width: ${DESKTOP_WIDTH_SIZE_S}) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'lks'
      'kgc';
  }

  @media screen and (max-width: ${MOBILE_WIDTH_SIZE_L}) {
    padding: 12px;
    gap: 12px;
  }
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
      <Library
        id="lks"
        name={LKS_LIBRARY_NAME}
        loading={isFetchingOccupancy}
        occupancy={lksOccupancy}
        maxOccupancy={LKS_MAX_OCCUPANCY}
      />

      <Library
        id="kgc"
        name={KGC_LIBRARY_NAME}
        loading={isFetchingOccupancy}
        occupancy={kgcOccupancy}
        maxOccupancy={KGC_MAX_OCCUPANCY}
      />
    </Wrapper>
  );
};

export default LibraryOccupancySection;
