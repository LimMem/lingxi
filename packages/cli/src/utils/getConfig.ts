import { existsSync } from 'fs';
import { join } from 'path';
import { cwd } from './tool';
import winPath from './winPath';

const RC_FILES_SUFFIX = [
  '.ts',
  '.js'
];

const RC_FILENAME = "lingxirc"

export const getConfigFile = () => { 
  const suffix = RC_FILES_SUFFIX.find((suffix) => existsSync(winPath(join(cwd, `${RC_FILENAME}${suffix}`))));
  if (!suffix) {
    return null;
  }
  return winPath(join(cwd, `${RC_FILENAME}${suffix}`));
};