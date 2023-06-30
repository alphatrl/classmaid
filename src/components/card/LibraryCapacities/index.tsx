import React from 'react';
import styled from 'styled-components';

import { useDataContext } from '../../../contexts/DataContext';
import useMediaQuery from '../../../hooks/useMediaQuery';
import {
  DESKTOP_WIDTH_SIZE_M,
  DESKTOP_WIDTH_SIZE_S,
  MOBILE_WIDTH_SIZE_L,
  MOBILE_WIDTH_SIZE_S,
  WIDGET_L_WIDTH_SIZE_L,
  WIDGET_L_WIDTH_SIZE_S,
  WIDGET_S_WIDTH_SIZE_L,
  WIDGET_S_WIDTH_SIZE_S,
} from '../../../themes/size';
import { CardTemplate } from '../styled';
import SearchBar from './components/SearchBar';

const Card = styled(CardTemplate)``;

const LibraryCapacities: React.FC = function () {
  const isMobileSizeS = useMediaQuery(`(max-width: ${MOBILE_WIDTH_SIZE_S})`);
  const isMobileSizeL = useMediaQuery(`(max-width: ${MOBILE_WIDTH_SIZE_L})`);
  const isDesktopSSize = useMediaQuery(`(max-width: ${DESKTOP_WIDTH_SIZE_S})`);
  const isDesktopMSize = useMediaQuery(`(max-width: ${DESKTOP_WIDTH_SIZE_M})`);

  const widgetHeight = isMobileSizeL
    ? WIDGET_S_WIDTH_SIZE_S
    : WIDGET_S_WIDTH_SIZE_L;

  const widgetWidth = React.useMemo(() => {
    if (isMobileSizeL) {
      return WIDGET_S_WIDTH_SIZE_S;
    }

    if (isMobileSizeS || isDesktopSSize) {
      return WIDGET_S_WIDTH_SIZE_L;
    }

    if (isDesktopMSize) {
      return WIDGET_L_WIDTH_SIZE_S;
    }

    return WIDGET_L_WIDTH_SIZE_L;
  }, [isMobileSizeS, isMobileSizeL, isDesktopSSize, isDesktopMSize]);

  return (
    <Card width={widgetWidth} height={widgetHeight}>
      <SearchBar />
    </Card>
  );
};

export default LibraryCapacities;
