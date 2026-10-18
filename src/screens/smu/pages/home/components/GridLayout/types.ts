// A const object instead of a TS enum: the base `no-unused-vars` rule in
// this repo reports every enum member as unused.
export const DashboardKey = {
  TODAY: 'today',
  APPS: 'apps',
  LIBRARY: 'library',
} as const;

export type DashboardKey = (typeof DashboardKey)[keyof typeof DashboardKey];
