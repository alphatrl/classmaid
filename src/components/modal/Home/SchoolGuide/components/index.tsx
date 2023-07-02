type TABS = {
  [key: string]: string;
};

export { default as SchoolSurvival } from './SchoolSurvival';
export { default as SoftwareGuide } from './SoftwareGuide';
export { default as WelcomeGuide } from './WelcomeGuide';

export const AVAILABLE_TABS: TABS = {
  daily: 'Daily',
  welcome: 'Newcomers',
  software: 'Software',
};
