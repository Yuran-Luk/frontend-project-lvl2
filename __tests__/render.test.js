/* eslint-disable no-underscore-dangle */
import { test, expect } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import gendiff from '..';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getPath = (fileName) => path.join(__dirname, '__fixtures__', fileName);

const expectedDiff = fs.readFileSync(getPath('diff.txt'), 'utf-8');

test('JSON', () => {
  const pathBefore = getPath('before.json');
  const pathAfter = getPath('after.json');
  expect(gendiff(pathBefore, pathAfter)).toEqual(expectedDiff);
});
