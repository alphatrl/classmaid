import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

import { LibraryData, LibraryOccupancyAPI } from '../types';
import ProgressCircle from './ProgressCircle';

const LibraryCard = styled.div<{ $gridArea: string }>`
  grid-area: ${(props) => props.$gridArea}  
  box-sizing: border-box;
  border-radius: 16px;

  position: relative;
  overflow: hidden;
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
`;

const LibraryContentWrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  height: 100%;
  padding: 12px;
  background-color: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2px) saturate(80%);
  -webkit-backdrop-filter: blur(2px) saturate(80%);
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LibraryImageAttribution = styled.span`
  font-size: 0.65em;
  color: #fafafa;

  a:link {
    color: ${(props) => props.theme.primary[50]};
  }
`;

const LibraryTitle = styled.h1`
  margin: 0;
  margin-bottom: 4px;
  font-size: 1.15em;
  color: #fff;
  text-transform: capitalize;
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
  loading: boolean;
  template: LibraryData;
  occupancyInfo?: LibraryOccupancyAPI | null;
}

const Library: React.FC<Props> = function (props) {
  const { id, template, occupancyInfo, loading } = props;
  const { name, backgroundImage } = template;

  const currentOccupancy = occupancyInfo?.currentOccupancy ?? 0;
  const maxOccupancy = occupancyInfo?.maxOccupancy ?? template.maxOccupancy;

  const {
    fileUrl,
    attribution: { author, license },
  } = backgroundImage;

  return (
    <LibraryCard $gridArea={id}>
      <Image
        src={fileUrl}
        alt=""
        fill
        priority={true}
        sizes="(min-width: 300px)"
        style={{ objectFit: 'cover' }}
      />
      <LibraryContentWrapper>
        <div>
          <LibraryTitle>{name.toLowerCase()}</LibraryTitle>
          <LibraryOccupancyWrapper>
            <ProgressCircle
              label={`${name} Occupancy Level`}
              progress={currentOccupancy / maxOccupancy}
            />
            <LibraryOccupancyText>
              {loading ? 'Loading' : `${currentOccupancy} / ${maxOccupancy}`}
            </LibraryOccupancyText>
          </LibraryOccupancyWrapper>
        </div>

        <LibraryImageAttribution>
          {author}, <a href={license.externalUrl}>{license.type}</a>
          {', '}
          {license.additional}
        </LibraryImageAttribution>
      </LibraryContentWrapper>
    </LibraryCard>
  );
};

export default Library;
