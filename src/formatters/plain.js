export default (diff) => {
  const iter = (nodes, path) => {
    const plainRender = nodes
      .filter((node) => node.status !== 'unchanged')
      .map((node) => {
        switch (node.status) {
          case 'updated':
            if (node.type === 'node') {
              return iter(node.children, `${path}${node.name}.`);
            }
            if (node.type === 'node/leaf') {
              return `Property '${path}${node.name}' was changed from '[complex value]' to '${node.afterValue}'`;
            }
            if (node.type === 'leaf/node') {
              return `Property '${path}${node.name}' was changed from '${node.beforeValue}' to '[complex value]'`;
            }
            return `Property '${path}${node.name}' was changed from ${node.beforeValue} to ${node.afterValue}`;
          case 'delete':
            return `Property '${path}${node.name}' was deleted`;
          case 'add':
            return `Property '${path}${node.name}' was added with value: '${node.type === 'leaf' ? node.value : '[complex value]'}'`;
          case 'parent':
            return iter(node.children, `${path}${node.name}.`);
          default:
            throw new Error(`Error! '${node.status}' is invalid in node ${node.name}`);
        }
      });
    return plainRender.join('\n');
  };
  return iter(diff, '');
};
