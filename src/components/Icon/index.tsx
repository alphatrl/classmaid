import dynamic from 'next/dynamic';
import React, { useCallback } from 'react';

const Telegram = dynamic(() => import('./components/telegram'));
const Instagram = dynamic(() => import('./components/instagram'));
const SMUShortcutIcon = dynamic(() => import('./components/smushortcut'));

interface Props {
  name: string;
  width?: number;
  height?: number;
}

const Icon: React.FC<Props> = (props) => {
  const { name, width = 16, height = 16 } = props;

  const getIcon = useCallback(() => {
    switch (name) {
      case 'telegram':
        return <Telegram width={width} height={height} />;
      case 'instagram':
        return <Instagram width={width} height={height} />;
      case 'smushortcut':
        return <SMUShortcutIcon width={width} height={height} />;
      default:
        return <span className="material-icons-round">{name}</span>;
    }
  }, [height, name, width]);

  return getIcon();
};

export default Icon;
