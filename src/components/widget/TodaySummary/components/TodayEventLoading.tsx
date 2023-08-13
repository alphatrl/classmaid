import React from 'react';
import ContentLoader from 'react-content-loader';
import { useTheme } from 'styled-components';

const TodayEventLoading: React.FC = function () {
  const theme = useTheme();
  return (
    <ContentLoader
      viewBox="0 0 230 64"
      style={{ width: '100%' }}
      backgroundColor={theme.text300}
      foregroundColor={theme.text600}
    >
      <rect width="150" height="30" />
      <rect width="200" height="30" y="34" />
    </ContentLoader>
  );
};

export default TodayEventLoading;
