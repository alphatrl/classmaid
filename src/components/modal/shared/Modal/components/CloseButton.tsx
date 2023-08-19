import React from 'react';
import styled from 'styled-components';

import Icon from '../../../../Icon';

const Wrapper = styled.button`
  width: 48px;
  height: 48px;
  border-width: 0;
  background-color: unset;

  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-size: 36px;
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
