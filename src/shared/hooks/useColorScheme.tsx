import React from 'react';

export default function useColorScheme() {
  const [mode, setMode] = React.useState<'dark' | 'light'>('light');

  React.useEffect(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        const colorScheme = event.matches ? 'dark' : 'light';
        setMode(colorScheme);
      });
  }, []);

  const values = React.useMemo(() => {
    return {
      dark: mode === 'dark',
    };
  }, [mode]);

  return values;
}
