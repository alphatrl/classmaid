import React from 'react';
import styled from 'styled-components';

import {
  MOBILE_MEDIA_QUERY,
  TABLET_MEDIA_QUERY,
} from '../../../../../../../shared/themes/size';
import Library from './components/Library';
import { KGC_LIBRARY_TEMPLATE, LKS_LIBRARY_TEMPLATE } from './constants';
import { LibraryOccupancyAPI } from './types';

const Wrapper = styled.div`
  padding: 16px;
  display: grid;
  flex: 1;
  gap: 16px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas: 'lks kgc';

  @media screen and ${TABLET_MEDIA_QUERY} {
    grid-template-columns: 1fr;
    grid-template-areas:
      'lks'
      'kgc';
  }

  @media screen and (max-width: ${MOBILE_MEDIA_QUERY}) {
    padding: 12px;
    gap: 12px;
  }
`;

const LibraryOccupancySection: React.FC = function () {
  const [isFetchingOccupancy, setFetchingOccupancy] = React.useState(true);
  const [currentOccupancy, setCurrentOccupancy] = React.useState<
    LibraryOccupancyAPI[]
  >([]);

  const getLibrariesOccupancy = React.useCallback(async () => {
    setFetchingOccupancy(true);
    const response = await fetch('/api/smusg/getLibrariesOccupancy');
    const resJson: LibraryOccupancyAPI[] = await response.json();

    setCurrentOccupancy(resJson);
    setFetchingOccupancy(false);
  }, []);

  React.useEffect(() => {
    getLibrariesOccupancy();
  }, [getLibrariesOccupancy]);

  return (
    <Wrapper>
      {[LKS_LIBRARY_TEMPLATE, KGC_LIBRARY_TEMPLATE].map((template) => {
        const key = template.key;
        const occupancyInfo =
          currentOccupancy.find((occupancy) => occupancy.key === key) ?? null;

        return (
          <Library
            key={key}
            id={key}
            template={template}
            occupancyInfo={occupancyInfo}
            loading={isFetchingOccupancy}
          />
        );
      })}
    </Wrapper>
  );
};

export default LibraryOccupancySection;
