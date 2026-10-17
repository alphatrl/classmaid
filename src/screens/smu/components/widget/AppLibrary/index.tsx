import React from 'react';

import { selectHomeBookmarks } from '@/shared/contexts/content/state';
import { useContent } from '@/shared/contexts/ContentContext';

import AppGrid, { AppGridMessage, AppGridSkeleton } from './components/AppGrid';

const AppLibrary: React.FC = function () {
  const { bookmarks, loading, error } = useContent();
  const homeApps = React.useMemo(
    () => selectHomeBookmarks(bookmarks),
    [bookmarks]
  );

  if (loading) {
    return <AppGridSkeleton />;
  }

  if (error != null || bookmarks.length === 0) {
    return (
      <AppGridMessage>Bookmarks are unavailable right now.</AppGridMessage>
    );
  }

  return <AppGrid homeApps={homeApps} allApps={bookmarks} />;
};

export default AppLibrary;
