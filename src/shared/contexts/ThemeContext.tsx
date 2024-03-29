import React from 'react';
import { ThemeProvider as ThemeProviderDefault } from 'styled-components';

import { DARK_THEME, LIGHT_THEME } from '../../theme';

interface ThemeContextProps {
  theme: string;
  toggleTheme: () => void;
  componentMounted: boolean;
}

const ThemeProvider = React.createContext<ThemeContextProps>({
  theme: 'light',
  toggleTheme: () => {
    return;
  },
  componentMounted: false,
});

export const ThemeContext: React.FC<React.PropsWithChildren> = function (
  props
) {
  const { children } = props;
  const [userPreferences, setUserPreferences] = React.useState('light');
  const [componentMounted, setComponentMounted] = React.useState(false);

  React.useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    if (localTheme) {
      setUserPreferences(localTheme);
    } else {
      setUserPreferences('light');
    }
    setComponentMounted(true);
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem('theme', userPreferences);
  }, [userPreferences]);

  const theme = React.useMemo(() => {
    switch (userPreferences) {
      // case 'auto':
      //   break;
      case 'dark':
        return 'dark';
      default:
        return 'light';
    }
  }, [userPreferences]);

  const toggleTheme = React.useCallback(() => {
    if (theme === 'light') {
      setUserPreferences('dark');
    } else {
      setUserPreferences('light');
    }
  }, [theme]);

  const currentTheme = React.useMemo(() => {
    return theme === 'dark' ? DARK_THEME : LIGHT_THEME;
  }, [theme]);

  const sharedState = React.useMemo(
    () => ({ componentMounted, theme, toggleTheme }),
    [componentMounted, theme, toggleTheme]
  );

  return (
    <ThemeProvider.Provider value={sharedState}>
      <ThemeProviderDefault theme={currentTheme}>
        {children}
      </ThemeProviderDefault>
    </ThemeProvider.Provider>
  );
};

export const useThemeProvider = (): ThemeContextProps => {
  return React.useContext(ThemeProvider);
};
