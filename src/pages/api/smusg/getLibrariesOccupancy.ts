import type { NextApiRequest, NextApiResponse } from 'next';

type LibraryInfo = {
  enter: string;
  exit: string;
  inside: string;
};

export type LibraryOccupancy = {
  datetime: string;
  lks: LibraryInfo;
  kgc: LibraryInfo;
};

export default async function getLibrariesOccupancy(
  _: NextApiRequest,
  res: NextApiResponse<LibraryOccupancy>
) {
  const occupancyURL = process.env.SMU_LIBRARIES_OCCUPANCY_URL;

  if (occupancyURL == null) {
    res.status(503).end();
  } else {
    const occupancyRes = await fetch(occupancyURL);
    const occupancyJson = await occupancyRes.json();
    res.status(200).json(occupancyJson);
  }
}
