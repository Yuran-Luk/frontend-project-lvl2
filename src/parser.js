import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';

export default (extname, pathToFile) => {
  switch (extname) {
    case '.json':
      return JSON.parse(fs.readFileSync(pathToFile));
    case '.yml':
      return yaml.safeLoad(fs.readFileSync(pathToFile));
    case '.ini':
      return ini.parse(fs.readFileSync(pathToFile, 'utf-8'));
    default:
      throw new Error(`Invalid file extension: ${pathToFile}`);
  }
};
