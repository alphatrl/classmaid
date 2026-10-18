import { Breakpoint, ResponsiveLayouts } from 'react-grid-layout';

import { CalendarKey } from '../types';

/**
 * One full-height row: the info card (month calendar) on the left and the
 * events card filling the remaining columns.
 *
 * react-calendar needs an info card of about 280px, or the weekday labels
 * clip. lg (1184px container) uses 4 columns, so 1 column is a 284px info
 * card. On md (736-864px container) 1 of 3 columns is only 235-277px, so
 * md uses 5 columns and the info card spans 2 (285-336px).
 * sm does not use the grid: the month calendar is in a left drawer.
 */
export const CalendarCols: Record<Breakpoint, number> = {
  lg: 4,
  md: 5,
  sm: 2,
};

export const CalendarLayouts: ResponsiveLayouts<Breakpoint> = {
  lg: [
    { i: CalendarKey.INFO, x: 0, y: 0, w: 1, h: 1 },
    { i: CalendarKey.EVENTS, x: 1, y: 0, w: 3, h: 1 },
  ],
  md: [
    { i: CalendarKey.INFO, x: 0, y: 0, w: 2, h: 1 },
    { i: CalendarKey.EVENTS, x: 2, y: 0, w: 3, h: 1 },
  ],
  // Not rendered as a grid on sm (see GridLayout); kept for the hook
  sm: [{ i: CalendarKey.EVENTS, x: 0, y: 0, w: 2, h: 1 }],
};

/**
 * Height of the area below the fixed nav header. DefaultLayout offsets
 * the page content by the same amount.
 */
export const CalendarHeightClassName =
  'h-[calc(100dvh-64px-env(safe-area-inset-top))]';
