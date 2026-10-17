import { timingSafeEqual } from 'crypto';

import type { NextApiRequest, NextApiResponse } from 'next';

import { allowMethods } from '../../../lib/content/http';
import { refreshPrivateContent } from '../../../lib/content/privateContent';

interface RevalidateResponse {
  revalidated: true;
  sheetStatus: Content.SheetStatus;
}

function getProvidedSecret(req: NextApiRequest): string | undefined {
  const header = req.headers['x-revalidate-secret'];
  const headerValue = Array.isArray(header) ? header[0] : header;
  if (headerValue) return headerValue;

  const auth = req.headers.authorization;
  if (auth?.startsWith('Bearer ')) return auth.slice('Bearer '.length).trim();
  return undefined;
}

function secretsMatch(provided: string | undefined, expected: string) {
  if (provided == null) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Clears the private sheet cache and reloads it. Public JSON content needs a deploy. */
export default async function revalidate(
  req: NextApiRequest,
  res: NextApiResponse<RevalidateResponse | { error: string }>
) {
  res.setHeader('Cache-Control', 'no-store');
  if (!allowMethods(req, res, ['POST'])) return;

  const expected = process.env.CONTENT_REVALIDATE_SECRET;
  if (!expected || !secretsMatch(getProvidedSecret(req), expected)) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const sheetStatus = await refreshPrivateContent();
    res.status(200).json({ revalidated: true, sheetStatus });
  } catch (error) {
    console.error('[content] revalidate failed', error);
    res.status(503).json({ error: 'Content unavailable' });
  }
}
