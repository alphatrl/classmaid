import React from 'react';
import ContentLoader from 'react-content-loader';
import { useTheme } from 'styled-components';

const LoadingCalendar: React.FC = () => {
  const theme = useTheme();
  return (
    <ContentLoader
      viewBox="0 0 400 56"
      style={{ width: '100%' }}
      backgroundColor={theme.calendar.red}
      foregroundColor={theme.calendar.red + '56'}
    >
      <rect width="400" height="52" y="4" rx="12" />
    </ContentLoader>
  );
};

export default LoadingCalendar;
