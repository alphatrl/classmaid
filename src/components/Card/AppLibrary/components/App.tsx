import { useRouter } from 'next/router';
import React, { useCallback, useMemo } from 'react';

import firebase from '../../../../utils/firebase';
import Icon from '../../../Icon';
import { AppTitle, AppView, AppWrapper } from './styled';
import ToolTips from './Tooltips';

interface Props {
  shortcut: App.AppLibrary.LibraryItemShortcut;
}

const App: React.FC<Props> = (props) => {
  const {
    shortcut: { id, title, logo, type, link, color, description },
  } = props;
  const router = useRouter();

  const handleClick = useCallback(() => {
    firebase?.analytics().logEvent('go_to_app', { description: id });

    if (type === 'internal') {
      router.push(`/${link}`);
    }
  }, [type, router, link, id]);

  const targetType = useMemo(() => {
    if (type == 'internal') {
      return '_self';
    }
    return '_blank_shortcuts';
  }, [type]);

  const url = useMemo(() => {
    if (type == 'internal') {
      return undefined;
    }
    return link;
  }, [link, type]);

  return (
    <AppWrapper
      onClick={handleClick}
      href={url}
      target={targetType}
      aria-label={description ?? title}
    >
      <AppView color={color}>
        <Icon name={logo} width={30} height={30} />
      </AppView>
      <AppTitle>{title}</AppTitle>
      {description && <ToolTips description={description} />}
    </AppWrapper>
  );
};

export default App;
