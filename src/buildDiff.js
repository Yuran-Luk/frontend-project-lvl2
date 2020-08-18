import _ from 'lodash';

const getNodeType = (value, other) => {
  if (!other) {
    return _.isObject(value) ? 'node' : 'leaf';
  }
  if (_.isObject(value) && !_.isObject(other)) {
    return 'node/leaf';
  }
  if (!_.isObject(value) && _.isObject(other)) {
    return 'leaf/node';
  }
  return 'leaf';
};

const diff = (before, after) => {
  const beforeKeys = _.keys(before);
  const afterKeys = _.keys(after);
  const keys = _.uniq([...beforeKeys, ...afterKeys]);
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
        node.children = diff(before[key], before[key]);
      } else {
        node.value = before[key];
      }
      return node;
    }
    if (!_.has(before, key)) {
      node.status = 'add';
      node.type = getNodeType(after[key]);
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
