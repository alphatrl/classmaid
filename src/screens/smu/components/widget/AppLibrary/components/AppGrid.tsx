import React from 'react';
import styled from 'styled-components';

import Icon from '../../../../../../shared/components/Icon';
import {
  DESKTOP_WIDTH_SIZE_M,
  DESKTOP_WIDTH_SIZE_S,
  MOBILE_WIDTH_SIZE_S,
} from '../../../../../../shared/themes/size';
import AppLibraryModal from './AppLibraryModal';
import { GridImage, GridItem, GridText } from './styled';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-content: center;
  align-items: baseline;
  row-gap: 12px;
  column-gap: 24px;

  @media screen and (max-width: ${DESKTOP_WIDTH_SIZE_M}) {
    grid-template-columns: repeat(5, 1fr);
    column-gap: 24px;
  }

  @media screen and (max-width: ${DESKTOP_WIDTH_SIZE_S}) {
    grid-template-columns: repeat(4, 1fr);
    column-gap: 12px;
  }

  @media screen and (max-width: ${MOBILE_WIDTH_SIZE_S}) {
    column-gap: 8px;
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
