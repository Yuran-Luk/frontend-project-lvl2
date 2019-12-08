import _ from 'lodash';

const diffKeysActions = [
  {
    action: (key, after) => [[' ', key, after[key]]],
    check: (key, after, before) => (
      _.has(after, key) && before[key] === after[key]
    ),
  },
  {
    action: (key, after, before) => [
      ['-', key, before[key]],
      ['+', key, after[key]],
    ],
    check: (key, after) => _.has(after, key),
  },
];

const getDiffKeysAction = (key, after, before) => (
  diffKeysActions.find(({ check }) => check(key, after, before))
);

export default (before, after) => {
  const added = Object.keys(after)
    .filter((key) => !_.has(before, key))
    .map((key) => ['+', key, after[key]]);
  const deleted = Object.keys(before)
    .filter((key) => !_.has(after, key))
    .map((key) => ['-', key, before[key]]);
  return Object.keys(before)
    .filter((key) => _.has(after, key))
    .reduce((acc, key) => {
      const { action } = getDiffKeysAction(key, after, before);
      return [...action(key, after, before), ...acc];
    }, [...added, ...deleted]);
};
