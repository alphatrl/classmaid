import classnames from 'classnames';
import React from 'react';

import { APPS_LIBRARY } from '../../../../../sources/smu/appsLibrary';
import { CardTemplate } from '../styled';
import AppGrid from './components/AppGrid';

const AppLibrary: React.FC = function () {
  const apps = APPS_LIBRARY;
  const schoolApps = apps[0];

  return (
    <CardTemplate
      className={classnames(
        'relative backface-hidden',
        'bg-white/25 dark:bg-black/25',
        'backdrop-blur-md backdrop-saturate-86',
        'flex items-center justify-center hover:scale-100'
      )}
    >
      <AppGrid homeApps={schoolApps} allApps={apps} />
    </CardTemplate>
  );
};

export default AppLibrary;
