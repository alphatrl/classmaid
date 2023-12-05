import React from 'react';

import {
  WIDGET_HEIGHT,
  WIDGET_WIDTH_RECTANGLE,
  WIDGET_WIDTH_SQUARE,
} from '../themes/size';
import useScreenSize from './useScreenSize';

type Size = 'small' | 'large';

interface WidgetSize {
  width: number;
  height: number;
}

export default function useWidgetSize(size: Size): WidgetSize {
  const { isTablet, isDesktop } = useScreenSize();

  const windowWidth = React.useMemo(() => {
    if (size === 'small') {
      return WIDGET_WIDTH_SQUARE;
    }

    if (isTablet) {
      return WIDGET_WIDTH_SQUARE;
    }

    if (isDesktop) {
      return WIDGET_WIDTH_RECTANGLE;
    }

    return WIDGET_WIDTH_SQUARE;
  }, [isDesktop, isTablet, size]);

  const values = React.useMemo(() => {
    return {
      width: windowWidth,
      height: WIDGET_HEIGHT,
    };
  }, [windowWidth]);

  return values;
}
