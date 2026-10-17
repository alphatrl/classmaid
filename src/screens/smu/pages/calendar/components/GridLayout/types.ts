// A const object instead of a TS enum: the base `no-unused-vars` rule in
// this repo reports every enum member as unused.
export const CalendarKey = {
  INFO: 'info',
  EVENTS: 'events',
} as const;

export type CalendarKey = (typeof CalendarKey)[keyof typeof CalendarKey];
