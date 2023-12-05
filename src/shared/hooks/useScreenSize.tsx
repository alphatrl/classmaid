import React from 'react';

import {
  desktopMediaQuery,
  mobileMediaQuery,
  tabletMediaQuery,
} from '../themes/size';
import useMediaQuery from './useMediaQuery';

export default function useScreenSize() {
  const isMobile = useMediaQuery(mobileMediaQuery);
  const isTablet = useMediaQuery(tabletMediaQuery);
  const isDesktop = useMediaQuery(desktopMediaQuery);

  const values = React.useMemo(() => {
    return {
      isMobile,
      isTablet,
      isDesktop,
    };
  }, [isDesktop, isMobile, isTablet]);

  return values;
}
