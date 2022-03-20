import { join } from 'path';
import fs from 'fs';
import winPath from './winPath'
import defaultConfig from '../build/defaultConfig';
import { getConfigFile } from './getConfig'
import { cwd } from './tool';
import { GetConfigOptsFunction } from '..';

/**
 * 获取用户配置
 * @returns 用户配置
 */
export const getConfigOpts: GetConfigOptsFunction = () => { 
  const path = getConfigFile();
  if (!path) {
    return defaultConfig;
  }
  const userConfig = require(path) || {};
  return {
    ...defaultConfig,
    ...userConfig
  }
};

/**
 * 库目标绝对路径
 */
export const targetAbsolutePaths = () => { 
  const { libraryDir } = getConfigOpts();
  let target = libraryDir as string[];
  if (typeof libraryDir === 'string') {
    target = [libraryDir];
  }
  return target.map(dirName => winPath(join(cwd, dirName)));
};

/**
 * 输出文件夹
 */
export const outputPathAbsolutePath = winPath(
  join(cwd, getConfigOpts().outputDir)
);

/**
 * 放弃编译的文件夹
 */
export const excludeDirAbsolutePaths = (getConfigOpts().exclude || []).map(exc => winPath(
  join(cwd, exc)
));

/**
 * tsconfig.json 路径
 */
export const tsconfigPath = fs.existsSync(winPath(join(cwd, 'tsconfig.json'))) ? winPath(join(cwd, 'tsconfig.json')) : null;

/**
 * pkg路径
 */
export const pkgPath = winPath(join(cwd, 'package.json'));

/**
 * pkg信息
 */
export const pkgInfo = require(pkgPath);