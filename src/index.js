import _ from 'lodash';

const diff = (before, after) => {
  const deleted = Object.entries(before)
    .filter(([key]) => !_.has(after, key))
    .map(([key, value]) => `- ${key}: ${value}`);

  const added = Object.entries(after)
    .filter(([key]) => !_.has(before, key))
    .map(([key, value]) => `+ ${key}: ${value}`);

  const di = Object.entries(after)
    .filter(([key]) => _.has(before, key))
    .reduce((acc, [key, value]) => {
      const newAcc = value === before[key] ? acc
        : [...acc, `- ${key}: ${before[key]}`, `+ ${key}: ${value}`];
      return newAcc;
    }, []);
  return [...di, ...added, ...deleted].join('\n');
};

export default diff;
