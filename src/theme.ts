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

  text900: '#333333',
  text600: '#666666',
  text300: '#999999',
  textError: '#e6180b',

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
    overlay: 'rgba(34, 34, 34, 0.7)',
    background: '#111111',
  },

  text900: '#FFFFFF',
  text600: '#DDDDDD',
  text300: '#BBBBBB',
  textError: '#e6180b',

  mobileSize: '820px',
};

export const GlobalStyle = createGlobalStyle`
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
