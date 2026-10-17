import React from 'react';
import {
  GridLayout as ReactGridLayout,
  useContainerWidth,
  useResponsiveLayout,
} from 'react-grid-layout';

import { cn } from '@/lib/utils';
import {
  DashboardBreakpoints,
  DashboardContainerClassName,
  DashboardMargin,
} from '@/screens/smu/pages/home/components/GridLayout/constants/dashboard';

import CalendarDrawer from './components/CalendarDrawer';
import EventsCard from './components/EventsCard';
import InfoCard from './components/InfoCard';
import {
  CalendarCols,
  CalendarHeightClassName,
  CalendarLayouts,
} from './constants/calendar';
import { useContainerHeight } from './hooks/useContainerHeight';
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
    cols: CalendarCols,
    layouts: CalendarLayouts,
  });

  const isPhone = breakpoint === 'sm';

  // One row that fills the container height (not square)
  const rowHeight = useContainerHeight(
    containerRef as React.RefObject<HTMLDivElement | null>
  );

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement | null>}
      className={cn(DashboardContainerClassName, CalendarHeightClassName)}
    >
      {mounted && isPhone && (
        // Phone: the month calendar is in a left drawer and the events card
        // fills the height below the drawer button
        <div className="flex h-full flex-col gap-2">
          <div className="flex items-center">
            <CalendarDrawer value={value} onValueChange={onValueChange} />
          </div>
          <EventsCard className="min-h-0 flex-1" />
        </div>
      )}
      {mounted && !isPhone && rowHeight > 0 && (
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
          <InfoCard
            key={CalendarKey.INFO}
            value={value}
            onValueChange={onValueChange}
          />
          <EventsCard key={CalendarKey.EVENTS} />
        </ReactGridLayout>
      )}
    </div>
  );
};

export default GridLayout;
