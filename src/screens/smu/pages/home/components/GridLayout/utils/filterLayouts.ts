import type { ResponsiveLayouts } from 'react-grid-layout';

/**
 * Copy of `layouts` without the items whose key is in `keys`, for every
 * breakpoint. No `@/` imports so vitest can load it directly.
 */
export function filterLayouts<B extends string>(
  layouts: ResponsiveLayouts<B>,
  keys: readonly string[]
): ResponsiveLayouts<B> {
  if (keys.length === 0) return layouts;
  const filtered: ResponsiveLayouts<B> = {};
  for (const breakpoint of Object.keys(layouts) as B[]) {
    const layout = layouts[breakpoint];
    if (layout != null) {
      filtered[breakpoint] = layout.filter((item) => !keys.includes(item.i));
    }
  }
  return filtered;
}
