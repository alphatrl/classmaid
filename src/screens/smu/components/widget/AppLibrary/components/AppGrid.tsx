import classnames from 'classnames';
import React from 'react';

import AppLibraryModal from './AppLibraryModal';
import AppItem from './AppLibraryModal/components/AppItem';

interface Props {
  allApps: App.AppLibrary.LibraryItem[];
  homeApps: App.AppLibrary.LibraryItem;
}

const AppGrid: React.FC<Props> = function (props) {
  const { allApps, homeApps } = props;

  const { shortcuts } = homeApps;

  return (
    <div
      className={classnames(
        'grid grid-cols-5 justify-items-center items-baseline gap-y-3 gap-x-6',
        'lg:grid-cols-3 lg:gap-y-1 lg:gap-x-1',
        'max-md:grid-cols-3 max-md:gap-y-1 max-md:gap-x-1'
      )}
    >
      {shortcuts.map((shortcut) => {
        return <AppItem key={shortcut.id} shortcut={shortcut} />;
      })}

      <AppLibraryModal apps={allApps} />
    </div>
  );
};

export default AppGrid;
