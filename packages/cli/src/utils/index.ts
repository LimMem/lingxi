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
export const getConfigOpts: GetConfigOptsFunction = async () => {
  const path = getConfigFile();
  if (!fs.existsSync(path)) {
    return defaultConfig;
  }
  // TODO: 后续支持config es导入。暂时不作处理
  const userConfig = await require(path) || {};
  const { editor, engine } = userConfig.libraryDir || {}

  return {
    ...defaultConfig,
    ...userConfig,
    libraryDir: {
      editor: editor || defaultConfig.libraryDir.editor,
      engine: engine || defaultConfig.libraryDir.engine
    }
  }
};


/**
 * 获取组件的真实路径
 * @param dirName 组件名称
 * @returns 
 */
export const getDefaultFile = (dirName) => {
  return ['index.ts', 'index.js', 'index.tsx', 'index.jsx'].find(it => fs.existsSync(join(dirName, it)));
}

/**
 * 通过文件夹路径 获取所有子文件夹
 * @param dir 
 */
export const getSubDirsByDir = async (dir: string) => {
  const compNames = fs.readdirSync(dir, { encoding: 'utf8' });
  return compNames.filter(comp => getDefaultFile(join(dir, comp)));
}


/**
 * 库目标绝对路径
 */
export const targetAbsolutePaths = async () => {
  const { libraryDir } = await getConfigOpts();
  return {
    engine: winPath(join(cwd(), libraryDir.engine)),
    editor: winPath(join(cwd(), libraryDir.editor))
  };
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

export const watcherEventNameMap = {
  add: '新增文件',
  addDir: '新增文件夹',
  change: '修改',
  unlink: '删除文件',
  unlinkDir: '删除文件夹',
};