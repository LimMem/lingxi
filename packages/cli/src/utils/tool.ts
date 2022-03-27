import path from 'path';
import lodash from 'lodash';
import { getDefaultFile, getSubDirsByDir, targetAbsolutePaths } from '.';
/**
 * 命令行执行路径
 */
export const cwd = process.cwd;


export async function getCompileInfo(compName = "") {
  const { editor, engine } = await targetAbsolutePaths();
  const entries: any = {};
  const editorIndexFile = getDefaultFile(path.join(editor, compName));
  const engineIndexFile = getDefaultFile(path.join(engine, compName));

  if (editorIndexFile) {
    entries.editor = {
      compName: lodash.upperFirst(compName),
      isEditor: true,
      dirName: compName,
      path: path.join(editor, compName, editorIndexFile)
    };
  }
  if (engineIndexFile) {
    entries.engine = {
      compName: lodash.upperFirst(compName),
      isEditor: false,
      dirName: compName,
      path: path.join(engine, compName, engineIndexFile)
    };
  }
  return entries;
}

/**
 * 获取文件夹下所有文件
 */
export async function getAllCompName() {
  const { editor, engine } = await targetAbsolutePaths();
  const unique = {};
  const compNames = [...await getSubDirsByDir(editor), ...await getSubDirsByDir(engine)];
  compNames.forEach(it => unique[it] = null);
  return Object.keys(unique);
}