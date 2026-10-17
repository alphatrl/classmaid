import React from 'react';
import {
  GridLayout as ReactGridLayout,
  useContainerWidth,
  useResponsiveLayout,
} from 'react-grid-layout';

import { cn } from '@/lib/utils';

import AppsCard from './components/AppsCard';
import LibraryCard from './components/LibraryCard';
import TodayCard from './components/TodayCard';
import {
  DashboardBreakpoints,
  DashboardCols,
  DashboardLayouts,
  DashboardMargin,
  getSquareRowHeight,
} from './constants/dashboard';
import { DashboardKey } from './types';

const GridLayout: React.FC = function () {
  const { width, containerRef, mounted } = useContainerWidth({
    measureBeforeMount: true,
  });
  const { cols, layout } = useResponsiveLayout({
    width,
    breakpoints: DashboardBreakpoints,
    cols: DashboardCols,
    layouts: DashboardLayouts,
  });

  const rowHeight = React.useMemo(
    () => getSquareRowHeight(width, cols),
    [width, cols]
  );

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement | null>}
      className={cn(
        'w-full h-full max-w-96 mx-auto p-4',
        'md:max-w-4xl md:px-4',
        'xl:max-w-7xl xl:px-12'
      )}
    >
      {mounted && (
        <ReactGridLayout
          width={width}
          layout={layout}
          dragConfig={{ enabled: false }}
          resizeConfig={{ enabled: false }}
          gridConfig={{
            cols,
            rowHeight,
            margin: [DashboardMargin, DashboardMargin],
            containerPadding: [0, 0],
          }}
        >
          <TodayCard key={DashboardKey.TODAY} />
          <AppsCard key={DashboardKey.APPS} />
          <LibraryCard key={DashboardKey.LIBRARY} />
        </ReactGridLayout>
      )}
    </div>
  );
};

export default GridLayout;
