import type { NextPage } from 'next';
import React from 'react';
import { ResponsiveGridLayout, useContainerWidth } from 'react-grid-layout';
import styled from 'styled-components';

import AppLibrary from '../../screens/smu/components/widget/AppLibrary';
import LibraryCapacities from '../../screens/smu/components/widget/LibraryCapacities';
import TodaySummaryWidget from '../../screens/smu/components/widget/TodaySummary';
import DefaultLayout from '../../shared/components/layouts/DefaultLayout';
import {
  DESKTOP_WIDTH,
  MOBILE_WIDTH,
  WIDGET_HEIGHT,
} from '../../shared/themes/size';

const ContentWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
`;

const GridContainer = styled.div`
  width: 100%;
  max-width: ${DESKTOP_WIDTH}px;
  padding-top: 36px;
  padding-bottom: 64px;

  @media screen and (max-width: ${MOBILE_WIDTH - 1}px) {
    padding: 16px 0;
  }

  .react-grid-item {
    transition: all 0.2s ease;
  }
`;

const STATIC = { isDraggable: false, isResizable: false };

const APP_LAYOUT = {
  lg: [
    { i: 'today', x: 0, y: 0, w: 1, h: 1, ...STATIC },
    { i: 'apps', x: 1, y: 0, w: 1, h: 1, ...STATIC },
    { i: 'library', x: 0, y: 1, w: 2, h: 1, ...STATIC },
  ],
  sm: [
    { i: 'today', x: 0, y: 0, w: 1, h: 1, ...STATIC },
    { i: 'apps', x: 0, y: 1, w: 1, h: 1, ...STATIC },
    { i: 'library', x: 0, y: 2, w: 1, h: 1, ...STATIC },
  ],
};

const DashboardGrid: React.FC = function () {
  const { width, containerRef } = useContainerWidth();

  return (
    <GridContainer ref={containerRef as React.RefObject<HTMLDivElement>}>
      {width > 0 && (
        <ResponsiveGridLayout
          width={width}
          layouts={APP_LAYOUT}
          breakpoints={{ lg: MOBILE_WIDTH, sm: 0 }}
          cols={{ lg: 2, sm: 1 }}
          rowHeight={WIDGET_HEIGHT}
          margin={[16, 16]}
        >
          <div key="today">
            <TodaySummaryWidget />
          </div>
          <div key="apps">
            <AppLibrary />
          </div>
          <div key="library">
            <LibraryCapacities />
          </div>
        </ResponsiveGridLayout>
      )}
    </GridContainer>
  );
};

export const Home: NextPage = function () {
  return (
    <DefaultLayout title="SMU">
      <ContentWrapper>
        <DashboardGrid />
      </ContentWrapper>
    </DefaultLayout>
  );
};

export default Home;
