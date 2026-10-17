import { Breakpoint, ResponsiveLayouts } from 'react-grid-layout';

import { cn } from '@/lib/utils';

import { DashboardKey } from '../types';

/**
 * Cells are square (see `getSquareRowHeight`).
 *
 * - lg (container 1184px, viewport >= 1280px): 3 columns of 384px cells.
 *   Today and apps on the first row, library on the second row, and the
 *   last cell stays empty.
 * - md (container 736-864px): the 3-column format gives 235-277px cells,
 *   which clip the today card and the 3-row app grid. md uses 4 columns
 *   and 2x2 spans instead, so each widget is at least 360px high.
 * - sm (container 352px): the cards stack as full-width squares.
 */
export const DashboardLayouts: ResponsiveLayouts<Breakpoint> = {
  lg: [
    { i: DashboardKey.TODAY, x: 0, y: 0, w: 1, h: 1 },
    { i: DashboardKey.APPS, x: 1, y: 0, w: 2, h: 1 },
    { i: DashboardKey.LIBRARY, x: 0, y: 1, w: 2, h: 1 },
  ],
  md: [
    { i: DashboardKey.TODAY, x: 0, y: 0, w: 2, h: 2 },
    { i: DashboardKey.APPS, x: 2, y: 0, w: 2, h: 2 },
    { i: DashboardKey.LIBRARY, x: 0, y: 2, w: 4, h: 2 },
  ],
  sm: [
    { i: DashboardKey.TODAY, x: 0, y: 0, w: 2, h: 2 },
    { i: DashboardKey.APPS, x: 0, y: 2, w: 2, h: 2 },
    { i: DashboardKey.LIBRARY, x: 0, y: 4, w: 2, h: 2 },
  ],
};

export const DashboardBreakpoints: Record<Breakpoint, number> = {
  lg: 1000,
  md: 700,
  sm: 480,
};

export const DashboardCols: Record<Breakpoint, number> = {
  lg: 4,
  md: 4,
  sm: 2,
};

/** Columns of the home grid. The calendar grid uses `DashboardCols`. */
export const HomeCols: Record<Breakpoint, number> = {
  lg: 3,
  md: 4,
  sm: 2,
};

export const DashboardMargin = 16;

/** Row height before the container is measured */
export const DashboardFallbackRowHeight = 240;

/**
 * Row height that makes each cell square. The grid has no container
 * padding, so the column width is the container width minus the gaps,
 * divided by the number of columns.
 */
export function getSquareRowHeight(width: number, cols: number): number {
  if (!width) return DashboardFallbackRowHeight;
  return (width - (cols - 1) * DashboardMargin) / cols;
}

/** Grid container: width caps and gutters per viewport */
export const DashboardContainerClassName = cn(
  'w-full h-full max-w-96 mx-auto p-4',
  'md:max-w-4xl md:px-4',
  'xl:max-w-7xl xl:px-12'
);
