/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import ini from 'ini';
import yaml from 'js-yaml';
import render from '../src/formatters/render';
import parse from '../src/parsers';

const expectedDiff = `{
     common: {
         setting1: Value 1
       - setting2: 200
       - setting3: true
       + setting3: {
             key: value
         }
       - setting6: {
             key: value
             doge: {
                 wow: too much
             }
         }
       + follow: false
       + setting5: {
             key5: value5
         }
     }
     group1: {
       - baz: bas
       + baz: bars
         foo: bar
       - nest: {
             key: value
         }
       + nest: str
     }
   + group3: {
         fee: 100500
         deep: {
             id: {
                 number: 45
             }
         }
     }
}`;

const expectedPlain = `Property 'common.setting2' was deleted
Property 'common.setting3' was updated from 'true' to '[complex value]'
Property 'common.setting6' was deleted
Property 'common.follow' was added with value: 'false'
Property 'common.setting5' was added with value: '[complex value]'
Property 'group1.baz' was updated from 'bas' to 'bars'
Property 'group1.nest' was updated from '[complex value]' to 'str'
Property 'group3' was added with value: '[complex value]'`;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getPath = (fileName) => path.join(__dirname, '__fixtures__', fileName);

const beforeJ = JSON.parse(fs.readFileSync(getPath('first.json'), 'utf-8'));
const afterJ = JSON.parse(fs.readFileSync(getPath('second.json'), 'utf-8'));
const treeJ = parse(beforeJ, afterJ);

test('JSONdiff', () => {
  expect(render('diff')(treeJ)).toEqual(expectedDiff);
});

test('JSONplain', () => {
  expect(render('plain')(treeJ)).toEqual(expectedPlain);
});

const beforeI = ini.parse(fs.readFileSync('/home/yuran/Projects/frontend-project-lvl2/__tests__/__fixtures__/first.ini', 'utf-8'));
const afterI = ini.parse(fs.readFileSync('/home/yuran/Projects/frontend-project-lvl2/__tests__/__fixtures__/second.ini', 'utf-8'));
const treeI = parse(beforeI, afterI);

test('INIdiff', () => {
  expect(render('diff')(treeI)).toEqual(expectedDiff);
});

test('INIplain', () => {
  expect(render('plain')(treeI)).toEqual(expectedPlain);
});

const beforeY = yaml.safeLoad(fs.readFileSync('/home/yuran/Projects/frontend-project-lvl2/__tests__/__fixtures__/first.yml'));
const afterY = yaml.safeLoad(fs.readFileSync('/home/yuran/Projects/frontend-project-lvl2/__tests__/__fixtures__/second.yml'));
const treeY = parse(beforeY, afterY);

test('YMLdiff', () => {
  expect(render('diff')(treeY)).toEqual(expectedDiff);
});

test('YMLplain', () => {
  expect(render('plain')(treeY)).toEqual(expectedPlain);
});
