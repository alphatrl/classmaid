import React from 'react';

import {
  DESKTOP_MEDIA_QUERY,
  MOBILE_MEDIA_QUERY,
  TABLET_MEDIA_QUERY,
} from '../themes/size';
import useMediaQuery from './useMediaQuery';

export default function useScreenSize() {
  const isMobile = useMediaQuery(MOBILE_MEDIA_QUERY);
  const isTablet = useMediaQuery(TABLET_MEDIA_QUERY);
  const isDesktop = useMediaQuery(DESKTOP_MEDIA_QUERY);

  const values = React.useMemo(() => {
    return {
      isMobile,
      isTablet,
      isDesktop,
    };
  }, [isDesktop, isMobile, isTablet]);

  return values;
}
