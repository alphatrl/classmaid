import React from 'react';
import {
  GridLayout as ReactGridLayout,
  useContainerWidth,
  useResponsiveLayout,
} from 'react-grid-layout';

import {
  DashboardBreakpoints,
  DashboardCols,
  DashboardContainerClassName,
  DashboardMargin,
  getSquareRowHeight,
} from '@/screens/smu/pages/home/components/GridLayout/constants/dashboard';

import EventsCard from './components/EventsCard';
import InfoCard from './components/InfoCard';
import { CalendarLayouts } from './constants/calendar';
import { CalendarKey } from './types';

type Props = Pick<
  React.ComponentProps<typeof InfoCard>,
  'value' | 'onValueChange'
>;

const GridLayout: React.FC<Props> = function ({ value, onValueChange }) {
  const { width, containerRef, mounted } = useContainerWidth({
    measureBeforeMount: true,
  });
  const { cols, layout, breakpoint } = useResponsiveLayout({
    width,
    breakpoints: DashboardBreakpoints,
    cols: DashboardCols,
    layouts: CalendarLayouts,
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
          {breakpoint !== 'sm' && (
            <InfoCard
              key={CalendarKey.INFO}
              value={value}
              onValueChange={onValueChange}
            />
          )}
          <EventsCard key={CalendarKey.EVENTS} />
        </ReactGridLayout>
      )}
    </div>
  );
};

export default GridLayout;
