import { LibraryData, LibraryNames } from './types';

export const SMU_LIBRARIES: Record<LibraryNames, LibraryData> = {
  lks: {
    name: 'Li Ka Shing Library',
    emoji: '📚',
    maxOccupancy: 1800,
    backgroundImage: {
      pageUrl:
        'https://commons.wikimedia.org/wiki/File:Singapore_Management_University_-_Li_Ka_Shing_Library.jpg',
      fileUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Singapore_Management_University_-_Li_Ka_Shing_Library.jpg/640px-Singapore_Management_University_-_Li_Ka_Shing_Library.jpg',
      attribution: {
        author: 'Hong Huazheng',
        publishedDate: '10 November 2018',
        license: {
          type: 'CC BY-SA 4.0',
          externalUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
          additional: 'via Wikimedia Commons',
        },
      },
    },
  },
  kgc: {
    name: 'Kwa Geok Choo Law Library',
    emoji: '🧑‍⚖️',
    maxOccupancy: 500,
    backgroundImage: {
      pageUrl:
        'https://commons.wikimedia.org/wiki/File:Kwa_Geok_Choo_Law_Library,_School_of_Law,_Singapore_Management_University,_at_night_-_20170107-01.jpg',
      fileUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Kwa_Geok_Choo_Law_Library%2C_School_of_Law%2C_Singapore_Management_University%2C_at_night_-_20170107-01.jpg/640px-Kwa_Geok_Choo_Law_Library%2C_School_of_Law%2C_Singapore_Management_University%2C_at_night_-_20170107-01.jpg',
      attribution: {
        author: 'Smuconlaw',
        publishedDate: '7 January 2017',
        license: {
          type: 'CC BY-SA 4.0',
          externalUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
          additional: 'via Wikimedia Commons',
        },
      },
    },
  },
};
