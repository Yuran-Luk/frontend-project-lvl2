import fs from 'fs';
import _ from 'lodash';
import render from './src/render.js';

const getDiff = (obj1, obj2) => {
  const keys = Object.keys({ ...obj1, ...obj2 });
  const different = keys.map((key) => {
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return {
        key,
        type: 'add',
        after: obj2[key],
      };
    }
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return {
        key,
        type: 'delete',
        before: obj1[key],
      };
    }
    return {
      key,
      type: obj1[key] === obj2[key] ? 'unchanged' : 'updated',
      before: obj1[key],
      after: obj2[key],
    };
  });
  return different;
};

export default (filepath1, filepath2) => {
  const tabSize = 2;
  const firstFile = JSON.parse(fs.readFileSync(filepath1));
  const secondFile = JSON.parse(fs.readFileSync(filepath2));
  const filesDiff = getDiff(firstFile, secondFile);
  return render(filesDiff, tabSize);
};
