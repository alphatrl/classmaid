import {
  autoUpdate,
  safePolygon,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
} from '@floating-ui/react';
import classnames from 'classnames';
import React from 'react';

import useMediaQuery from '../../../../hooks/useMediaQuery';
import useMobileDevice from '../../../../hooks/useMobileDevice';
import Icon from '../../../Icon';
import MenuItem from '../../../modal/MenuItem';
import { PopperHeader, PopperWrapper } from '../../../modal/styled';
import AboutModal from './AboutModal';
import AddToHomeModal from './AddToHomeModal';

const MoreButton: React.FC = function () {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = React.useState(false);
  const [isAddToHomeOpen, setIsAddToHomeOpen] = React.useState(false);

  const { isMobile } = useMobileDevice();
  const isStandaloneWindow = useMediaQuery('(display-mode: standalone)');
  const shouldShowAddToHomeOptions = isMobile && !isStandaloneWindow;

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'bottom-end',
    whileElementsMounted: autoUpdate,
  });

  const dismiss = useDismiss(context);
  const hover = useHover(context, { move: false, handleClose: safePolygon() });
  const focus = useFocus(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
  ]);

  const handleOpenAboutModal = () => {
    setIsAboutModalOpen(true);
  };

  const handleCloseAboutModal = () => {
    setIsAboutModalOpen(false);
  };

  const handleOpenAddToHomeScreen = () => {
    setIsAddToHomeOpen(true);
  };

  const handleCloseAddToHomeScreen = () => {
    setIsAddToHomeOpen(false);
  };

  return (
    <>
      <button
        ref={refs.setReference}
        className={classnames(
          'py-2.5 px-3 rounded-lg bg-transparent border-none',
          'text-white cursor-pointer flex items-center hover:bg-black/20'
        )}
        {...getReferenceProps()}
      >
        <Icon name="pending" />
      </button>
      {isOpen && (
        <PopperWrapper
          // eslint-disable-next-line react-hooks/refs
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          <PopperHeader>More</PopperHeader>
          <MenuItem
            icon={'info'}
            label="About Classmaid"
            onClick={handleOpenAboutModal}
          />
          {shouldShowAddToHomeOptions && (
            <MenuItem
              icon={'add_to_home_screen'}
              label="Add to Home Screen"
              onClick={handleOpenAddToHomeScreen}
            />
          )}
        </PopperWrapper>
      )}

      {isAboutModalOpen && (
        <AboutModal isOpen={isAboutModalOpen} onClose={handleCloseAboutModal} />
      )}

      {isAddToHomeOpen && (
        <AddToHomeModal
          isOpen={isAddToHomeOpen}
          onClose={handleCloseAddToHomeScreen}
        />
      )}
    </>
  );
};

export default MoreButton;
