import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import parse from './src/parsers.js';
import getRender from './src/formatters/render.js';

const parseActions = [
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

const getParseAction = (pathToFile) => parseActions.find(({ check }) => check(pathToFile));

export default (pathBefore, pathAfter, format) => {
  if (path.extname(pathBefore) !== path.extname(pathAfter)) {
    return '!Err';
  }
  const { action } = getParseAction(pathBefore);
  const before = action(pathBefore);
  const after = action(pathAfter);
  const ast = parse(before, after);
  const render = getRender(format);
  return render(ast);
};
