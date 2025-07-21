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

export interface LibraryApiResponse {
  success: boolean;
  message: string;
  payload: LibraryApiPayload;
}

export interface LibraryApiPayload {
  zones: LibraryApiZone[];
}

export interface LibraryApiZone {
  id: string;
  tenantId: string;
  locationId: string;
  parentZoneId: string | null;
  name: string;
  currentOccupancy: number;
  maxOccupancy: number;
  zoneTypeId: number;
  privateName: string | null;
  showOnDashboard: boolean;
  includeInLocationCount: boolean;
  enterCorrectionInterval: number;
  exitCorrectionInterval: number;
  subscriptionId: string;
  subscriptionShortName: string;
  locationName: string;
  tenantName: string;
  alarmEnabled: boolean;
  status: any[];
  zoneDataTypes: string[];
}
