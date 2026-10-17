import React from 'react';

import { APPS_LIBRARY } from '@/sources/smu/appsLibrary';

import AppGrid from './components/AppGrid';

const AppLibrary: React.FC = function () {
  const apps = APPS_LIBRARY;
  const schoolApps = apps[0];

  return <AppGrid homeApps={schoolApps} allApps={apps} />;
};

export default AppLibrary;
