import React from 'react';
import styled from 'styled-components';

import Icon from '../../../../../../../../shared/components/Icon';
import useScreenSize from '../../../../../../../../shared/hooks/useScreenSize';
import Modal, {
  ModalContent,
  ModalTrigger,
} from '../../../../../modal/shared/Modal';
import { TASKADE_IFRAME_PARAMS } from '../../../constants';
import { GridImage, GridItem, GridItemMore, GridText } from '../../styled';

interface Props {
  shortcut: App.AppLibrary.LibraryItemShortcut;
}

const Wrapper = styled.iframe`
  border-width: 0;
`;

const AppItem: React.FC<Props> = function (props) {
  const { shortcut } = props;
  const { isMobile, isTablet } = useScreenSize();

  if (shortcut.type === 'taskade') {
    const urlParams = new URLSearchParams(TASKADE_IFRAME_PARAMS);
    if (shortcut.description != null) {
      urlParams.set('view', shortcut.description);
    }

    const rebuildUrl = `${shortcut.link}?${urlParams.toString()}`;
    const frameHeight = isMobile ? 600 : isTablet ? 650 : 800;

    return (
      <Modal>
        <ModalTrigger asChild={true}>
          <GridItemMore role="button">
            <GridImage $backgroundColor={shortcut.color}>
              <Icon name={shortcut.logo} height={32} width={32} />
            </GridImage>
            <GridText>More Apps</GridText>
          </GridItemMore>
        </ModalTrigger>

        <ModalContent>
          <Wrapper width="100%" height={frameHeight} src={rebuildUrl} />
        </ModalContent>
      </Modal>
    );
  }

  return (
    <GridItem href={shortcut.link} target="_blank">
      <GridImage $backgroundColor={shortcut.color}>
        <Icon name={shortcut.logo} height={32} width={32} />
      </GridImage>
      <GridText>{shortcut.title}</GridText>
    </GridItem>
  );
};

export default AppItem;
