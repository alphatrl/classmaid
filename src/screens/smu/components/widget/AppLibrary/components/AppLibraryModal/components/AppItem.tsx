import React from 'react';
import styled from 'styled-components';

import Icon from '../../../../../../../../shared/components/Icon';
import useColorScheme from '../../../../../../../../shared/hooks/useColorScheme';
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

  const { dark } = useColorScheme();
  const { isMobile, isTablet } = useScreenSize();

  let finalUrl = shortcut.link;

  if (shortcut.type === 'taskade') {
    const urlParams = new URLSearchParams(TASKADE_IFRAME_PARAMS);
    urlParams.set('theme', dark ? 'dark' : 'light');

    if (shortcut.description != null) {
      urlParams.set('view', shortcut.description);
    }
    finalUrl = `${shortcut.link}?${urlParams.toString()}`;
  }

  // NOTE: (amos@taskade.com) Show modal only if on tablet-like screen
  if (shortcut.type === 'taskade' && !isMobile) {
    const frameHeight = isTablet ? 650 : 800;
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
          <Wrapper width="100%" height={frameHeight} src={finalUrl} />
        </ModalContent>
      </Modal>
    );
  }

  return (
    <GridItem href={finalUrl} target="_blank">
      <GridImage $backgroundColor={shortcut.color}>
        <Icon name={shortcut.logo} height={32} width={32} />
      </GridImage>
      <GridText>{shortcut.title}</GridText>
    </GridItem>
  );
};

export default AppItem;
