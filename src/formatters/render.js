import diff from './diff';
import plain from './plain';
import jsonRender from './jsonRend';

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
