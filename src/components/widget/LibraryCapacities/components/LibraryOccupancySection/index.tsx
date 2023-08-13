import React from 'react';
import styled from 'styled-components';

import { LibraryOccupancy } from '../../../../../pages/api/smusg/getLibrariesOccupancy';
import {
  DESKTOP_WIDTH_SIZE_S,
  MOBILE_WIDTH_SIZE_L,
} from '../../../../../themes/size';
import Library from './components/Library';
import { SMU_LIBRARIES } from './constants';
import { LibraryNames } from './types';

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
  const [currentOccupancy, setCurrentOccupancy] = React.useState({
    lks: 0,
    kgc: 0,
  });
  const [isFetchingOccupancy, setFetchingOccupancy] = React.useState(true);

  const getLibrariesOccupancy = React.useCallback(async () => {
    setFetchingOccupancy(true);
    const response = await fetch('/api/smusg/getLibrariesOccupancy');
    const resJson: LibraryOccupancy = await response.json();

    const newLksOccupancy = parseInt(resJson.lks.inside);
    const newKgcOccupancy = parseInt(resJson.kgc.inside);
    const tempOccupancyData = {
      lks: Number.isInteger(newLksOccupancy)
        ? newLksOccupancy
        : currentOccupancy.lks,
      kgc: Number.isInteger(newKgcOccupancy)
        ? newKgcOccupancy
        : currentOccupancy.kgc,
    };

    setCurrentOccupancy(tempOccupancyData);

    setFetchingOccupancy(false);
  }, [currentOccupancy.kgc, currentOccupancy.lks]);

  React.useEffect(() => {
    getLibrariesOccupancy();
  }, [getLibrariesOccupancy]);

  const libraryKeys = Object.keys(SMU_LIBRARIES) as LibraryNames[];

  return (
    <Wrapper>
      {libraryKeys.map((libKey) => {
        return (
          <Library
            key={libKey}
            id={libKey}
            occupancy={currentOccupancy[libKey]}
            library={SMU_LIBRARIES[libKey]}
            loading={isFetchingOccupancy}
          />
        );
      })}
    </Wrapper>
  );
};

export default LibraryOccupancySection;
