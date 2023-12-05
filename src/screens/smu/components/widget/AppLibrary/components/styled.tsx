import styled from 'styled-components';

import {
  MOBILE_MEDIA_QUERY,
  TABLET_MEDIA_QUERY,
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

  @media screen and ${TABLET_MEDIA_QUERY}, ${MOBILE_MEDIA_QUERY} {
    height: 54px;
    width: 54px;

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

  @media screen and ${TABLET_MEDIA_QUERY}, ${MOBILE_MEDIA_QUERY} {
    line-height: 1.1em;
    font-size: 0.85em;
  }
`;
