import fs from 'fs';
import path from 'path';
import lodash from 'lodash';
import rimraf from "rimraf";
import winPath from './winPath';
import { getConfigOpts, getOutputFile, getOutputFilePrefix, outputPathAbsolutePath, targetAbsolutePaths } from '.';
/**
 * 命令行执行路径
 */
export const cwd = process.cwd;

const getCompEDOpts = (files, dirPath) => { 
  const findED = (f) => {
    return ['.tsx', '.jsx', '.js', '.ts'].find(suffix => fs.existsSync(path.join(dirPath, f, `${f}ED`, `index${suffix}`)));
  }
  const targetED = files.filter(f => !!findED(f)).map(f => ({
    compName: lodash.upperFirst(f),
    path: winPath(path.join(dirPath, f, `${f}ED`, `index${findED(f)}`)),
    dirName: f,
    relativeInput: `${f}/${f}ED`,
    outputFilePrefix: getOutputFilePrefix(true, f),
    isEditor: true
  }));
  return targetED || [];
}

const getCompOpts = (files, dirPath) => { 
  const find = (f) => {
    return ['.tsx', '.jsx', '.js', '.ts'].find(suffix => fs.existsSync(path.join(dirPath, f, `index${suffix}`)));
  }
  const target = files.filter(f => !!find(f)).map(f => ({
    compName: lodash.upperFirst(f),
    path: winPath(path.join(dirPath, f, `index${find(f)}`)),
    dirName: f,
    relativeInput: f,
    outputFilePrefix: getOutputFilePrefix(false, f),
    isEditor: false
  }));
  return target || [];
};

export const readDir = async (dirPath) => new Promise<any[]>((resolve, reject) => {
  if (!fs.existsSync(dirPath)) {
    reject("文件不存在");
    return;
  }
  fs.readdir(dirPath, {
    encoding: "utf8"
  }, (err, files) => {
    if (err) {
      reject(err);
      return;
    }
    resolve([
      ...getCompOpts(files, dirPath),
      ...getCompEDOpts(files, dirPath)
    ]);
  })
});


export const getCompNames = async (dirPaths) => {
  const target = [];
  for (let index = 0; index < dirPaths.length; index++) {
    const dirPath = dirPaths[index];
    try {
      const components = await readDir(dirPath);
      target.push(...components);
    } catch (error) {
      console.log(`${dirPath}目录不存在`);
    }
  }
  return target;
};

export const getFileName = (iPath = "") => { 
  const targetPath = targetAbsolutePaths();
  const p = targetPath.find(p => new RegExp(`^${p}`).test(iPath));
  if (p) {
    const fileNames = iPath.replace(p, '').split('/');
    if (fileNames.length > 1) {
      let name = fileNames[1];
      const file = fileNames.find(f => `${name}ED` === f);
      return {
        name,
        targetPath: p,
        isED: !!file
      };
    }
  }
  return "";
}

export const getCompName = async (iPath = "") => {
  const fileOpts = getFileName(iPath);
  if (fileOpts) {
    const { name, targetPath, isED } = fileOpts;
    if (isED) {
      return {
        compNames: getCompEDOpts([name], targetPath),
        isED,
        name
      }
    }
    return {
      compNames: getCompOpts([name], targetPath),
      isED,
      name
    };
  }
  return null;
}

// 移除要编译的文件
export const removeWillBuildFile = ({ isED, name }, filePath = "") => { 
  const { minFile } = getConfigOpts();
  const nameDir = path.join(outputPathAbsolutePath(), name);
  rimraf.sync(path.join(nameDir, getOutputFile({ isMin: false, compName: name, isEditor: isED })));
  if (minFile) {
    rimraf.sync(path.join(nameDir, getOutputFile({ isMin: true, compName: name, isEditor: isED })));
  }
  // 如果文件夹无文件，就把文件夹删除
  if (fs.existsSync(nameDir)) {
    fs.readdir(nameDir, (err,files)=>{
      if (err) {
        console.log(err);
      } else if (!files?.length) {
        rimraf.sync(nameDir);
      }
    })
  }
}