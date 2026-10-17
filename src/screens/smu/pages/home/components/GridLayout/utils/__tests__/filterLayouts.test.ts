import type { Breakpoint, ResponsiveLayouts } from 'react-grid-layout';
import { describe, expect, it } from 'vitest';

import { filterLayouts } from '../filterLayouts';

const LAYOUTS: ResponsiveLayouts<Breakpoint> = {
  lg: [
    { i: 'today', x: 0, y: 0, w: 1, h: 2 },
    { i: 'apps', x: 1, y: 0, w: 3, h: 1 },
    { i: 'library', x: 1, y: 1, w: 3, h: 1 },
  ],
  sm: [
    { i: 'today', x: 0, y: 0, w: 2, h: 2 },
    { i: 'library', x: 0, y: 2, w: 2, h: 2 },
  ],
};

describe('filterLayouts', () => {
  it('drops the given keys from every breakpoint', () => {
    const filtered = filterLayouts(LAYOUTS, ['library']);
    expect(filtered.lg?.map((item) => item.i)).toEqual(['today', 'apps']);
    expect(filtered.sm?.map((item) => item.i)).toEqual(['today']);
    expect(filtered.md).toBeUndefined();
  });

  it('returns the layouts unchanged without keys', () => {
    expect(filterLayouts(LAYOUTS, [])).toBe(LAYOUTS);
  });

  it('does not mutate the input', () => {
    filterLayouts(LAYOUTS, ['library']);
    expect(LAYOUTS.lg).toHaveLength(3);
  });
});
