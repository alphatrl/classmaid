import React from 'react';

import Icon from '../Icon';
import { MenuItemLabel, MenuItemWrapper } from './styled';

interface Props {
  icon: string;
  label: string;
  onClick: () => void;
}

const MenuItem: React.FC<Props> = function (props) {
  const { icon, label, onClick } = props;

  return (
    <MenuItemWrapper onClick={onClick}>
      <Icon name={icon} />
      <MenuItemLabel>{label}</MenuItemLabel>
    </MenuItemWrapper>
  );
};

export default MenuItem;
