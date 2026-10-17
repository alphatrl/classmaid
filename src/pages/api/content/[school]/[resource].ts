import type { NextApiRequest, NextApiResponse } from 'next';

import {
  getSchoolContent,
  getSchoolLinks,
} from '../../../../lib/content/getContent';
import {
  allowMethods,
  firstQueryValue,
  setCacheHeaders,
} from '../../../../lib/content/http';
import { getSchoolConfig, toSchool } from '../../../../lib/content/schools';

type SchoolResponse =
  | Content.SchoolPayload
  | Content.School
  | Content.Section[]
  | Pick<Content.SchoolPayload, 'guides' | 'guidesStatus'>
  | Content.Links
  | Content.Meta
  | { error: string };

const RESOURCES = ['all', 'config', 'bookmarks', 'guides', 'links', 'meta'];

export default async function schoolResource(
  req: NextApiRequest,
  res: NextApiResponse<SchoolResponse>
) {
  if (!allowMethods(req, res, ['GET'])) return;

  const resource = firstQueryValue(req.query.resource);
  if (resource == null || !RESOURCES.includes(resource)) {
    res.status(404).json({ error: 'Unknown resource' });
    return;
  }

  const config = getSchoolConfig(firstQueryValue(req.query.school) ?? '');
  if (config == null) {
    res.status(404).json({ error: 'Unknown school' });
    return;
  }

  try {
    // Public resources come from the bundled JSON only
    if (resource === 'config') {
      setCacheHeaders(res);
      res.status(200).json(toSchool(config));
      return;
    }
    if (resource === 'bookmarks') {
      setCacheHeaders(res);
      res.status(200).json(config.bookmarks);
      return;
    }
    if (resource === 'links') {
      setCacheHeaders(res);
      res.status(200).json(getSchoolLinks(config.slug) ?? {});
      return;
    }

    // all, guides and meta include the guides sheet
    const content = await getSchoolContent(config.slug);
    if (content == null) {
      res.status(404).json({ error: 'Unknown school' });
      return;
    }
    setCacheHeaders(res);
    if (resource === 'guides') {
      res.status(200).json({
        guides: content.guides,
        guidesStatus: content.guidesStatus,
      });
    } else if (resource === 'meta') {
      res.status(200).json(content.meta);
    } else {
      res.status(200).json(content);
    }
  } catch (error) {
    console.error('[content] school resource failed', error);
    res.status(503).json({ error: 'Content unavailable' });
  }
}
