import type { NextApiRequest, NextApiResponse } from 'next';

import {
  LibraryApiResponse,
  LibraryOccupancyAPI,
} from '../../../screens/smu/components/widget/LibraryCapacities/components/LibraryOccupancySection/types';

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
  const occupancyJson: LibraryApiResponse = await occupancyRes.json();
  if (!occupancyJson.success) {
    res.status(503).end();
    return;
  }

  const zones = occupancyJson.payload.zones;
  const lksZone = zones?.[20];
  const kgcZone = zones?.[27];

  const buildOccupancy: LibraryOccupancyAPI[] = [
    {
      key: 'lks',
      maxOccupancy: lksZone?.maxOccupancy ?? 1800,
      currentOccupancy: lksZone?.currentOccupancy ?? 0,
    },
    {
      key: 'kgc',
      maxOccupancy: kgcZone?.maxOccupancy ?? 500,
      currentOccupancy: kgcZone?.currentOccupancy ?? 0,
    },
  ];

  res.status(200).json(buildOccupancy);
}
