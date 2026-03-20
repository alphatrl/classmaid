import React from 'react';
import ContentLoader from 'react-content-loader';

const TodayEventLoading: React.FC = function () {
  return (
    <ContentLoader
      viewBox="0 0 230 64"
      style={{ width: '100%' }}
      backgroundColor="#999999"
      foregroundColor="#999999"
    >
      <rect width="150" height="30" />
      <rect width="200" height="30" y="34" />
    </ContentLoader>
  );
};

export default TodayEventLoading;
