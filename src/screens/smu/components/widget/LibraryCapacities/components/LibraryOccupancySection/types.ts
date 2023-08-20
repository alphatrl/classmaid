export type LibraryNames = 'lks' | 'kgc';

export interface LibraryData {
  name: string;
  emoji: string;
  maxOccupancy: number;
  backgroundImage: {
    pageUrl: string;
    fileUrl: string;
    attribution: {
      author: string;
      publishedDate: string;
      license: {
        type: string;
        externalUrl: string;
        additional?: string;
      };
    };
  };
}
