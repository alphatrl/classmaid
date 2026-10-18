import { useRouter } from 'next/router';
import React from 'react';

import {
  contentKey,
  contentReducer,
  ContentValue,
  getSchoolSlugFromPath,
  INITIAL_CONTENT_STATE,
  isFeatureEnabled,
  selectContent,
} from './content/state';

const ContentContext = React.createContext<ContentValue>(
  selectContent(INITIAL_CONTENT_STATE, null)
);

/**
 * Fetches `/api/content/<school>/all` for the school in the URL ("/smu/..."),
 * or `/api/content/site` on pages without a school segment.
 */
export const ContentWrapper: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props;
  const { pathname } = useRouter();
  const slug = getSchoolSlugFromPath(pathname ?? '/');

  const [state, dispatch] = React.useReducer(
    contentReducer,
    INITIAL_CONTENT_STATE
  );

  React.useEffect(() => {
    const key = contentKey(slug);
    const controller = new AbortController();
    let ignore = false;

    fetch(key, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
      })
      .then((payload) => {
        if (!ignore) dispatch({ type: 'success', key, payload });
      })
      .catch((error: unknown) => {
        if (ignore) return;
        const message = error instanceof Error ? error.message : String(error);
        console.error('[content]', key, message);
        dispatch({ type: 'failure', key, error: message });
      });

    return () => {
      ignore = true;
      controller.abort();
    };
  }, [slug]);

  const value = React.useMemo(() => selectContent(state, slug), [state, slug]);

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
};

export const useContent = (): ContentValue => {
  return React.useContext(ContentContext);
};

/** Whether a school feature is on (true while the payload is unknown). */
export const useFeature = (feature: string): boolean => {
  const { features } = useContent();
  return isFeatureEnabled(features, feature);
};
