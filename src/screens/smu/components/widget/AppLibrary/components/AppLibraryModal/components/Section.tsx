import React from 'react';
import styled from 'styled-components';

import Icon from '../../../../../../../../shared/components/Icon';
import {
  MOBILE_MEDIA_QUERY,
  MOBILE_MEDIA_QUERY_S,
  TABLET_MEDIA_QUERY,
} from '../../../../../../../../shared/themes/size';
import { GridImage, GridItem, GridText } from '../../styled';

const Wrapper = styled.div`
  padding-bottom: 16px;

  h2 {
    font-size: 1.4em;
    color: ${(props) => props.theme.textColor[10]};
  }

  @media screen and ${MOBILE_MEDIA_QUERY} {
    h2 {
      font-size: 1.2em;
    }
  }
`;

const AppWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  justify-content: center;
  justify-items: center;
  align-items: baseline;
  row-gap: 24px;
  column-gap: 24px;

  @media screen and ${TABLET_MEDIA_QUERY} {
    grid-template-columns: repeat(5, 1fr);
    column-gap: 12px;
  }

  @media screen and ${MOBILE_MEDIA_QUERY} {
    grid-template-columns: repeat(4, 1fr);
    column-gap: 8px;
  }

  @media screen and ${MOBILE_MEDIA_QUERY_S} {
    grid-template-columns: repeat(3, 1fr);
    column-gap: 4px;
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
              <GridImage $backgroundColor={shortcut.color}>
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
