import React from 'react';
import styled from 'styled-components';

import Icon from '../../../../../../../shared/components/Icon';

const Wrapper = styled.button`
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

interface Props {
  onClose: () => void;
}

const CloseButton: React.FC<Props> = function (props) {
  const { onClose } = props;

  return (
    <Wrapper onClick={onClose}>
      <Icon name="cancel" />
    </Wrapper>
  );
};

export default CloseButton;
