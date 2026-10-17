import React from 'react';

import { GridItemMore } from '@/screens/smu/components/widget/AppLibrary/components/GridItemMore';
import {
  GridImage,
  GridText,
} from '@/screens/smu/components/widget/AppLibrary/components/styled';
import BOSSTimetableModal from '@/screens/smu/pages/home/components/BOSSTimetableModal';
import Icon from '@/shared/components/Icon';
import Modal, { ModalContent, ModalTrigger } from '@/shared/components/Modal';

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
              <Icon name={shortcut.logo} />
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
