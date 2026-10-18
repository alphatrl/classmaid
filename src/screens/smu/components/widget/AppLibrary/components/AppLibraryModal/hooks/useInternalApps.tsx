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
  bookmark: Content.Bookmark;
}

const useInternalApps = function (props: Props) {
  const { bookmark } = props;

  const renderInternalApps = React.useCallback(() => {
    if (bookmark.type !== 'internal') {
      return null;
    }

    switch (bookmark.link) {
      case 'boss-export':
        return <BOSSTimetableModal />;

      default: {
        return null;
      }
    }
  }, [bookmark.link, bookmark.type]);

  const renderAppIcon = React.useCallback(() => {
    if (bookmark.type !== 'internal') {
      return null;
    }

    return (
      <Modal>
        <ModalTrigger asChild={true}>
          <GridItemMore role="button">
            <GridImage $backgroundColor={bookmark.color}>
              <Icon name={bookmark.icon} />
            </GridImage>
            <GridText>{bookmark.title}</GridText>
          </GridItemMore>
        </ModalTrigger>

        <ModalContent>{renderInternalApps()}</ModalContent>
      </Modal>
    );
  }, [renderInternalApps, bookmark]);

  const values = React.useMemo(() => {
    return {
      render: renderAppIcon,
    };
  }, [renderAppIcon]);

  return values;
};

export default useInternalApps;
