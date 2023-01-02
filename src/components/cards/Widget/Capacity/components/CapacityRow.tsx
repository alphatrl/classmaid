import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 8px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
    font-size: 0.9em;
    font-weight: 700;
  }
`;

const ProgressBar = styled.div<{ percentage: number }>`
  margin-top: 8px;
  width: 100%;
  height: 8px;
  background-color: ${(props) => props.theme.primary.blue}42;
  border-radius: 4px;

  .filled {
    border-radius: 4px;
    height: 100%;
    width: ${(props) => props.percentage}%;
    background-color: ${(props) => props.theme.primary.blue};
  }
`;

const Occupancy = styled.span`
  margin: 0;
  font-size: 0.9em;
  font-weight: 700;
  padding-left: 8px;
  color: ${(props) => props.theme.text600};
`;

interface Props {
  library: App.SMU.LibraryOccupancy;
  isLoad?: boolean;
}

const CapacityRow: React.FC<Props> = (props) => {
  const { library, isLoad = true } = props;
  const percentage = Math.round(
    (library.occupancy / library.maxOccupancy) * 100
  );

  return (
    <Wrapper>
      <Title>
        <h2>{library.title}</h2>
        {isLoad && (
          <Occupancy>
            {library.occupancy}/{library.maxOccupancy}
          </Occupancy>
        )}
      </Title>
      <ProgressBar percentage={percentage}>
        {isLoad && <div className="filled" />}
      </ProgressBar>
    </Wrapper>
  );
};

export default CapacityRow;
