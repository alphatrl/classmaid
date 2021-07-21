import { createGlobalStyle, DefaultTheme } from 'styled-components';

export const LIGHT_THEME: DefaultTheme = {
  background: {
    background: '#FAFAFA',
    gradient: ' linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1))',
  },

  blur: {
    backgroundBackwards: 'rgba(224, 224, 224, 0.95)',
    background: 'rgba(250, 250, 250, 0.5)',
    blur: 'blur(2em)',
  },

  header: {
    color: '#E6BCAE',
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
    gradient: ' linear-gradient(0deg, rgba(0,0,0,0.2), rgba(0,0,0,0.35))',
  },

  blur: {
    backgroundBackwards: 'rgba(51, 51, 51, 0.9)',
    background: 'rgba(51, 51, 51, 0.6)',
    blur: 'blur(2em)',
  },

  header: {
    color: '#A88980',
  },

  primary: {
    blue: '#329AFA',
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
    background-image: ${(props) => props.theme.background.gradient},
      url(/images/wallpapers/wallpaper-1.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  }

  html {
    margin: 0;
  }
`;
