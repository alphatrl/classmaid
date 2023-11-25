import React from 'react';

export type MobileOS = 'android' | 'ios' | null;

const useMobileDevice = function () {
  const [mobileOS, setMobileOS] = React.useState<MobileOS>(null);

  React.useEffect(() => {
    setMobileOS(null);
    const userAgent = window.navigator.userAgent.toLowerCase();

    const isAndroid = /android/i.test(userAgent);
    if (isAndroid) {
      setMobileOS('android');
      return;
    }

    // check if iOS or iPadOS. As safari on iPadOS reports itself as macOS,
    // we will test for TouchPoint support instead
    const isIOS =
      /iphone|ipad|ipod/.test(userAgent) || // iOS or older iPadOS
      (/mac/.test(userAgent) && navigator.maxTouchPoints > 1); // >= iPadOS 13
    if (isIOS) {
      setMobileOS('ios');
    }
  }, []);

  const value = React.useMemo(() => {
    return {
      isMobile: mobileOS != null,
      mobileOS,
    };
  }, [mobileOS]);

  return value;
};

export default useMobileDevice;
