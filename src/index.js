import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import parse from './parsers';
import render from './utils';

const parsers = [
  {
    action: (pathToFile) => JSON.parse(fs.readFileSync(pathToFile)),
    check: (pathToFile) => path.extname(pathToFile) === '.json',
  },
  {
    action: (pathToFile) => yaml.safeLoad(fs.readFileSync(pathToFile)),
    check: (pathToFile) => path.extname(pathToFile) === '.yml',
  },
  {
    action: (pathToFile) => ini.parse(fs.readFileSync(pathToFile, 'utf-8')),
    check: (pathToFile) => path.extname(pathToFile) === '.ini',
  },
];

const getParseAction = (pathToFile) => parsers.find(({ check }) => check(pathToFile));

export default (pathBefore, pathAfter) => {
  if (path.extname(pathBefore) !== path.extname(pathAfter)) {
    return '!Err';
  }
  const { action } = getParseAction(pathBefore);
  const before = action(pathBefore);
  const after = action(pathAfter);
  const ast = parse(before, after);
  return render(ast);
};
