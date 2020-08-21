import _ from 'lodash';

const getNodeType = (value) => (_.isObject(value) ? 'node' : 'leaf');

const makeNodeActions = [
  {
    status: 'unchanged',
    check: (beforeData, afterData) => _.isEqual(beforeData, afterData),
    mkNode: (name, cb, beforeData, afterData) => {
      const type = getNodeType(beforeData);
      const dataType = type === 'node' ? 'children' : 'value';
      return {
        name,
        type,
        status: 'unchanged',
        [dataType]: type === 'node' ? cb(beforeData, afterData) : beforeData,
      };
    },
  },
  {
    status: 'add',
    check: (beforeData, afterData) => !beforeData,
    mkNode: (name, cb, beforeData, afterData) => {
      const type = getNodeType(afterData);
      const dataType = type === 'node' ? 'children' : 'value';
      return {
        name,
        type,
        status: 'add',
        [dataType]: type === 'node' ? cb(afterData, afterData) : afterData,
      };
    },
  },
  {
    status: 'delete',
    check: (beforeData, afterData) => !afterData,
    mkNode: (name, cb, beforeData, afterData) => {
      const type = getNodeType(beforeData);
      const dataType = type === 'node' ? 'children' : 'value';
      return {
        name,
        type,
        status: 'delete',
        [dataType]: type === 'node' ? cb(beforeData, beforeData) : beforeData,
      };
    },
  },
  {
    status: 'updated',
    check: (beforeData, afterData) => !_.isEqual(beforeData, afterData),
    mkNode: (name, cb, beforeData, afterData) => {
      const beforeType = getNodeType(beforeData);
      const afterType = getNodeType(afterData);
      const type = afterType === beforeType ? afterType
        : `${beforeType}/${afterType}`;
      if (type === 'node') {
        const children = cb(beforeData, afterData);
        return {
          name, type, status: 'updated', children,
        };
      }
      const beforeValue = beforeType === 'node'
        ? cb(beforeData, beforeData) : beforeData;
      const afterValue = afterType === 'node'
        ? cb(afterData, afterData) : afterData;
      return {
        name, type, status: 'updated', beforeValue, afterValue,
      };
    },
  },
];

const diff = (before, after) => {
  const beforeKeys = _.keys(before);
  const afterKeys = _.keys(after);
  const keys = _.union(beforeKeys, afterKeys);
  const buildAst = keys.map((name) => {
    const beforeData = before[name];
    const afterData = after[name];
    const { mkNode } = makeNodeActions.find(({ check }) => check(beforeData, afterData));
    return mkNode(name, diff, beforeData, afterData);
  });
  return buildAst;
};

export default diff;
