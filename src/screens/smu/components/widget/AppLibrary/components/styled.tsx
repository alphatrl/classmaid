import styled from 'styled-components';

import {
  DESKTOP_WIDTH_SIZE_S,
  MOBILE_WIDTH_SIZE_L,
} from '../../../../../../shared/themes/size';

export const GridItem = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  transition: all 0.1s ease-in;
  cursor: pointer;

  width: 80%;
  max-width: 120px;

  &:hover {
    transform: scale(1.05);
  }
`;

export const GridItemMore = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  transition: all 0.2s ease-in;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

export const GridImage = styled.div<{ backgroundColor: string }>`
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

  svg {
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

export const GridText = styled.p`
  text-align: center;
  margin: 0;
  font-size: 0.95em;
  padding-top: 8px;
  font-weight: 500;
  color: ${(props) => props.theme.textColor[10]};
`;
