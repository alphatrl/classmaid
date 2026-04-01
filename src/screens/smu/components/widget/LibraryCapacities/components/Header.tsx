import classnames from 'classnames';
import React from 'react';

import Icon from '../../../../../../shared/components/Icon';
import { WidgetHeader, WidgetHeaderTitle } from '../../styled';

const Header: React.FC = function () {
  return (
    <WidgetHeader className="justify-between">
      <WidgetHeaderTitle>Library</WidgetHeaderTitle>

      <a
        href="https://library.smu.edu.sg"
        target="_blank"
        className={classnames(
          'cursor-pointer no-underline rounded-2xl',
          'flex p-2 -mr-2 items-center border-none bg-transparent',
          'hover:bg-theme-200'
        )}
      >
        <Icon name="open_in_new" className="text-theme-500" />
      </a>
    </WidgetHeader>
  );
};

export default Header;
