import React from 'react';
import styled from 'styled-components';

import { LKS_LIBRARY_NAME } from '../constants';
import { LibraryCard, LibraryDataWrapper, LibraryTitle } from '../styled';

const CustomLibraryCard = styled(LibraryCard)`
  grid-area: lks;
`;

interface Props {
  loading: boolean;
  occupancy: number;
}

const LKSCard: React.FC<Props> = function (props) {
  const { loading, occupancy } = props;

  return (
    <CustomLibraryCard>
      <LibraryDataWrapper>
        <LibraryTitle>{LKS_LIBRARY_NAME}</LibraryTitle>
      </LibraryDataWrapper>
    </CustomLibraryCard>
  );
};

export default LKSCard;
