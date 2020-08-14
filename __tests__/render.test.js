/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import gendiff from '..';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getPath = (fileName) => path.join(__dirname, '__fixtures__', fileName);

const expectedDiff = fs.readFileSync(getPath('diff.txt'), 'utf-8');
const expectedPlain = fs.readFileSync(getPath('plain.txt'), 'utf-8');
const expectedJSON = fs.readFileSync(getPath('json.txt'), 'utf-8');

test('JSON', () => {
  const pathBefore = getPath('first.json');
  const pathAfter = getPath('second.json');
  expect(gendiff(pathBefore, pathAfter, 'diff')).toEqual(expectedDiff);
  expect(gendiff(pathBefore, pathAfter, 'plain')).toEqual(expectedPlain);
  expect(gendiff(pathBefore, pathAfter, 'json')).toEqual(expectedJSON);
});

test('INI', () => {
  const pathBefore = getPath('first.ini');
  const pathAfter = getPath('second.ini');
  expect(gendiff(pathBefore, pathAfter, 'diff')).toEqual(expectedDiff);
  expect(gendiff(pathBefore, pathAfter, 'plain')).toEqual(expectedPlain);
  expect(gendiff(pathBefore, pathAfter, 'json')).toEqual(expectedJSON);
});

test('YML', () => {
  const pathBefore = getPath('first.yml');
  const pathAfter = getPath('second.yml');
  expect(gendiff(pathBefore, pathAfter, 'diff')).toEqual(expectedDiff);
  expect(gendiff(pathBefore, pathAfter, 'plain')).toEqual(expectedPlain);
  expect(gendiff(pathBefore, pathAfter, 'json')).toEqual(expectedJSON);
});
