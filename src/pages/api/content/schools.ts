import type { NextApiRequest, NextApiResponse } from 'next';

import { getSchools } from '../../../lib/content/getContent';
import { allowMethods, setCacheHeaders } from '../../../lib/content/http';

export default function schools(
  req: NextApiRequest,
  res: NextApiResponse<Content.School[] | { error: string }>
) {
  if (!allowMethods(req, res, ['GET'])) return;

  try {
    const result = getSchools();
    setCacheHeaders(res);
    res.status(200).json(result);
  } catch (error) {
    console.error('[content] /schools failed', error);
    res.status(503).json({ error: 'Content unavailable' });
  }
}
