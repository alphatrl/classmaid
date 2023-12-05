export const DESKTOP_WIDTH_SIZE_S = '960px';
export const DESKTOP_WIDTH_SIZE_M = '1280px';
export const DESKTOP_WIDTH_SIZE_L = '1440px';

export const MOBILE_WIDTH_SIZE_S = '720px';
export const MOBILE_WIDTH_SIZE_L = '800px';

// for square widget
export const WIDGET_S_WIDTH_SIZE_S = 300;
export const WIDGET_S_WIDTH_SIZE_L = 320;

// for rectangle widget
export const WIDGET_L_WIDTH_SIZE_S = 540;
export const WIDGET_L_WIDTH_SIZE_L = 640;

export const DESKTOP_WIDTH = 1160;
export const MOBILE_WIDTH = 760;

export const WIDGET_HEIGHT = 315;
export const WIDGET_WIDTH_SQUARE = WIDGET_HEIGHT;
export const WIDGET_WIDTH_RECTANGLE = 640;

export const MOBILE_MEDIA_QUERY = `(max-width: ${MOBILE_WIDTH - 1}px)`;
export const TABLET_MEDIA_QUERY = `(min-width: ${MOBILE_WIDTH}px) and (max-width: ${
  DESKTOP_WIDTH - 1
}px)`;
export const DESKTOP_MEDIA_QUERY = `(min-width: ${DESKTOP_WIDTH}px)`;
