import React from 'react';
import styled from 'styled-components';

import useWidgetSize from '../../../hooks/useWidgetSize';
import { CardTemplate } from '../styled';

const Card = styled(CardTemplate)`
  padding: 0;
  background-color: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(12px) saturate(86%);
`;

interface Props {
  appLibrary: App.AppLibrary.LibraryItem[];
}

const AppLibrary: React.FC<Props> = function (props) {
  const { appLibrary } = props;
  const widgetSize = useWidgetSize('large');

  return <Card width={widgetSize.width} height={widgetSize.height}></Card>;
};

export default AppLibrary;
