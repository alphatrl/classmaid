import type { NextApiRequest, NextApiResponse } from 'next';

export const CACHE_CONTROL =
  'public, s-maxage=300, stale-while-revalidate=3600';

export function setCacheHeaders<T>(res: NextApiResponse<T>): void {
  res.setHeader('Cache-Control', CACHE_CONTROL);
}

/** Returns true when the method is allowed; otherwise responds 405 and returns false. */
export function allowMethods(
  req: NextApiRequest,
  res: NextApiResponse<{ error: string }>,
  methods: string[]
): boolean {
  if (req.method != null && methods.includes(req.method)) {
    return true;
  }
  res.setHeader('Allow', methods.join(', '));
  res.status(405).json({ error: 'Method not allowed' });
  return false;
}

/** First value of a query param, trimmed and lowercased; undefined when absent or blank. */
export function firstQueryValue(
  value: string | string[] | undefined
): string | undefined {
  const first = Array.isArray(value) ? value[0] : value;
  const normalised = first?.trim().toLowerCase();
  return normalised ? normalised : undefined;
}
