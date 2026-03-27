import classnames from 'classnames';
import React from 'react';

import AppItem from './AppItem';

interface Props {
  library: App.AppLibrary.LibraryItem;
}

const Section: React.FC<Props> = function (props) {
  const { library } = props;
  const { title, shortcuts } = library;

  return (
    <div className="pb-4">
      <h2
        className={classnames(
          'pb-4',
          'text-xl font-bold',
          'text-gray-700 dark:text-gray-200'
        )}
      >
        {title}
      </h2>
      <div
        className={classnames(
          'grid grid-cols-6 justify-center justify-items-center items-baseline gap-y-6 gap-x-6',
          'lg:grid-cols-5 lg:gap-x-3',
          'max-md:grid-cols-4 max-md:gap-x-2',
          'max-sm:grid-cols-3 max-sm:gap-x-1'
        )}
      >
        {shortcuts.map((shortcut) => {
          return <AppItem key={shortcut.id} shortcut={shortcut} />;
        })}
      </div>
    </div>
  );
};

export default Section;
