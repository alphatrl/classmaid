import React from 'react';
import styled from 'styled-components';

import Icon from '../../../Icon';
import { WidgetHeader, WidgetHeaderTitle } from '../../styled';

const Wrapper = styled(WidgetHeader)`
  display: flex;
  justify-content: space-between;
`;

const ExternalLink = styled.a`
  cursor: pointer;
  text-decoration: none;
  border-radius: 36px;

  display: flex;
  padding: 8px 8px;
  margin-right: -8px;

  align-items: center;
  border: none;
  background-color: unset;

  span {
    color: ${(props) => props.theme.appColor[10]};
  }

  &:hover {
    background-color: ${(props) => props.theme.primary[30]};
  }
`;

const Header: React.FC = function () {
  return (
    <Wrapper>
      <WidgetHeaderTitle>Library</WidgetHeaderTitle>

      <ExternalLink href="https://library.smu.edu.sg" target="_blank">
        <Icon name="open_in_new" />
      </ExternalLink>
    </Wrapper>
  );
};

export default Header;
