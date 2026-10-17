import React from 'react';

import { cn } from '@/lib/utils';
import {
  WidgetHeader,
  WidgetHeaderTitle,
} from '@/screens/smu/components/widget/styled';
import Icon from '@/shared/components/Icon';

const Header: React.FC = function () {
  return (
    <WidgetHeader className="justify-between">
      <WidgetHeaderTitle>Library</WidgetHeaderTitle>

      <a
        href="https://library.smu.edu.sg"
        target="_blank"
        className={cn(
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
