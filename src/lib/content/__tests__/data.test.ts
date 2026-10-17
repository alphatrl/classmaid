import fs from 'fs';
import path from 'path';

import { describe, expect, it } from 'vitest';

import { SCHOOL_FILES } from '../schools';
import { validateSchoolConfig, validateSiteConfig } from '../validate';

const DATA_DIR = path.join(__dirname, '../../../../data');
const SCHOOLS_DIR = path.join(DATA_DIR, 'schools');

const readJson = (file: string): unknown =>
  JSON.parse(fs.readFileSync(file, 'utf8'));

const schoolFiles = fs
  .readdirSync(SCHOOLS_DIR)
  .filter((f) => f.endsWith('.json') && !f.endsWith('.schema.json'));

describe('data/schools', () => {
  it('has at least one school', () => {
    expect(schoolFiles.length).toBeGreaterThan(0);
  });

  it.each(schoolFiles)('%s is valid and named after its slug', (file) => {
    const slug = path.basename(file, '.json');
    const json = readJson(path.join(SCHOOLS_DIR, file)) as {
      $schema?: string;
    };
    expect(() => validateSchoolConfig(json, slug)).not.toThrow();
    expect(json.$schema).toBe('./school.schema.json');
  });

  it('registers every school file in schools.ts', () => {
    expect(Object.keys(SCHOOL_FILES).sort()).toEqual(
      schoolFiles.map((f) => path.basename(f, '.json')).sort()
    );
  });

  it('keeps guides out of the public JSON', () => {
    schoolFiles.forEach((file) => {
      const text = fs.readFileSync(path.join(SCHOOLS_DIR, file), 'utf8');
      expect(text).not.toMatch(/"guides(_note)?"\s*:/);
    });
  });
});

describe('data/site.json', () => {
  it('is valid', () => {
    const json = readJson(path.join(DATA_DIR, 'site.json'));
    expect(() => validateSiteConfig(json)).not.toThrow();
  });
});

describe('JSON Schemas', () => {
  it.each(['schools/school.schema.json', 'site.schema.json'])(
    '%s parses and requires every field the validator requires',
    (file) => {
      const schema = readJson(path.join(DATA_DIR, file)) as {
        required: string[];
        additionalProperties: boolean;
      };
      expect(schema.additionalProperties).toBe(false);
      expect(schema.required.length).toBeGreaterThan(0);
    }
  );
});
