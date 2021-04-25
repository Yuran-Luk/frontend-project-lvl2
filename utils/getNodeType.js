export default (node1, node2) => {
  if (!node1) {
    return 'delete';
  }
  if (!node2) {
    return 'add';
  }
  return node1 === node2 ? 'unchanged' : 'updated';
};
