import _ from 'lodash';

const getNodeType = (value) => (_.isObject(value) ? 'node' : 'leaf');

const makeNodeActions = [
  {
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
    check: (beforeData, afterData) => !beforeData || !afterData,
    mkNode: (name, cb, beforeData, afterData) => {
      const status = !beforeData ? 'add' : 'delete';
      if (status === 'add') {
        const typeAfter = getNodeType(afterData);
        const afterDataType = typeAfter === 'node' ? 'children' : 'value';
        return {
          name,
          type: typeAfter,
          status: 'add',
          [afterDataType]: typeAfter === 'node' ? cb(afterData, afterData) : afterData,
        };
      }
      const typeBefore = getNodeType(beforeData);
      const dataType = typeBefore === 'node' ? 'children' : 'value';
      return {
        name,
        type: typeBefore,
        status: 'delete',
        [dataType]: typeBefore === 'node' ? cb(beforeData, beforeData) : beforeData,
      };
    },
  },
  {
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
