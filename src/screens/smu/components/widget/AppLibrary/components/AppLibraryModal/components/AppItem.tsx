import React from 'react';

import classNames from 'classnames';
import Icon from '../../../../../../../../shared/components/Icon';
import useColorScheme from '../../../../../../../../shared/hooks/useColorScheme';
import useScreenSize from '../../../../../../../../shared/hooks/useScreenSize';
import Modal, {
  ModalContent,
  ModalTrigger,
} from '../../../../../modal/shared/Modal';
import { TASKADE_IFRAME_PARAMS } from '../../../constants';
import { GridImage, GridText } from '../../styled';
import useInternalApps from '../hooks/useInternalApps';
import { GridItemMore } from '../../GridItemMore';

interface Props {
  shortcut: App.AppLibrary.LibraryItemShortcut;
}

const AppItem: React.FC<Props> = function (props) {
  const { shortcut } = props;

  const { dark } = useColorScheme();
  const { isMobile, isTablet } = useScreenSize();
  const { render: renderInternalApps } = useInternalApps({ shortcut });

  let finalUrl = shortcut.link;

  if (shortcut.type === 'taskade') {
    const urlParams = new URLSearchParams(TASKADE_IFRAME_PARAMS);
    urlParams.set('theme', dark ? 'dark' : 'light');

    if (shortcut.description != null) {
      urlParams.set('view', shortcut.description);
    }
    finalUrl = `${shortcut.link}?${urlParams.toString()}`;
  }

  if (shortcut.type === 'internal') {
    return renderInternalApps();
  }

  // NOTE: (amos@taskade.com) Show modal only if on tablet-like screen
  if (shortcut.type === 'taskade' && !isMobile) {
    const frameHeight = isTablet ? 650 : 800;
    return (
      <Modal>
        <ModalTrigger asChild={true}>
          <GridItemMore>
            <GridImage $backgroundColor={shortcut.color}>
              <Icon name={shortcut.logo} height={32} width={32} size={32} />
            </GridImage>
            <GridText>More Apps</GridText>
          </GridItemMore>
        </ModalTrigger>

        <ModalContent>
          <iframe
            className="border-0"
            width="100%"
            height={frameHeight}
            src={finalUrl}
          />
        </ModalContent>
      </Modal>
    );
  }

  return (
    <a
      href={finalUrl}
      target="_blank"
      className={classNames(
        'flex flex-col justify-center items-center',
        'no-underline cursor-pointer w-4/5 max-w-30',
        'transition-all duration-100 ease-in hover:scale-105'
      )}
    >
      <GridImage $backgroundColor={shortcut.color}>
        <Icon name={shortcut.logo} height={32} width={32} size={32} />
      </GridImage>
      <GridText>{shortcut.title}</GridText>
    </a>
  );
};

export default AppItem;
