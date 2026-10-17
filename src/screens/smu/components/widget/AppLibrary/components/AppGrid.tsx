import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

import AppLibraryModal from './AppLibraryModal';
import AppItem from './AppLibraryModal/components/AppItem';

/** Tiles in the skeleton: six bookmarks and the "More Apps" tile */
const SKELETON_TILES = 7;

interface Props {
  allApps: Content.Section[];
  homeApps: Content.Bookmark[];
}

function GridContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'grid grid-cols-3 justify-items-center items-baseline gap-y-3 gap-x-6',
        'lg:grid-cols-3 ',
        'xl:grid-cols-5',
        className
      )}
      {...props}
    />
  );
}

const AppGrid: React.FC<Props> = function (props) {
  const { allApps, homeApps } = props;

  return (
    <GridContainer>
      {homeApps.map((bookmark) => {
        return <AppItem key={bookmark.id} bookmark={bookmark} />;
      })}

      <AppLibraryModal sections={allApps} />
    </GridContainer>
  );
};

export function AppGridSkeleton() {
  return (
    <GridContainer aria-busy="true" aria-label="Loading bookmarks">
      {Array.from({ length: SKELETON_TILES }, (_, index) => (
        <div key={index} className="flex flex-col items-center">
          <Skeleton className="h-14 w-14 md:h-16 md:w-16 rounded-2xl" />
          <Skeleton className="mt-2 h-3 w-14 md:h-4" />
        </div>
      ))}
    </GridContainer>
  );
}

export function AppGridMessage(props: React.PropsWithChildren) {
  return (
    <p className="m-0 text-center text-sm text-gray-700 dark:text-gray-200">
      {props.children}
    </p>
  );
}

export default AppGrid;
