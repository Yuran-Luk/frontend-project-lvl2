import path from 'path';
import parse from './src/parser.js';
import getRender from './src/formatters/index.js';
import buildDiff from './src/buildDiff.js';

export default (pathBefore, pathAfter, format) => {
  const beforeExt = path.extname(pathBefore);
  const afterExt = path.extname(pathAfter);
  if (beforeExt !== afterExt) {
    throw new Error('Different file extensions');
  }
  const before = parse(beforeExt, pathBefore);
  const after = parse(afterExt, pathAfter);
  const diff = buildDiff(before, after);
  const render = getRender(format);
  return render(diff);
};
