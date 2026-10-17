import React from 'react';
import {
  GridLayout as ReactGridLayout,
  useContainerWidth,
  useResponsiveLayout,
} from 'react-grid-layout';

import AppsCard from './components/AppsCard';
import LibraryCard from './components/LibraryCard';
import TodayCard from './components/TodayCard';
import {
  DashboardBreakpoints,
  DashboardCols,
  DashboardContainerClassName,
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
          <LibraryCard key={DashboardKey.LIBRARY} />
        </ReactGridLayout>
      )}
    </div>
  );
};

export default GridLayout;
