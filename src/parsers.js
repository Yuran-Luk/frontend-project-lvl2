import _ from 'lodash';

const getNodeType = (value, other) => {
  const isNodeValue = _.isObject(value);
  const isNodeyOther = _.isObject(other);
  if (!other) {
    return isNodeValue ? 'node' : 'leaf';
  }
  if (isNodeValue && !isNodeyOther) {
    return 'node/leaf';
  }
  if (!isNodeValue && isNodeyOther) {
    return 'leaf/node';
  }
  return 'leaf';
};

const diff = (before, after) => {
  const keys = _.uniq([..._.keys(before), ..._.keys(after)]);
  const buildAst = keys.map((key) => {
    const node = {
      name: key,
      type: '',
      status: '',
    };
    if (!_.has(after, key)) {
      node.status = 'delete';
      node.type = getNodeType(before[key]);
      if (node.type === 'node') {
        node.children = diff(before[key], {});
      } else {
        node.value = before[key];
      }
      return node;
    }
    if (!_.has(before, key)) {
      node.status = 'add';
      node.type = getNodeType(after[key]);
      if (node.type === 'node') {
        node.children = diff({}, after[key]);
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
      node.type = getNodeType(after[key]);
      if (node.type === 'node') {
        node.children = diff({}, after[key]);
      } else {
        node.value = after[key];
      }
      return node;
    }
    node.status = 'updated';
    node.type = getNodeType(before[key], after[key]);
    node.beforeValue = getNodeType(before[key]) === 'node'
      ? diff(before[key], before[key]) : before[key];
    node.afterValue = getNodeType(after[key]) === 'leaf'
      ? after[key] : diff(after[key], after[key]);
    return node;
  });
  return buildAst;
};

export default diff;
