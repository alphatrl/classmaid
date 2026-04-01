import classnames from 'classnames';
import { DropdownMenu } from 'radix-ui';
import React from 'react';

import { Theme, useTheme } from '../../../../../../contexts/ThemeContext';
import Icon from '../../../../../Icon';

const themeMeta: Record<Theme, { dot: string; label: string }> = {
  blue: { dot: 'bg-blue-500', label: 'Blue' },
  red: { dot: 'bg-red-500', label: 'Red' },
  emerald: { dot: 'bg-emerald-500', label: 'Emerald' },
  pink: { dot: 'bg-pink-500', label: 'Pink' },
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
                  themeMeta[t].dot
                )}
              />
              {themeMeta[t].label}
              {theme === t && <Icon name="check" className="ml-auto" />}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.SubContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Sub>
  );
};

export default ThemeSubmenu;
