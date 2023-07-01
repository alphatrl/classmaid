import React from 'react';
import styled from 'styled-components';

import { KGC_LIBRARY_NAME } from '../constants';
import { LibraryCard, LibraryDataWrapper, LibraryTitle } from '../styled';

const CustomLibraryCard = styled(LibraryCard)`
  grid-area: kgc;
`;

interface Props {
  loading: boolean;
  occupancy: number;
}

const KGCCard: React.FC<Props> = function (props) {
  const { loading, occupancy } = props;

  return (
    <CustomLibraryCard>
      <LibraryDataWrapper>
        <LibraryTitle>{KGC_LIBRARY_NAME}</LibraryTitle>
      </LibraryDataWrapper>
    </CustomLibraryCard>
  );
};

export default KGCCard;
