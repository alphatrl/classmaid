import React from 'react';
import styled from 'styled-components';

import { WidgetHeader, WidgetHeaderTitle } from '../../styled';

const Wrapper = styled(WidgetHeader)`
  justify-content: space-between;
`;

const Header: React.FC = function () {
  return (
    <Wrapper>
      <WidgetHeaderTitle>Apps</WidgetHeaderTitle>
    </Wrapper>
  );
};

export default Header;
