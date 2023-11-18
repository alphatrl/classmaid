import { useId } from '@floating-ui/react';
import React from 'react';
import styled from 'styled-components';

import Icon from '../../../../../../../shared/components/Icon';
import { useModalContext } from '../hooks/useModalContext';

const HeaderWrapper = styled.div<{ showTitle: boolean }>`
  min-height: 48px;
  padding: 4px 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) =>
    props.showTitle ? 'space-between' : 'flex-end'};

  h2 {
    font-size: 1.5em;
    margin: 0;
    text-transform: capitalize;
    color: ${(props) => props.theme.textColor[10]};
  }
`;

const CloseButtonWrapper = styled.button`
  width: 40px;
  height: 40px;
  border-width: 0;
  background-color: unset;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 24px;

  :hover {
    background-color: ${(props) => props.theme.appColor[90]};
  }

  span {
    font-size: 32px;
    color: ${(props) => props.theme.appColor[40]};
  }
`;

const ModalHeading = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLProps<HTMLHeadingElement>
>(function DialogHeading({ children, ...props }, ref) {
  const { setLabelId, setOpen } = useModalContext();
  const id = useId();

  const handleClose = () => {
    setOpen(false);
  };

  // Only sets `aria-labelledby` on the Dialog root element
  // if this component is mounted inside it.
  React.useLayoutEffect(() => {
    setLabelId(id);
    return () => setLabelId(undefined);
  }, [id, setLabelId]);

  return (
    <HeaderWrapper showTitle={children != null}>
      <h2 {...props} ref={ref} id={id}>
        {children}
      </h2>
      <CloseButtonWrapper onClick={handleClose}>
        <Icon name="cancel" />
      </CloseButtonWrapper>
    </HeaderWrapper>
  );
});

ModalHeading.displayName = 'ModalHeading';
export default ModalHeading;
