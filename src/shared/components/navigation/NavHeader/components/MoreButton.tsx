import {
  autoUpdate,
  safePolygon,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
} from '@floating-ui/react';
import React from 'react';
import styled from 'styled-components';

import Icon from '../../../Icon';
import MenuItem from '../../../modal/MenuItem';
import { PopperHeader, PopperWrapper } from '../../../modal/styled';
import AboutModal from './AboutModal';
const Wrapper = styled.button`
  padding: 10px 12px;
  border-radius: 8px;
  background-color: unset;
  border: unset;
  color: #ffffff;
  cursor: pointer;

  display: flex;
  align-items: center;

  :hover {
    background-color: #00000030;
  }
`;

const MoreButton: React.FC = function () {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = React.useState(false);

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
    console.log('hi');
    setIsAboutModalOpen(true);
  };

  const handleCloseAboutModal = () => {
    setIsAboutModalOpen(false);
  };

  return (
    <>
      <Wrapper ref={refs.setReference} {...getReferenceProps()}>
        <Icon name="pending" />
      </Wrapper>
      {isOpen && (
        <PopperWrapper
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
        </PopperWrapper>
      )}
      {isAboutModalOpen && (
        <AboutModal isOpen={isAboutModalOpen} onClose={handleCloseAboutModal} />
      )}
    </>
  );
};

export default MoreButton;
