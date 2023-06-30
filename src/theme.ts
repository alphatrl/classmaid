import { createGlobalStyle, DefaultTheme } from 'styled-components';

export const LIGHT_THEME: DefaultTheme = {
  background: {
    background: '#FAFAFA',
    gradient: 'brightness(0.9)',
  },

  blur: {
    backgroundBackwards: 'rgba(224, 224, 224, 0.95)',
    background: 'rgba(250, 250, 250, 0.5)',
    blur: 'blur(2em)',
  },

  header: {
    color: '#FAFAFA',
  },

  primary: {
    blue: '#2B77EA',
  },

  icon: {
    background: '#f9f9f9',
    colorCustom: '#FAFAFA',
    color: '#444444',
    filter: 'initial',
  },

  calendar: {
    red: '#D74037',
    blue: '#17ACBE',
    green: '#43A047',
    textLight: '#FFFFFF',
    textDark: '#FFFFFF',
  },

  card: {
    overlay: 'rgba(0, 0, 0, 0.7)',
    background: '#FFFFFF',
  },

  tooltips: {
    background: '#313131',
    text: '#EEEEEE',
  },
  appColor: {
    0: '#000000',
    10: '#191919',
    20: '#333333',
    30: '#4c4c4c',
    40: '#666666',
    50: '#808080',
    60: '#999999',
    70: '#b3b3b3',
    80: '#cccccc',
    90: '#e6e6e6',
    100: '#ffffff',
  },
  textColor: {
    10: '#333333',
    20: '#666666',
    30: '#999999',
    40: '#cccccc',
    50: '#e5e5e5',
  },
  mobileSize: '820px',
};

export const DARK_THEME = {
  background: {
    background: '#111111',
    gradient: 'brightness(0.85)',
  },

  blur: {
    backgroundBackwards: 'rgba(51, 51, 51, 0.9)',
    background: 'rgba(51, 51, 51, 0.6)',
    blur: 'blur(2em)',
  },

  header: {
    color: '#111111',
  },

  primary: {
    blue: '#3bb7ff',
  },

  icon: {
    background: '#313131',
    colorCustom: '#EEEEEE',
    color: '#EEEEEE',
    filter: 'contrast(0.9)',
  },

  calendar: {
    red: '#D74037',
    blue: '#17ACBE',
    green: '#43A047',
    textLight: '#FFFFFF',
    textDark: '#FFFFFF',
  },

  card: {
    overlay: 'rgba(70, 70, 70, 0.8)',
    background: '#111111',
  },

  appColor: {
    0: '#ffffff',
    10: '#e6e6e6',
    20: '#cccccc',
    30: '#b3b3b3',
    40: '#999999',
    50: '#808080',
    60: '#666666',
    70: '#b3b3b3',
    80: '#4c4c4c',
    90: '#333333',
    100: '#000000',
  },
  textColor: {
    10: '#e5e5e5',
    20: '#cccccc',
    30: '#999999',
    40: '#666666',
    50: '#333333',
  },
  mobileSize: '820px',
};

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    margin: 0;
  }
`;
