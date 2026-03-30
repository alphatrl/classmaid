import classnames from 'classnames';
import { DropdownMenu } from 'radix-ui';
import React from 'react';

import { useTheme } from '../../../../../../contexts/ThemeContext';
import Icon from '../../../../../Icon';

const themeDotColors: Record<string, string> = {
  blue: 'bg-blue-500',
  red: 'bg-red-500',
  emerald: 'bg-emerald-500',
  pink: 'bg-pink-500',
};

const themeLabels: Record<string, string> = {
  blue: 'Blue',
  red: 'Red',
  emerald: 'Emerald',
  pink: 'Pink',
};

interface Props {
  itemClassName: string;
}

const ThemeSubmenu: React.FC<Props> = function (props) {
  const { itemClassName } = props;
  const { theme, setTheme, themes } = useTheme();

  return (
    <DropdownMenu.Sub>
      <DropdownMenu.SubTrigger className={itemClassName}>
        <Icon name="palette" />
        <DropdownMenu.Label>Theme</DropdownMenu.Label>
      </DropdownMenu.SubTrigger>
      <DropdownMenu.Portal>
        <DropdownMenu.SubContent
          sideOffset={0}
          className={classnames(
            'min-w-44 rounded-2xl p-1.5 overflow-hidden z-10',
            'bg-white dark:bg-gray-900 shadow-2xl'
          )}
        >
          {themes.map((t) => (
            <DropdownMenu.Item
              key={t}
              className={itemClassName}
              onSelect={() => setTheme(t)}
            >
              <span
                className={classnames(
                  'w-4 h-4 rounded-full',
                  themeDotColors[t]
                )}
              />
              {themeLabels[t]}
              {theme === t && <Icon name="check" className="ml-auto" />}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.SubContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Sub>
  );
};

export default ThemeSubmenu;
