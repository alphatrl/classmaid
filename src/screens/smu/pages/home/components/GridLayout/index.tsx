import React from 'react';
import {
  GridLayout as ReactGridLayout,
  useContainerWidth,
  useResponsiveLayout,
} from 'react-grid-layout';

import { useFeature } from '@/shared/contexts/ContentContext';

import AppsCard from './components/AppsCard';
import LibraryCard from './components/LibraryCard';
import TodayCard from './components/TodayCard';
import {
  DashboardBreakpoints,
  DashboardContainerClassName,
  DashboardLayouts,
  DashboardMargin,
  getSquareRowHeight,
  HomeCols,
} from './constants/dashboard';
import { DashboardKey } from './types';
import { filterLayouts } from './utils/filterLayouts';

const WITHOUT_LIBRARY = [DashboardKey.LIBRARY];

const GridLayout: React.FC = function () {
  // Drop the library slot (layout item and card) when the school has no
  // library occupancy, so the grid leaves no empty cell
  const showLibrary = useFeature('library_occupancy');
  const layouts = React.useMemo(
    () =>
      showLibrary
        ? DashboardLayouts
        : filterLayouts(DashboardLayouts, WITHOUT_LIBRARY),
    [showLibrary]
  );

  const { width, containerRef, mounted } = useContainerWidth({
    measureBeforeMount: true,
  });
  const { cols, layout } = useResponsiveLayout({
    width,
    breakpoints: DashboardBreakpoints,
    cols: HomeCols,
    layouts,
  });

  const rowHeight = React.useMemo(
    () => getSquareRowHeight(width, cols),
    [width, cols]
  );

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement | null>}
      className={DashboardContainerClassName}
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
          {showLibrary && <LibraryCard key={DashboardKey.LIBRARY} />}
        </ReactGridLayout>
      )}
    </div>
  );
};

export default GridLayout;
