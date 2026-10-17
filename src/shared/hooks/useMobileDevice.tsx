import React from 'react';

export type MobileOS = 'android' | 'ios' | null;

// The user agent never changes during a session, so there is nothing to subscribe to.
const subscribe = () => () => {};

const getMobileOS = (): MobileOS => {
  const userAgent = window.navigator.userAgent.toLowerCase();

  const isAndroid = /android/i.test(userAgent);
  if (isAndroid) {
    return 'android';
  }

  // check if iOS or iPadOS. As safari on iPadOS reports itself as macOS,
  // we will test for TouchPoint support instead
  const isIOS =
    /iphone|ipad|ipod/.test(userAgent) || // iOS or older iPadOS
    (/mac/.test(userAgent) && navigator.maxTouchPoints > 1); // >= iPadOS 13
  if (isIOS) {
    return 'ios';
  }

  return null;
};

const getServerMobileOS = (): MobileOS => null;

const useMobileDevice = function () {
  const mobileOS = React.useSyncExternalStore(
    subscribe,
    getMobileOS,
    getServerMobileOS
  );

  const value = React.useMemo(() => {
    return {
      isMobile: mobileOS != null,
      mobileOS,
    };
  }, [mobileOS]);

  return value;
};

export default useMobileDevice;
