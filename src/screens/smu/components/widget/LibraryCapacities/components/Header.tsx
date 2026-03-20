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
          '[&_span]:text-sky-500 [&_span]:dark:text-sky-500',
          'hover:bg-sky-200 dark:hover:bg-sky-200'
        )}
      >
        <Icon name="open_in_new" />
      </a>
    </WidgetHeader>
  );
};

export default Header;
