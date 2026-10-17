import React from 'react';

function useMediaQuery(query: string): boolean {
  const subscribe = React.useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener('change', onChange);
      window.addEventListener('resize', onChange);
      return () => {
        media.removeEventListener('change', onChange);
        window.removeEventListener('resize', onChange);
      };
    },
    [query]
  );

  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}

export default useMediaQuery;
