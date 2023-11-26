import React from 'react';
import styled from 'styled-components';

import useWidgetSize from '../../../../../shared/hooks/useWidgetSize';
import { APPS_LIBRARY } from '../../../../../sources/smu/appsLibrary';
import { CardTemplate } from '../styled';
import AppGrid from './components/AppGrid';

const Card = styled(CardTemplate)`
  position: relative;
  background-color: ${(props) => `${props.theme.appColor[100]}42`};
  backdrop-filter: blur(12px) saturate(86%);
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    transform: none;
  }
`;

const AppLibrary: React.FC = function () {
  const apps = APPS_LIBRARY;
  const widgetSize = useWidgetSize('large');
  const schoolApps = apps[0];

  return (
    <Card width={widgetSize.width} height={widgetSize.height}>
      <AppGrid homeApps={schoolApps} allApps={apps} />
    </Card>
  );
};

export default AppLibrary;
