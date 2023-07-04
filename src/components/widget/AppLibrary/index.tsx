import React from 'react';
import styled from 'styled-components';

import useWidgetSize from '../../../hooks/useWidgetSize';
import { CardTemplate } from '../styled';
import { AppDrawerRef } from './components/AppDrawer';
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

interface Props {
  apps: App.AppLibrary.LibraryItem[];
}

const AppLibrary: React.FC<Props> = function (props) {
  const { apps } = props;
  // const dialogRef = React.useRef<AppDrawerRef>(null);

  const widgetSize = useWidgetSize('large');
  const schoolApps = apps[0];

  return (
    <Card width={widgetSize.width} height={widgetSize.height}>
      <AppGrid homeApps={schoolApps} />
      <AppLibrary apps={apps} />
    </Card>
  );
};

export default AppLibrary;
