import fs from 'fs';
import ini from 'ini';
import yaml from 'js-yaml';
import render from '../src/formatters/render';
import parse from '../src/parsers';


const beforeJ = JSON.parse(fs.readFileSync('/home/yuran/Projects/frontend-project-lvl2/__tests__/__fixtures__/first.json'));
const afterJ = JSON.parse(fs.readFileSync('/home/yuran/Projects/frontend-project-lvl2/__tests__/__fixtures__/second.json'));
const treeJ = parse(beforeJ, afterJ);

test('JSONdiff', () => {
  expect(render('diff')(treeJ)).toEqual(`{
   a: {
    -a1: 38
    +a1: 40
     a2: 33
    -a3: 36
    +a3: 38
    -a4: 33
    +a4: {
       a41: 4
       a42: 6
     }
   }
  -b: {
     b1: 26
     b2: 22
   }
  +b: 99
  -c: 77
   k: {
     k1: 26
     k2: 22
   }
   r: {
     r1: 26
     r2: {
      -ra: 4
      +ra: 8
      -rb: 2
     }
   }
   t: 50
  +p: 46
}`);
});

test('JSONplain', () => {
  expect(render('plain')(treeJ)).toEqual(`Property 'a.a1' was updated from '38' to '40'
Property 'a.a3' was updated from '36' to '38'
Property 'a.a4' was updated from '33' to '[complex value]'
Property 'b' was updated from '[complex value]' to '99'
Property 'c' was deleted
Property 'r.r2.ra' was updated from '4' to '8'
Property 'r.r2.rb' was deleted
Property 'p' was added with value: '46'`);
});

const beforeI = ini.parse(fs.readFileSync('/home/yuran/Projects/frontend-project-lvl2/__tests__/__fixtures__/first.ini', 'utf-8'));
const afterI = ini.parse(fs.readFileSync('/home/yuran/Projects/frontend-project-lvl2/__tests__/__fixtures__/second.ini', 'utf-8'));
const treeI = parse(beforeI, afterI);

test('INIdiff', () => {
  expect(render('diff')(treeI)).toEqual(`{
   group: {
    -first: 777
    +first: Value
     second: none
     third: {
      -name: Iten
      +name: Donald
       mail: true
     }
   }
   iter: {
    -key: undefined
    +key: 561
     garage: {
      -lamborgini: aventador
      +lamborgini: huracan
      +ferrari: pista
     }
    +type: true
   }
}`);
});

test('INIplain', () => {
  expect(render('plain')(treeI)).toEqual(`Property 'group.first' was updated from '777' to 'Value'
Property 'group.third.name' was updated from 'Iten' to 'Donald'
Property 'iter.key' was updated from 'undefined' to '561'
Property 'iter.garage.lamborgini' was updated from 'aventador' to 'huracan'
Property 'iter.garage.ferrari' was added with value: 'pista'
Property 'iter.type' was added with value: 'true'`);
});

const beforeY = yaml.safeLoad(fs.readFileSync('/home/yuran/Projects/frontend-project-lvl2/__tests__/__fixtures__/first.yml'));
const afterY = yaml.safeLoad(fs.readFileSync('/home/yuran/Projects/frontend-project-lvl2/__tests__/__fixtures__/second.yml'));
const treeY = parse(beforeY, afterY);

test('YML', () => {
  expect(render('plain')(treeY)).toEqual(`Property 'common.setting1' was updated from '22' to '21'
Property 'common.setting2' was updated from 'red' to 'blue'
Property 'common.setting6.anotherkey' was added with value: 'anothervalue'
Property 'group1.local' was updated from 'city' to 'airport'
Property 'group3' was deleted`);
});
