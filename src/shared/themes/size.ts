export const DESKTOP_WIDTH = 1160;
export const MOBILE_WIDTH = 760;

export const WIDGET_HEIGHT = 315;
export const WIDGET_WIDTH_SQUARE = WIDGET_HEIGHT;
export const WIDGET_WIDTH_RECTANGLE = 640;

export const MOBILE_MEDIA_QUERY = `(max-width: ${MOBILE_WIDTH - 1}px)`;
export const MOBILE_MEDIA_QUERY_S = `(max-width: 480px)`;
export const TABLET_MEDIA_QUERY = `(min-width: ${MOBILE_WIDTH}px) and (max-width: ${
  DESKTOP_WIDTH - 1
}px)`;
export const DESKTOP_MEDIA_QUERY = `(min-width: ${DESKTOP_WIDTH}px)`;
