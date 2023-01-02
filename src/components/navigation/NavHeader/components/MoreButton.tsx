import React from 'react';
import styled from 'styled-components';

import Icon from '../../../Icon';

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
  return (
    <>
      <Wrapper>
        <Icon name="pending" height={24} width={24} />
      </Wrapper>
    </>
  );
};

export default MoreButton;
