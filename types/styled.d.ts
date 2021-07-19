import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    background: {
      background: string;
      gradient: string;
    };

    blur: {
      backgroundBackwards: string;
      background: string;
      blur: string;
    };

    primary: {
      blue: string;
    };

    icon: {
      background: string;
      color: string;
    };

    calendar: {
      red: string;
      blue: string;
      green: string;
      textLight: string;
      textDark: string;
    };

    card: {
      overlay: string;
      background: string;
    };

    text900: string;
    text600: string;
    text300: string;
    textError: string;

    mobileSize: string;
  }
}
