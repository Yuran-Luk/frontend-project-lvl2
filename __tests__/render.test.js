/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import ini from 'ini';
import yaml from 'js-yaml';
import render from '../src/formatters/render';
import parse from '../src/parsers';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getPath = (fileName) => path.join(__dirname, '__fixtures__', fileName);

const expectedDiff = fs.readFileSync(getPath('diff.txt'), 'utf-8');
const expectedPlain = fs.readFileSync(getPath('plain.txt'), 'utf-8');
const expectedJSON = fs.readFileSync(getPath('json.txt'), 'utf-8');

const beforeJ = JSON.parse(fs.readFileSync(getPath('first.json'), 'utf-8'));
const afterJ = JSON.parse(fs.readFileSync(getPath('second.json'), 'utf-8'));
const treeJ = parse(beforeJ, afterJ);

test('JSONdiff', () => {
  expect(render('diff')(treeJ)).toEqual(expectedDiff);
});

test('JSONplain', () => {
  expect(render('plain')(treeJ)).toEqual(expectedPlain);
});

const beforeI = ini.parse(fs.readFileSync(getPath('first.ini'), 'utf-8'));
const afterI = ini.parse(fs.readFileSync(getPath('second.ini'), 'utf-8'));
const treeI = parse(beforeI, afterI);

test('INIdiff', () => {
  expect(render('diff')(treeI)).toEqual(expectedDiff);
});

test('INIplain', () => {
  expect(render('plain')(treeI)).toEqual(expectedPlain);
});

const beforeY = yaml.safeLoad(fs.readFileSync(getPath('first.yml'), 'utf-8'));
const afterY = yaml.safeLoad(fs.readFileSync(getPath('second.yml'), 'utf-8'));
const treeY = parse(beforeY, afterY);

test('YMLdiff', () => {
  expect(render('diff')(treeY)).toEqual(expectedDiff);
});

test('YMLplain', () => {
  expect(render('plain')(treeY)).toEqual(expectedPlain);
});

test('JSONFormat', () => {
  expect(render('json')(treeY)).toEqual(expectedJSON);
});
