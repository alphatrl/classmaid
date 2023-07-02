import React from 'react';
import styled from 'styled-components';

import ProgressCircle from './ProgressCircle';

const LibraryCard = styled.div<{ gridArea: string }>`
grid-area: ${(props) => props.gridArea}  
box-sizing: border-box;
  border-radius: 16px;

  position: relative;
  overflow: hidden;
  background-color: pink;
`;

const LibraryDataWrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  height: 100%;
  padding: 12px;
  background-color: rgba(0, 0, 0, 0.56);
  z-index: 1;
`;

const LibraryTitle = styled.h1`
  margin: 0;
  margin-bottom: 4px;
  font-size: 1.15em;
  color: #fff;
`;

const LibraryOccupancyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LibraryOccupancyText = styled.p`
  margin: 0;
  padding-left: 4px;

  color: #fff;
  font-size: 1em;
  font-weight: 600;
`;

interface Props {
  id: string;
  name: string;
  loading: boolean;
  occupancy: number;
  maxOccupancy: number;
}

const Library: React.FC<Props> = function (props) {
  const { id, name, maxOccupancy, occupancy } = props;

  return (
    <LibraryCard gridArea={id}>
      <LibraryDataWrapper>
        <LibraryTitle>{name}</LibraryTitle>
        <LibraryOccupancyWrapper>
          <ProgressCircle
            label={`${name} Occupancy Level`}
            progress={occupancy / maxOccupancy}
          />
          <LibraryOccupancyText>
            {`${occupancy} / ${maxOccupancy}`}
          </LibraryOccupancyText>
        </LibraryOccupancyWrapper>
      </LibraryDataWrapper>
    </LibraryCard>
  );
};

export default Library;
