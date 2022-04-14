import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { LibraryOccupancyProps } from '../../../../Schema';
import Icon from '../../../Icon';
import { CardTemplate } from '../../styled';
import CapacityRow from './components/CapacityRow';

interface LibraryCountProps {
  datetime: string;
  lks: {
    enter: string;
    exit: string;
    inside: string;
  };
  kgc: {
    enter: string;
    exit: string;
    inside: string;
  };
}

const Wrapper = styled(CardTemplate)`
  margin-top: 1em;
  color: ${(props) => props.theme.text900};
  min-width: 100px;
`;

const HeaderWrapper = styled.div`
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    margin: 0;
    padding-bottom: 4px;
    font-size: 1.2em;
  }
`;

const StyledIcon = styled.div`
  height: 32px;
  width: 32px;
  cursor: pointer;
  background-color: unset;
  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.text600};

  &:hover {
    background-color: ${(props) => props.theme.primary.blue}56;
    color: ${(props) => props.theme.primary.blue};
    transition: all 0.2s ease-in;
  }
`;

const MAX_OCCUPANCY_LKS = 1800;
const MAX_OCCUPANCY_KGC = 500;

const CapacityCard: React.FC = () => {
  const [occupancy, setOccupancy] = useState<LibraryOccupancyProps[]>([
    {
      title: '📚 Li Ka Shing Library',
      occupancy: 0,
      maxOccupancy: MAX_OCCUPANCY_LKS,
    },
    {
      title: '⚖️ Kwa Geok Choo Law Library',
      occupancy: 0,
      maxOccupancy: MAX_OCCUPANCY_KGC,
    },
  ]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getOccupancy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getOccupancy = useCallback(async () => {
    setIsLoaded(false);
    const response: LibraryCountProps = await axios
      .get(
        'https://smulibraries.southeastasia.cloudapp.azure.com/public/count.json'
      )
      .then((response) => response.data);
    setOccupancy([
      {
        title: '📚 Li Ka Shing Library',
        occupancy: parseInt(response.lks.inside),
        maxOccupancy: MAX_OCCUPANCY_LKS,
      },
      {
        title: '⚖️ Kwa Geok Choo Law Library',
        occupancy: parseInt(response.kgc.inside),
        maxOccupancy: MAX_OCCUPANCY_KGC,
      },
    ]);
    setIsLoaded(true);
  }, []);

  return (
    <Wrapper>
      <HeaderWrapper>
        <h1>Capacity</h1>
        <StyledIcon role="button" onClick={getOccupancy}>
          <Icon name="refresh" />
        </StyledIcon>
      </HeaderWrapper>
      {occupancy.map((library) => (
        <CapacityRow key={library.title} library={library} isLoad={isLoaded} />
      ))}
    </Wrapper>
  );
};

export default CapacityCard;
