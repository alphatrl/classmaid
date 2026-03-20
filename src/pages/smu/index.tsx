import classnames from 'classnames';
import type { NextPage } from 'next';
import React from 'react';
import {
  Breakpoint,
  GridLayout as ResponsiveGridLayout,
  useContainerWidth,
  useResponsiveLayout,
} from 'react-grid-layout';

import AppLibrary from '../../screens/smu/components/widget/AppLibrary';
import LibraryCapacities from '../../screens/smu/components/widget/LibraryCapacities';
import TodaySummaryWidget from '../../screens/smu/components/widget/TodaySummary';
import DefaultLayout from '../../shared/components/layouts/DefaultLayout';

const STATIC = { isDraggable: false, isResizable: false };

export const DashboardRowHeight: Record<Breakpoint, number> = {
  lg: 315,
  md: 315,
  sm: 315,
};

const DashboardMargin = {
  lg: 32,
  md: 24,
  sm: 16,
};

const APP_LAYOUT = {
  lg: [
    { i: 'today', x: 0, y: 0, w: 1, h: 1, ...STATIC },
    { i: 'apps', x: 1, y: 0, w: 2, h: 1, ...STATIC },
    { i: 'library', x: 0, y: 1, w: 2, h: 1, ...STATIC },
  ],
  md: [
    { i: 'today', x: 0, y: 0, w: 1, h: 1, ...STATIC },
    { i: 'apps', x: 1, y: 0, w: 1, h: 1, ...STATIC },
    { i: 'library', x: 0, y: 1, w: 1, h: 1, ...STATIC },
  ],
  sm: [
    { i: 'today', x: 0, y: 0, w: 1, h: 1, ...STATIC },
    { i: 'apps', x: 0, y: 1, w: 1, h: 1, ...STATIC },
    { i: 'library', x: 0, y: 1, w: 1, h: 1, ...STATIC },
  ],
};

const DashboardGrid: React.FC = function () {
  const { width, containerRef } = useContainerWidth();

  const { cols, layout, breakpoint } = useResponsiveLayout({
    width,
    breakpoints: { lg: 1000, md: 700, sm: 480 },
    cols: { lg: 3, md: 2, sm: 1 },
    layouts: APP_LAYOUT,
  });

  const cardHeight = React.useMemo(() => {
    // We want the grid items to be square, so rowHeight should equal the column width
    // Formula: (containerWidth - (cols - 1) * marginX) / cols
    if (!width) return DashboardRowHeight.lg || 150; // Fallback

    // Safe access to margin and fallback logic
    return (width - (cols - 1) * DashboardMargin[breakpoint]) / cols;
  }, [width, cols, breakpoint]);

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className={classnames(
        'w-full h-full max-w-96 mx-auto p-4',
        'md:max-w-4xl md:px-4',
        'xl:max-w-7xl xl:px-12'
      )}
    >
      {width > 0 && (
        <ResponsiveGridLayout
          width={width}
          layout={layout}
          dragConfig={{ enabled: false }}
          gridConfig={{
            cols,
            rowHeight: cardHeight,
            margin: [DashboardMargin[breakpoint], DashboardMargin[breakpoint]],
          }}
        >
          <div key="today">
            <TodaySummaryWidget />
          </div>
          <div key="apps">
            <AppLibrary />
          </div>
          <div key="library">
            <LibraryCapacities />
          </div>
        </ResponsiveGridLayout>
      )}
    </div>
  );
};

export const Home: NextPage = function () {
  return (
    <DefaultLayout title="SMU">
      <div className="box-border flex justify-center">
        <DashboardGrid />
      </div>
    </DefaultLayout>
  );
};

export default Home;
