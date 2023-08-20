import React from 'react';
import styled from 'styled-components';

import { CardTemplate } from '../styled';
import AppGrid from './components/AppGrid';
import AppLibraryModal from './components/AppLibraryModal';
import useWidgetSize from '../../../../../shared/hooks/useWidgetSize';

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
  const [isAppLibraryOpen, setAppLibraryOpen] = React.useState(false);

  const widgetSize = useWidgetSize('large');
  const schoolApps = apps[0];

  const handleOpenAppLibrary = () => {
    setAppLibraryOpen(true);
  };

  const handleCloseAppLibrary = () => {
    setAppLibraryOpen(false);
  };

  return (
    <>
      <Card width={widgetSize.width} height={widgetSize.height}>
        <AppGrid homeApps={schoolApps} onOpenDrawer={handleOpenAppLibrary} />
      </Card>
      {isAppLibraryOpen && (
        <AppLibraryModal
          apps={apps}
          isOpen={isAppLibraryOpen}
          onClose={handleCloseAppLibrary}
        />
      )}
    </>
  );
};

export default AppLibrary;
