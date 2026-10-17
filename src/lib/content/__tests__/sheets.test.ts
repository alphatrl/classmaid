import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  createSheetsClient,
  decodePrivateKey,
  getSheetsClient,
} from '../sheets';

const jwtCtor = vi.hoisted(() => vi.fn());

vi.mock('google-auth-library', () => ({
  JWT: class {
    constructor(opts: unknown) {
      jwtCtor(opts);
    }
    async getAccessToken() {
      return { token: 'tok-123' };
    }
  },
}));

const PEM = '-----BEGIN PRIVATE KEY-----\nabc\n-----END PRIVATE KEY-----\n';
const fetchMock = vi.fn();

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status });
}

describe('sheets client', () => {
  beforeEach(() => {
    fetchMock.mockReset();
    jwtCtor.mockReset();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it('lists tabs, ignores _ tabs, then makes one batchGet', async () => {
    fetchMock
      .mockResolvedValueOnce(
        jsonResponse({
          sheets: [
            { properties: { title: 'smu' } },
            { properties: { title: '_notes' } },
            { properties: { title: 'nus' } },
          ],
        })
      )
      .mockResolvedValueOnce(
        jsonResponse({
          valueRanges: [{ values: [['a', 1]] }, { values: [['b']] }],
        })
      );
    const client = createSheetsClient('a@b.c', PEM);
    const result = await client.fetchSpreadsheet('sheet2');
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[0][0]).toContain(
      'fields=sheets.properties.title'
    );
    const [batchUrl, init] = fetchMock.mock.calls[1];
    expect(batchUrl).toContain('/spreadsheets/sheet2/values:batchGet?');
    expect(batchUrl).toContain(`ranges=${encodeURIComponent("'smu'")}`);
    expect(batchUrl).not.toContain('_notes');
    expect(init.headers.Authorization).toBe('Bearer tok-123');
    expect(batchUrl.match(/ranges=/g)).toHaveLength(2);
    expect(result).toEqual({ smu: [['a', '1']], nus: [['b']] });
  });

  it('skips batchGet when there are no tabs', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ sheets: [] }));
    const client = createSheetsClient('a@b.c', PEM);
    expect(await client.fetchSpreadsheet('sheet2')).toEqual({});
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('throws on a non-2xx response', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({}, 403));
    const client = createSheetsClient('a@b.c', PEM);
    await expect(client.fetchSpreadsheet('sheet1')).rejects.toThrow('403');
  });

  it('getSheetsClient returns null without credentials', async () => {
    vi.stubEnv('GOOGLE_SERVICE_ACCOUNT_EMAIL', '');
    vi.stubEnv('GOOGLE_PRIVATE_KEY', '');
    expect(await getSheetsClient()).toBeNull();
  });

  it('getSheetsClient decodes a base64 key and memoises', async () => {
    vi.stubEnv('GOOGLE_SERVICE_ACCOUNT_EMAIL', 'svc@x.iam');
    vi.stubEnv('GOOGLE_PRIVATE_KEY', Buffer.from(PEM).toString('base64'));
    const a = await getSheetsClient();
    const b = await getSheetsClient();
    expect(a).not.toBeNull();
    expect(a).toBe(b);
    expect(jwtCtor).toHaveBeenCalledTimes(1);
    expect(jwtCtor.mock.calls[0][0]).toMatchObject({
      email: 'svc@x.iam',
      key: PEM,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
  });

  it('decodePrivateKey handles raw PEM and literal \\n', () => {
    expect(decodePrivateKey(PEM)).toBe(PEM.trim());
    expect(decodePrivateKey(PEM.trim().replace(/\n/g, '\\n'))).toBe(PEM.trim());
  });
});
