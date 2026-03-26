import classnames from 'classnames';
import moment from 'moment-timezone';
import { useRouter } from 'next/router';
import React from 'react';
import { ResponsiveGridLayout, useContainerWidth } from 'react-grid-layout';

import EventsColumn from './components/EventsColumn';
import InfoColumn from './components/InfoColumn';
import { CalendarValue } from './types';

const STATIC = { isDraggable: false, isResizable: false };

const CALENDAR_LAYOUT = {
  lg: [
    { i: 'info', x: 0, y: 0, w: 1, h: 1, ...STATIC },
    { i: 'events', x: 1, y: 0, w: 2, h: 1, ...STATIC },
  ],
  md: [
    { i: 'info', x: 0, y: 0, w: 1, h: 1, ...STATIC },
    { i: 'events', x: 1, y: 0, w: 2, h: 1, ...STATIC },
  ],
  sm: [
    { i: 'info', x: 0, y: 1, w: 0, h: 0, ...STATIC },
    { i: 'events', x: 0, y: 0, w: 1, h: 1, ...STATIC },
  ],
};

const Calendar: React.FC = function () {
  const { width, containerRef } = useContainerWidth();
  const [containerHeight, setContainerHeight] = React.useState(0);

  const { push, pathname } = useRouter();
  const [value, onValueChange] = React.useState<CalendarValue>(new Date());

  React.useEffect(() => {
    const el = containerRef.current;
    if (el == null) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerHeight(entry.contentRect.height);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [containerRef]);

  const handleValueSelected = React.useCallback(
    (newValue: CalendarValue) => {
      onValueChange(newValue);
      if (newValue == null) {
        return;
      }

      if (Array.isArray(newValue)) {
        return;
      }

      const newDateTimestamp = moment(newValue).unix();
      push(`${pathname}#${newDateTimestamp}`);
    },
    [pathname, push]
  );

  const margin: [number, number] = [16, 16];
  // rowHeight = container height minus vertical margins (1 row = 0 inner gaps)
  const rowHeight = containerHeight > 0 ? containerHeight - margin[1] : 0;

  console.log(rowHeight);

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className={classnames(
        'w-full h-full',
        '[&_.react-grid-item]:transition-all',
        '[&_.react-grid-item]:duration-200',
        '[&_.react-grid-item]:ease-linear'
      )}
    >
      {width > 0 && rowHeight > 0 && (
        <ResponsiveGridLayout
          width={width}
          layouts={CALENDAR_LAYOUT}
          breakpoints={{ lg: 1000, md: 735, sm: 0 }}
          cols={{ lg: 3, md: 3, sm: 1 }}
          rowHeight={rowHeight}
          margin={margin}
        >
          <div key="info" className="hidden md:block">
            <InfoColumn value={value} onChange={handleValueSelected} />
          </div>
          <div key="events">
            <EventsColumn />
          </div>
        </ResponsiveGridLayout>
      )}
    </div>
  );
};

export default Calendar;
