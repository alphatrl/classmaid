import React from 'react';

const THEME_STORAGE_KEY = 'classmaid-theme';
const THEMES = ['blue', 'red', 'emerald', 'pink'] as const;
type Theme = (typeof THEMES)[number];
const DEFAULT_THEME: Theme = 'blue';

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: readonly Theme[];
}

const ThemeContext = React.createContext<ThemeContextProps>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
  themes: THEMES,
});

export const ThemeWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [theme, setThemeState] = React.useState<Theme>(DEFAULT_THEME);

  React.useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored && THEMES.includes(stored as Theme)) {
      setThemeState(stored as Theme);
      document.documentElement.setAttribute('data-theme', stored);
    } else {
      document.documentElement.setAttribute('data-theme', DEFAULT_THEME);
    }
  }, []);

  const setTheme = React.useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }, []);

  const value = React.useMemo(
    () => ({ theme, setTheme, themes: THEMES }),
    [theme, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  return React.useContext(ThemeContext);
};
