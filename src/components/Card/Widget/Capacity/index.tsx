import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { LibraryOccupancyProps } from '../../../../Schema';
import { CardTemplate } from '../../styled';
import CapacityRow from './components/CapacityRow';

const Wrapper = styled(CardTemplate)`
  margin-top: 1em;
  color: ${(props) => props.theme.text900};
  min-width: 100px;

  h1 {
    margin: 0;
    padding-bottom: 4px;
    font-size: 1.2em;
  }
`;

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

const MAX_OCCUPANCY_LKS = 1150;
const MAX_OCCUPANCY_KGC = 300;

const CapacityCard: React.FC = () => {
  const [occupancy, setOccupancy] = useState<LibraryOccupancyProps[]>([
    {
      title: '📚 Li Ka Sheng Library',
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
    const getOccupancy = async () => {
      const response: LibraryCountProps = await axios
        .get(
          'https://smulibraries.southeastasia.cloudapp.azure.com/public/count.json'
        )
        .then((response) => response.data);
      setOccupancy([
        {
          title: '📚 Li Ka Sheng Library',
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
    };

    getOccupancy();
  }, []);

  return (
    <Wrapper>
      <h1>Capacity</h1>
      {occupancy.map((library) => (
        <CapacityRow key={library.title} library={library} isLoad={isLoaded} />
      ))}
    </Wrapper>
  );
};

export default CapacityCard;
