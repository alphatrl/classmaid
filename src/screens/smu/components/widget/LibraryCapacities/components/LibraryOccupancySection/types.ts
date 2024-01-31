export type LibraryNames = 'lks' | 'kgc';

export interface LibraryData {
  key: LibraryNames;
  name: string;
  emoji: string;
  maxOccupancy: number;
  backgroundImage: LibraryBackgroundImage;
}

export interface LibraryOccupancyAPI {
  key: LibraryNames;
  currentOccupancy: number;
  maxOccupancy: number;
}

export interface LibraryBackgroundImage {
  pageUrl: string;
  fileUrl: string;
  attribution: {
    author: string;
    publishedDate: string;
    license: {
      type: string;
      externalUrl: string;
      additional: string;
    };
  };
}
