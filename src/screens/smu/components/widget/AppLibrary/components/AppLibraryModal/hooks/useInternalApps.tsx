import React from 'react';

import Icon from '../../../../../../../../shared/components/Icon';
import BOSSTimetableModal from '../../../../../../pages/home/components/BOSSTimetableModal';
import Modal, {
  ModalContent,
  ModalTrigger,
} from '../../../../../modal/shared/Modal';
import { GridImage, GridItemMore, GridText } from '../../styled';

interface Props {
  shortcut: App.AppLibrary.LibraryItemShortcut;
}

const useInternalApps = function (props: Props) {
  const { shortcut } = props;

  const renderInternalApps = React.useCallback(() => {
    if (shortcut.type !== 'internal') {
      return null;
    }

    switch (shortcut.link) {
      case 'boss-export':
        return <BOSSTimetableModal />;

      default: {
        return null;
      }
    }
  }, [shortcut.link, shortcut.type]);

  const renderAppIcon = React.useCallback(() => {
    if (shortcut.type !== 'internal') {
      return null;
    }

    return (
      <Modal>
        <ModalTrigger asChild={true}>
          <GridItemMore role="button">
            <GridImage $backgroundColor={shortcut.color}>
              <Icon name={shortcut.logo} height={32} width={32} />
            </GridImage>
            <GridText>{shortcut.title}</GridText>
          </GridItemMore>
        </ModalTrigger>

        <ModalContent>{renderInternalApps()}</ModalContent>
      </Modal>
    );
  }, [renderInternalApps, shortcut]);

  const values = React.useMemo(() => {
    return {
      render: renderAppIcon,
    };
  }, [renderAppIcon]);

  return values;
};

export default useInternalApps;
