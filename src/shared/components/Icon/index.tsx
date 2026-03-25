import dynamic from 'next/dynamic';
import React, { useCallback } from 'react';

const Telegram = dynamic(() => import('./components/telegram'));
const Instagram = dynamic(() => import('./components/instagram'));
const SMUShortcutIcon = dynamic(() => import('./components/smushortcut'));
const Reddit = dynamic(() => import('./components/reddit'));

interface Props {
  name: string;
  className?: string;
  size?: number;
  width?: number;
  height?: number;
}

const Icon: React.FC<Props> = (props) => {
  const { name, className, size, width = 16, height = 16 } = props;

  const getIcon = useCallback(() => {
    switch (name) {
      case 'telegram':
        return <Telegram width={width} height={height} />;
      case 'instagram':
        return <Instagram width={width} height={height} />;
      case 'smushortcut':
        return <SMUShortcutIcon width={width} height={height} />;
      case 'reddit':
        return <Reddit width={width} height={height} />;
      default:
        return (
          <span
            className={
              className
                ? `material-symbols-rounded ${className}`
                : 'material-symbols-rounded'
            }
            style={size ? { fontSize: size } : undefined}
          >
            {name}
          </span>
        );
    }
  }, [className, height, name, size, width]);

  return getIcon();
};

export default Icon;
