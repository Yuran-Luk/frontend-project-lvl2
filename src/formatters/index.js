import diff from './diff.js';
import plain from './plain.js';
import jsonRender from './json.js';

export default (type) => {
  switch (type) {
    case 'diff':
      return diff;
    case 'plain':
      return plain;
    case 'json':
      return jsonRender;
    default:
      throw new Error(`Invalid type: ${type}`);
  }
};
