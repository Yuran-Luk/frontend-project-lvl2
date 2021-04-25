import _ from 'lodash';

export default (diff, tabSize) => {
  const tab = _.repeat(' ', tabSize);

  const rendered = diff
    .map(({
      key,
      type,
      before,
      after,
    }) => {
      switch (type) {
        case 'delete':
          return `${tab}- ${key}: ${before}`;
        case 'add':
          return `${tab}+ ${key}: ${after}`;
        case 'unchanged':
          return `${tab}  ${key}: ${before}`;
        case 'updated':
          return [
            `${tab}- ${key}: ${before}`,
            `${tab}+ ${key}: ${after}`,
          ];
        default:
          return `Invalid node type ${key}`;
      }
    })
    .flat()
    .join('\n');

  return `{\n${rendered}\n}`;
};
