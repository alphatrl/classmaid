import React from 'react';

import Icon from '../../../../../../../shared/components/Icon';
import Modal, {
  ModalContent,
  ModalTitle,
  ModalTrigger,
} from '../../../../../../../shared/components/Modal';
import { GridItemMore } from '../GridItemMore';
import { GridImage, GridText } from '../styled';
import Section from './components/Section';

interface Props {
  apps: App.AppLibrary.LibraryItem[];
}

const AppLibraryModal: React.FC<Props> = function (props) {
  const { apps } = props;

  return (
    <Modal>
      <ModalTrigger asChild={true}>
        <GridItemMore role="button">
          <GridImage $backgroundColor="#808080">
            <Icon name="apps" />
          </GridImage>
          <GridText>More Apps</GridText>
        </GridItemMore>
      </ModalTrigger>

      <ModalContent>
        <div className="px-6 py-4">
          <ModalTitle>App Library</ModalTitle>

          {apps.map((library) => {
            return <Section key={library.uid} library={library} />;
          })}
        </div>
      </ModalContent>
    </Modal>
  );
};

export default AppLibraryModal;
