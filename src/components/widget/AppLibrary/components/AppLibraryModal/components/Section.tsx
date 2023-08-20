import React from 'react';
import styled from 'styled-components';

import {
  DESKTOP_WIDTH_SIZE_M,
  DESKTOP_WIDTH_SIZE_S,
  MOBILE_WIDTH_SIZE_S,
} from '../../../../../../themes/size';
import Icon from '../../../../../Icon';
import { GridImage, GridItem, GridText } from '../../styled';

const Wrapper = styled.div`
  padding-bottom: 16px;
`;

const AppWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  justify-content: center;
  align-items: baseline;
  row-gap: 24px;
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
  library: App.AppLibrary.LibraryItem;
}

const Section: React.FC<Props> = function (props) {
  const { library } = props;
  const { title, shortcuts } = library;

  return (
    <Wrapper>
      <h2>{title}</h2>
      <AppWrapper>
        {shortcuts.map((shortcut) => {
          return (
            <GridItem key={shortcut.id} href={shortcut.link} target="_blank">
              <GridImage backgroundColor={shortcut.color}>
                <Icon name={shortcut.logo} height={32} width={32} />
              </GridImage>
              <GridText>{shortcut.title}</GridText>
            </GridItem>
          );
        })}
      </AppWrapper>
    </Wrapper>
  );
};

export default Section;
