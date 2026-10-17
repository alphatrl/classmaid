import { Breakpoint, ResponsiveLayouts } from 'react-grid-layout';

import { CalendarKey } from '../types';

/**
 * Uses the home dashboard breakpoints, columns, margin and square cells.
 * The info card (month calendar) is not rendered on sm, so the sm layout
 * has only the events card.
 */
export const CalendarLayouts: ResponsiveLayouts<Breakpoint> = {
  lg: [
    { i: CalendarKey.INFO, x: 0, y: 0, w: 1, h: 2 },
    { i: CalendarKey.EVENTS, x: 1, y: 0, w: 3, h: 2 },
  ],
  md: [
    { i: CalendarKey.INFO, x: 0, y: 0, w: 2, h: 2 },
    { i: CalendarKey.EVENTS, x: 2, y: 0, w: 2, h: 2 },
  ],
  sm: [{ i: CalendarKey.EVENTS, x: 0, y: 0, w: 2, h: 4 }],
};
