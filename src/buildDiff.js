import _ from 'lodash';

const getNodeType = (value) => (_.isObject(value) ? 'node' : 'leaf');

const diff = (before, after) => {
  const beforeKeys = _.keys(before);
  const afterKeys = _.keys(after);
  const keys = _.union(beforeKeys, afterKeys);
  const buildAst = keys.map((key) => {
    const beforeType = getNodeType(before[key]);
    const afterType = getNodeType(after[key]);
    const node = {
      name: key,
      type: '',
      status: '',
    };
    if (!_.has(after, key)) {
      node.status = 'delete';
      node.type = beforeType;
      if (node.type === 'node') {
        node.children = diff(before[key], before[key]);
      } else {
        node.value = before[key];
      }
      return node;
    }
    if (!_.has(before, key)) {
      node.status = 'add';
      node.type = afterType;
      if (node.type === 'node') {
        node.children = diff(after[key], after[key]);
      } else {
        node.value = after[key];
      }
      return node;
    }
    if (_.isObject(before[key]) && _.isObject(after[key])) {
      node.status = _.isEqual(before[key], after[key]) ? 'unchanged' : 'updated';
      node.type = 'node';
      node.children = diff(before[key], after[key]);
      return node;
    }
    if (_.isEqual(before[key], after[key])) {
      node.status = 'unchanged';
      node.type = afterType;
      if (node.type === 'node') {
        node.children = diff({}, after[key]);
      } else {
        node.value = after[key];
      }
      return node;
    }
    node.status = 'updated';
    node.type = afterType === beforeType ? afterType
      : `${beforeType}/${afterType}`;
    node.beforeValue = getNodeType(before[key]) === 'node'
      ? diff(before[key], before[key]) : before[key];
    node.afterValue = getNodeType(after[key]) === 'leaf'
      ? after[key] : diff(after[key], after[key]);
    return node;
  });
  return buildAst;
};

export default diff;
