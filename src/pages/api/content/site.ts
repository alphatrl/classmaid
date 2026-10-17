import type { NextApiRequest, NextApiResponse } from 'next';

import { getSiteContent } from '../../../lib/content/getContent';
import { allowMethods, setCacheHeaders } from '../../../lib/content/http';

export default function site(
  req: NextApiRequest,
  res: NextApiResponse<Content.SitePayload | { error: string }>
) {
  if (!allowMethods(req, res, ['GET'])) return;

  try {
    const result = getSiteContent();
    setCacheHeaders(res);
    res.status(200).json(result);
  } catch (error) {
    console.error('[content] /site failed', error);
    res.status(503).json({ error: 'Content unavailable' });
  }
}
