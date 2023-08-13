import React from 'react';

import {
  DESKTOP_WIDTH_SIZE_M,
  DESKTOP_WIDTH_SIZE_S,
  MOBILE_WIDTH_SIZE_L,
  MOBILE_WIDTH_SIZE_S,
  WIDGET_L_WIDTH_SIZE_L,
  WIDGET_L_WIDTH_SIZE_S,
  WIDGET_S_WIDTH_SIZE_L,
  WIDGET_S_WIDTH_SIZE_S,
} from '../themes/size';
import useMediaQuery from './useMediaQuery';

type Size = 'small' | 'large';

interface WidgetSize {
  width: number;
  height: number;
}

export default function useWidgetSize(size: Size): WidgetSize {
  const isMobileSizeS = useMediaQuery(`(max-width: ${MOBILE_WIDTH_SIZE_S})`);
  const isMobileSizeL = useMediaQuery(`(max-width: ${MOBILE_WIDTH_SIZE_L})`);
  const isDesktopSSize = useMediaQuery(`(max-width: ${DESKTOP_WIDTH_SIZE_S})`);
  const isDesktopMSize = useMediaQuery(`(max-width: ${DESKTOP_WIDTH_SIZE_M})`);

  const widgetHeight = isMobileSizeL
    ? WIDGET_S_WIDTH_SIZE_S
    : WIDGET_S_WIDTH_SIZE_L;

  const windowWidth = React.useMemo(() => {
    if (size === 'small') {
      return widgetHeight;
    }

    if (isMobileSizeL) {
      return WIDGET_S_WIDTH_SIZE_S;
    }

    if (isMobileSizeS || isDesktopSSize) {
      return WIDGET_S_WIDTH_SIZE_L;
    }

    if (isDesktopMSize) {
      return WIDGET_L_WIDTH_SIZE_S;
    }

    return WIDGET_L_WIDTH_SIZE_L;
  }, [
    isDesktopMSize,
    isDesktopSSize,
    isMobileSizeL,
    isMobileSizeS,
    size,
    widgetHeight,
  ]);

  return { width: windowWidth, height: widgetHeight };
}
