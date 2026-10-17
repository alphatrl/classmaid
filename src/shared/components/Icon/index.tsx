import { DynamicIcon, type IconName } from 'lucide-react/dynamic';
import dynamic from 'next/dynamic';
import React from 'react';

const Telegram = dynamic(() => import('./components/telegram'));
const Instagram = dynamic(() => import('./components/instagram'));
const SMUShortcutIcon = dynamic(() => import('./components/smushortcut'));
const Reddit = dynamic(() => import('./components/reddit'));

/**
 * Brand glyphs that Lucide does not ship. Everything else is a Lucide icon
 * name (kebab-case, e.g. "external-link") rendered via DynamicIcon so only
 * the icons actually used are loaded.
 */
const CUSTOM_ICONS: Record<string, React.ComponentType<App.CustomSVG>> = {
  telegram: Telegram,
  instagram: Instagram,
  smushortcut: SMUShortcutIcon,
  reddit: Reddit,
};

interface Props {
  name: string;
  className?: string;
  /** Width and height in px. Defaults to 24. */
  size?: number;
}

const Icon: React.FC<Props> = (props) => {
  const { name, className, size = 24 } = props;

  const CustomIcon = CUSTOM_ICONS[name];
  if (CustomIcon) {
    return <CustomIcon width={size} height={size} />;
  }

  return (
    <DynamicIcon
      name={name as IconName}
      size={size}
      className={className}
      aria-hidden="true"
      // Reserve the icon's box while the icon module loads
      fallback={() => (
        <span
          className={className}
          style={{ display: 'inline-block', width: size, height: size }}
        />
      )}
    />
  );
};

export default Icon;
