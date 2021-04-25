import fs from 'fs';
import yaml from 'js-yaml';

export default (extname, pathToFile) => {
  switch (extname) {
    case '.json':
      return JSON.parse(fs.readFileSync(pathToFile));
    case '.yml':
      return yaml.safeLoad(fs.readFileSync(pathToFile));
    default:
      throw new Error(`Invalid file extension: ${pathToFile}`);
  }
};
