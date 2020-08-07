const toStringLeaf = (leaf, tab) => {
  switch (leaf.status) {
    case 'unchanged':
      return `  ${leaf.name}: ${leaf.value}`;
    case 'updated':
      return `- ${leaf.name}: ${leaf.beforeValue}\n${tab}+ ${leaf.name}: ${leaf.afterValue}`;
    case 'add':
      return `+ ${leaf.name}: ${leaf.value}`;
    case 'delete':
      return `- ${leaf.name}: ${leaf.value}`;
    default:
      throw new Error(`Error toStringLeaf! '${leaf.status}' is invalid in node ${leaf.name}`);
  }
};

const render = (diff) => {
  const iter = (nodes, tab) => {
    const stringDiff = nodes.map((node) => {
      switch (node.type) {
        case 'leaf':
          return `${tab}${toStringLeaf(node, tab)}`;
        case 'node':
          if (node.status === 'delete') {
            return `${tab}- ${node.name}: {\n${iter(node.children, `${tab}    `)}\n${tab}  }`;
          }
          if (node.status === 'add') {
            return `${tab}+ ${node.name}: {\n${iter(node.children, `${tab}    `)}\n${tab}  }`;
          }
          return `${tab}  ${node.name}: {\n${iter(node.children, `${tab}    `)}\n${tab}  }`;
        case 'node/leaf':
          return `${tab}- ${node.name}: {\n${iter(node.beforeValue, `${tab}    `)}\n${tab}  }\n${tab}+ ${node.name}: ${node.afterValue}`;
        case 'leaf/node':
          return `${tab}- ${node.name}: ${node.beforeValue}\n${tab}+ ${node.name}: {\n${iter(node.afterValue, `${tab}    `)}\n${tab}  }`;
        default:
          throw new Error(`Render ERR! '${node.type}' is invalid in node ${node.name}`);
      }
    });
    return stringDiff.join('\n');
  };
  return `{\n${iter(diff, '   ')}\n}`;
};

export default render;
