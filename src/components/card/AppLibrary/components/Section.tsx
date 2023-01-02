import orderBy from 'lodash/orderBy';
import React, { useMemo } from 'react';

import App from './App';
import { SectionWrapper } from './styled';

interface Props {
  isSorted?: boolean;
  shortcuts: App.AppLibrary.LibraryItemShortcut[];
}

const Section: React.FC<Props> = (props) => {
  const { shortcuts, isSorted = true } = props;

  const shortcutsSort = useMemo(
    () =>
      !isSorted
        ? shortcuts
        : orderBy(shortcuts, [(app) => app.title.toLowerCase()], ['asc']),
    [isSorted, shortcuts]
  );

  if (shortcuts.length === 0) {
    return null;
  }

  return (
    <SectionWrapper>
      {shortcutsSort.map((shortcut) => (
        <App key={shortcut.id} shortcut={shortcut} />
      ))}
    </SectionWrapper>
  );
};

export default Section;
