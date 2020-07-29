import diff from './diff';
import plain from './plain';

export default (type) => {
  switch (type) {
    case 'diff':
      return diff;
    case 'plain':
      return plain;
    default:
      throw new Error(`Invalid type: ${type}`);
  }
};
