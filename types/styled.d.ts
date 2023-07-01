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

    header: {
      color: string;
    };

    icon: {
      background: string;
      color: string;
      colorCustom: string;
      filter: string;
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

    tooltips: {
      background: string;
      text: string;
    };

    appColor: {
      0: string;
      10: string;
      20: string;
      30: string;
      40: string;
      50: string;
      60: string;
      70: string;
      80: string;
      90: string;
      100: string;
    };
    textColor: {
      10: string;
      20: string;
      30: string;
      40: string;
      50: string;
    };
    primary: {
      10: string;
      20: string;
      30: string;
      40: string;
      50: string;
    };
    success: string;
    warning: string;
    error: string;

    mobileSize: string;
  }
}
