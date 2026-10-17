import React from 'react';

import { cn } from '@/lib/utils';

import AppItem from './AppItem';

interface Props {
  section: Content.Section;
}

const Section: React.FC<Props> = function (props) {
  const { section } = props;
  const { title, items } = section;

  return (
    <div className="pb-4">
      <h2
        className={cn(
          'pb-4',
          'text-xl font-bold',
          'text-gray-700 dark:text-gray-200'
        )}
      >
        {title}
      </h2>
      <div
        className={cn(
          'grid grid-cols-6 justify-center justify-items-center items-baseline gap-y-6 gap-x-6',
          'lg:grid-cols-5 lg:gap-x-3',
          'max-md:grid-cols-4 max-md:gap-x-2',
          'max-sm:grid-cols-3 max-sm:gap-x-1'
        )}
      >
        {items.map((bookmark) => {
          return <AppItem key={bookmark.id} bookmark={bookmark} />;
        })}
      </div>
    </div>
  );
};

export default Section;
