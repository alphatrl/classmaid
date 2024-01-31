import type { NextApiRequest, NextApiResponse } from 'next';

import { LibraryOccupancyAPI } from '../../../screens/smu/components/widget/LibraryCapacities/components/LibraryOccupancySection/types';

// NOTE: (hello@amostan.me) This is a subset of the data returned from the api
interface Zone {
  name: string;
  locationName: string;
  currentOccupancy: number;
  maxOccupancy: number;
}

// NOTE: (hello@amostan.me) The API request returns the typo
const LIBRARY_KEYS = [
  'LKS BUIDLING COUNT',
  'LKS BUILDING COUNT',
  'KGC BUILDING COUNT',
];

export default async function getLibrariesOccupancy(
  _: NextApiRequest,
  res: NextApiResponse<LibraryOccupancyAPI[]>
) {
  const occupancyURL = process.env.SMU_LIBRARIES_OCCUPANCY_URL;

  if (occupancyURL == null) {
    res.status(503).end();
    return;
  }

  const occupancyRes = await fetch(occupancyURL, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.SMU_LIBRARIES_OCCUPANCY_API_KEY || '',
    },
  });

  // NOTE: (hello@amostan.me) Retrieve and rebuild occupancy data
  const occupancyJson = await occupancyRes.json();
  const zones: Zone[] = occupancyJson?.payload?.zones ?? [];
  const filteredZones = zones.filter((zone) => {
    return LIBRARY_KEYS.includes(zone.name);
  });

  const lksZone = filteredZones.find((zone) =>
    zone.name.includes('lks'.toUpperCase())
  );

  const kgcZone = filteredZones.find((zone) =>
    zone.name.includes('kgc'.toUpperCase())
  );

  const buildOccupancy: LibraryOccupancyAPI[] = [];

  buildOccupancy.push({
    key: 'lks',
    maxOccupancy: lksZone?.maxOccupancy ?? 1800,
    currentOccupancy: lksZone?.currentOccupancy ?? 0,
  });

  buildOccupancy.push({
    key: 'kgc',
    maxOccupancy: kgcZone?.maxOccupancy ?? 500,
    currentOccupancy: kgcZone?.currentOccupancy ?? 0,
  });

  res.status(200).json(buildOccupancy);
}
