import React from 'react';

import Icon from '../../../../../../../shared/components/Icon';
import Modal, {
  ModalContent,
  ModalTitle,
} from '../../../../modal/shared/Modal';
import { GridImage, GridText } from '../styled';
import { GridItemMore } from '../GridItemMore';
import Section from './components/Section';
import * as Dialog from '@radix-ui/react-dialog';

interface Props {
  apps: App.AppLibrary.LibraryItem[];
}

const AppLibraryModal: React.FC<Props> = function (props) {
  const { apps } = props;

  return (
    <Modal>
      <Dialog.Trigger asChild={true}>
        <GridItemMore role="button">
          <GridImage $backgroundColor="#808080">
            <Icon name="apps" />
          </GridImage>
          <GridText>More Apps</GridText>
        </GridItemMore>
      </Dialog.Trigger>

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
