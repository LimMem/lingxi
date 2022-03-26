import { join } from 'path';
import fs from 'fs';
import winPath from './winPath'
import defaultConfig from '../build/defaultConfig';
import { getConfigFile } from './getConfig'
import { cwd } from './tool';
import { GetConfigOptsFunction } from '..';
import { requireOrImport } from '@lingxiteam/utils';

/**
 * 获取用户配置
 * @returns 用户配置
 */
export const getConfigOpts: GetConfigOptsFunction = async () => {
  const path = getConfigFile();
  if (!path) {
    return defaultConfig;
  }
  // TODO: 后续支持config es导入。暂时不作处理
  const userConfig = await requireOrImport(path) || {};
  return {
    ...defaultConfig,
    ...userConfig
  }
};

/**
 * 库目标绝对路径
 */
export const targetAbsolutePaths = async () => {
  const { libraryDir } = await getConfigOpts();
  let target = libraryDir as string[];
  if (typeof libraryDir === 'string') {
    target = [libraryDir];
  }
  return target.map(dirName => winPath(join(cwd(), dirName)));
};

/**
 * 输出文件夹
 */
export const outputPathAbsolutePath = async () => {
  const { outputDir } = await getConfigOpts();
  return winPath(
    join(cwd(), outputDir)
  );
};

// /**
//  * 放弃编译的文件夹
//  */
// export const excludeDirAbsolutePaths = () => { 
//   return (getConfigOpts().exclude || []).map(exc => winPath(
//     join(cwd(), exc)
//   ));
// };

/**
 * tsconfig.json 路径
 */
export const tsconfigPath = () => {
  return fs.existsSync(winPath(join(cwd(), 'tsconfig.json'))) ? winPath(join(cwd(), 'tsconfig.json')) : null;
};

/**
 * pkg路径
 */
export const pkgPath = () => {
  return winPath(join(cwd(), 'package.json'));
};

/**
 * pkg信息
 */
export const pkgInfo = () => require(pkgPath());

/**
 * 获取输出路径前缀
 * @param isEditor 
 * @param compName 
 * @returns 
 */
export const getOutputFilePrefix = (isEditor, compName) => {
  return isEditor ? `${compName}.editor` : compName;
};

/**
 * 获取输出文件名
 * @param param0 
 * @returns 
 */
export const getOutputFile = async ({
  isMin = false,
  compName,
  isEditor
}) => {
  const { platform } = await getConfigOpts();
  const outputFilePrefix = getOutputFilePrefix(isEditor, compName);
  return `${outputFilePrefix}.${platform}${isMin ? '.min' : ""}.js`;
};