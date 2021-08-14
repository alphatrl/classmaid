export interface SoftwareProp {
  id: string;
  name: string;
  links: {
    id: string;
    title: string;
    link: string;
  }[];
}

export const SOFTWARE_LINKS = [
  {
    id: 'notetaking',
    name: 'Note-Taking',
    links: [
      {
        id: 'ms_onenote',
        title: 'Microsoft OneNote',
        link: 'https://site.onenote.com',
      },
      {
        id: 'notion',
        title: 'Notion',
        link: 'https://notion.so',
      },
      {
        id: 'taskade',
        title: 'Taskade',
        link: 'https://taskade.com',
      },
    ],
  },
  {
    id: 'presentation',
    name: 'Presentation',
    links: [
      {
        id: 'canva',
        title: 'Canva',
        link: 'https://www.canva.com',
      },
      {
        id: 'prezi',
        title: 'Prezi',
        link: 'https://www.prezi.com',
      },
      {
        id: 'google_slides',
        title: 'Google Slides',
        link: 'https://slides.google.com',
      },
      {
        id: 'ms_powerpoint',
        title: 'PowerPoint',
        link: 'https://www.office.com/launch/powerpoint',
      },
      {
        id: 'apple_keynote',
        title: 'Keynote',
        link: 'https://www.apple.com/sg/keynote/',
      },
      {
        id: 'slidesgo',
        title: 'Slidesgo',
        link: 'https://slidesgo.com',
      },
    ],
  },
  {
    id: 'survey',
    name: 'Survey',
    links: [
      {
        id: 'smu_qualtrics',
        title: 'SMU Qualtrics',
        link: 'https://smusg.au1.qualtrics.com',
      },
      {
        id: 'google_form',
        title: 'Google Forms',
        link: 'https://docs.google.com/forms',
      },
      {
        id: 'survey_monkey',
        title: 'SurveyMonkey',
        link: 'https://surveymonkey.com',
      },
    ],
  },
  {
    id: 'design',
    name: 'Design',
    links: [
      {
        id: 'figma',
        title: 'Figma',
        link: 'https://figma.com',
      },
      {
        id: 'flaticon',
        title: 'Flaticon',
        link: 'https://flaticon.com',
      },
      {
        id: 'google_icons',
        title: 'Material Icons',
        link: 'https://fonts.google.com/icons',
      },
      {
        id: 'unsplash',
        title: 'Unspash',
        link: 'https://unsplash.com',
      },
    ],
  },
  {
    id: 'video_conferencing',
    name: 'Video Conferencing',
    links: [
      {
        id: 'zoom',
        title: 'Zoom',
        link: 'https://smu-sg.zoom.us',
      },
      {
        id: 'ms_teams',
        title: 'Microsoft Teams',
        link: 'https://www.microsoft.com/en-sg/microsoft-teams/',
      },
      {
        id: 'webex',
        title: 'Webex',
        link: 'https://www.webex.com/downloads.html',
      },
      {
        id: 'google_meet',
        title: 'Google Meet',
        link: 'https://meet.google.com',
      },
    ],
  },
  {
    id: 'develop',
    name: 'Development',
    links: [
      {
        id: 'github_education',
        title: 'Github Education Pack',
        link: 'https://education.github.com',
      },
      {
        id: 'aws_educate',
        title: 'AWS Educate',
        link: 'https://aws.amazon.com/education/awseducate/',
      },
      {
        id: 'azure_students',
        title: 'Microsoft Azure for Students',
        link: 'https://azure.microsoft.com/en-us/free/students/',
      },
    ],
  },
  {
    id: 'store',
    name: 'Store',
    links: [
      {
        id: 'onthehub',
        title: 'SMU OnTheHub',
        link: 'https://smu-sg.onthehub.com',
      },
    ],
  },
];
