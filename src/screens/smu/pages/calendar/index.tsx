import moment from 'moment-timezone';
import { useRouter } from 'next/router';
import React from 'react';
import {
  ResponsiveGridLayout,
  useContainerWidth,
} from 'react-grid-layout';
import styled from 'styled-components';

import useScreenSize from '../../../../shared/hooks/useScreenSize';
import { MOBILE_WIDTH } from '../../../../shared/themes/size';
import EventsColumn from './components/EventsColumn';
import InfoColumn from './components/InfoColumn';
import { CalendarValue } from './types';

const STATIC = { isDraggable: false, isResizable: false };

const GridWrapper = styled.div`
  width: 100%;
  height: 100%;

  .react-grid-item {
    transition: all 0.2s ease;
  }
`;

const Calendar: React.FC = function () {
  const { isMobile } = useScreenSize();
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

  const layouts = isMobile
    ? {
        sm: [{ i: 'events', x: 0, y: 0, w: 1, h: 1, ...STATIC }],
      }
    : {
        lg: [
          { i: 'info', x: 0, y: 0, w: 1, h: 1, ...STATIC },
          { i: 'events', x: 1, y: 0, w: 2, h: 1, ...STATIC },
        ],
        sm: [{ i: 'events', x: 0, y: 0, w: 1, h: 1, ...STATIC }],
      };

  return (
    <GridWrapper ref={containerRef as React.RefObject<HTMLDivElement>}>
      {width > 0 && rowHeight > 0 && (
        <ResponsiveGridLayout
          width={width}
          layouts={layouts}
          breakpoints={{ lg: MOBILE_WIDTH, sm: 0 }}
          cols={{ lg: 3, sm: 1 }}
          rowHeight={rowHeight}
          margin={margin}
          autoSize={false}
        >
          {!isMobile && (
            <div key="info">
              <InfoColumn value={value} onChange={handleValueSelected} />
            </div>
          )}
          <div key="events">
            <EventsColumn />
          </div>
        </ResponsiveGridLayout>
      )}
    </GridWrapper>
  );
};

export default Calendar;
