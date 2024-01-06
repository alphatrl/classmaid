import React from 'react';
import styled, { useTheme } from 'styled-components';

import Icon from '../../../../../../../shared/components/Icon';
import Modal, {
  ModalContent,
  ModalTitle,
  ModalTrigger,
} from '../../../../modal/shared/Modal';
import { GridImage, GridItemMore, GridText } from '../styled';
import Section from './components/Section';

const Wrapper = styled.div`
  padding: 1em 1.5em;
`;

interface Props {
  apps: App.AppLibrary.LibraryItem[];
}

const AppLibraryModal: React.FC<Props> = function (props) {
  const { apps } = props;
  const theme = useTheme();

  return (
    <Modal>
      <ModalTrigger asChild={true}>
        <GridItemMore role="button">
          <GridImage $backgroundColor={theme.appColor[50]}>
            <Icon name="apps" />
          </GridImage>
          <GridText>More Apps</GridText>
        </GridItemMore>
      </ModalTrigger>

      <ModalContent>
        <Wrapper>
          <ModalTitle>App Library</ModalTitle>

          {apps.map((library) => {
            return <Section key={library.uid} library={library} />;
          })}
        </Wrapper>
      </ModalContent>
    </Modal>
  );
};

export default AppLibraryModal;
