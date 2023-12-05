import React from 'react';
import styled from 'styled-components';

import Icon from '../../../../../../shared/components/Icon';
import {
  MOBILE_MEDIA_QUERY,
  TABLET_MEDIA_QUERY,
} from '../../../../../../shared/themes/size';
import AppLibraryModal from './AppLibraryModal';
import { GridImage, GridItem, GridText } from './styled';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
  align-items: baseline;
  row-gap: 12px;
  column-gap: 24px;

  @media screen and ${TABLET_MEDIA_QUERY} {
    grid-template-columns: repeat(3, 1fr);
    row-gap: 4px;
    column-gap: 4px;
  }

  @media screen and ${MOBILE_MEDIA_QUERY} {
    grid-template-columns: repeat(3, 1fr);
    row-gap: 4px;
    column-gap: 4px;
  }
`;

interface Props {
  allApps: App.AppLibrary.LibraryItem[];
  homeApps: App.AppLibrary.LibraryItem;
}

const AppGrid: React.FC<Props> = function (props) {
  const { allApps, homeApps } = props;

  const { shortcuts } = homeApps;

  return (
    <Wrapper>
      {shortcuts.map((shortcut) => {
        return (
          <GridItem key={shortcut.id} href={shortcut.link} target="_blank">
            <GridImage backgroundColor={shortcut.color}>
              <Icon name={shortcut.logo} />
            </GridImage>
            <GridText>{shortcut.title}</GridText>
          </GridItem>
        );
      })}

      <AppLibraryModal apps={allApps} />
    </Wrapper>
  );
};

export default AppGrid;
