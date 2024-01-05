import React from 'react';
import styled from 'styled-components';

import Modal, {
  ModalContent,
  ModalTitle,
} from '../../../../../screens/smu/components/modal/shared/Modal';
import useMobileDevice from '../../../../hooks/useMobileDevice';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Wrapper = styled.div`
  padding: 1em 1.5em;
  color: ${(props) => props.theme.textColor[10]};
  line-height: 1.5em;
  font-weight: 400;
`;

const OrderListWrapper = styled.ol`
  list-style-type: decimal;
  line-height: 2em;
  padding: 0 1em;

  span {
    color: ${(props) => props.theme.primary[50]};
    vertical-align: text-bottom;
  }
`;

const AddToHomeModal: React.FC<Props> = function (props) {
  const { isOpen, onClose } = props;
  const { mobileOS } = useMobileDevice();

  const contents = React.useMemo(() => {
    if (mobileOS === 'ios') {
      return (
        <OrderListWrapper>
          <li>
            Tap <span className="material-symbols-rounded">{'ios_share'}</span>.
          </li>
          <li>{'Select "Add to Home Screen"'}</li>
        </OrderListWrapper>
      );
    }

    return (
      <OrderListWrapper>
        <li>
          Tap on <b>More Options</b>
          <span className="material-symbols-rounded">{'more_vert'}</span>.
        </li>
        <li>{'Select "Add to Home Screen"'}</li>
      </OrderListWrapper>
    );
  }, [mobileOS]);

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <Wrapper>
          <ModalTitle>Add Classmaid to your Home Screen</ModalTitle>
          {contents}
        </Wrapper>
      </ModalContent>
    </Modal>
  );
};

export default AddToHomeModal;
