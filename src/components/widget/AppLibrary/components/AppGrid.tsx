import React from 'react';
import styled, { useTheme } from 'styled-components';

import {
  DESKTOP_WIDTH_SIZE_M,
  DESKTOP_WIDTH_SIZE_S,
  MOBILE_WIDTH_SIZE_L,
  MOBILE_WIDTH_SIZE_S,
} from '../../../../themes/size';
import Icon from '../../../Icon';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 92px);
  justify-content: center;
  align-items: baseline;
  gap: 30px;

  @media screen and (max-width: ${DESKTOP_WIDTH_SIZE_M}) {
    grid-template-columns: repeat(5, 80px);
    gap: 24px;
  }

  @media screen and (max-width: ${DESKTOP_WIDTH_SIZE_S}) {
    grid-template-columns: repeat(4, 64px);
    column-gap: 12px;
  }

  @media screen and (max-width: ${MOBILE_WIDTH_SIZE_S}) {
    column-gap: 8px;
  }
`;

const GridItem = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  transition: all 0.2s ease-in;
  cursor: pointer;

  :hover {
    transform: scale(1.05);
  }
`;

const GridImage = styled.div<{ backgroundColor: string }>`
  height: 72px;
  width: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background-color: ${(props) => props.backgroundColor};

  span {
    font-size: 42px;
    color: #fff;
  }

  @media screen and (max-width: ${DESKTOP_WIDTH_SIZE_S}) {
    height: 64px;
    width: 64px;
  }

  @media screen and (max-width: ${MOBILE_WIDTH_SIZE_L}) {
    height: 56px;
    width: 56px;

    span {
      font-size: 32px;
    }
  }
`;

const GridText = styled.p`
  text-align: center;
  margin: 0;
  font-size: 1em;
  padding-top: 12px;
  font-weight: 500;
  color: ${(props) => props.theme.textColor[10]};
`;

interface Props {
  homeApps: App.AppLibrary.LibraryItem;
}

const AppGrid: React.FC<Props> = function (props) {
  const { homeApps } = props;
  const theme = useTheme();

  return (
    <Wrapper>
      {homeApps.shortcuts.map((shortcut) => {
        return (
          <GridItem key={shortcut.id} href={shortcut.link} target="_blank">
            <GridImage backgroundColor={shortcut.color}>
              <Icon name={shortcut.logo} />
            </GridImage>
            <GridText>{shortcut.title}</GridText>
          </GridItem>
        );
      })}

      <GridItem>
        <GridImage backgroundColor={theme.primary[50]}>
          <Icon name="apps" />
        </GridImage>
        <GridText>More Apps</GridText>
      </GridItem>
    </Wrapper>
  );
};

export default AppGrid;
