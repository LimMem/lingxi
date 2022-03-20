import fs from 'fs';
import path from 'path';
import lodash from 'lodash';
import winPath from './winPath';
/**
 * 命令行执行路径
 */
export const cwd = process.cwd();

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
    const find = (f) => {
      return ['.tsx', '.jsx', '.js', '.ts'].find(suffix => fs.existsSync(path.join(dirPath, f, `index${suffix}`)));
    }
    const target = files.filter(f => !!find(f)).map(f => ({
      compName: lodash.upperFirst(f),
      path: winPath(path.join(dirPath, f, `index${find(f)}`)),
      dirName: f,
      relativeInput: f,
      outputFilePrefix: f
    }));

    const findED = (f) => {
      return ['.tsx', '.jsx', '.js', '.ts'].find(suffix => fs.existsSync(path.join(dirPath, f, `${f}ED`, `index${suffix}`)));
    }
    const targetED = files.filter(f => !!findED(f)).map(f => ({
      compName: lodash.upperFirst(f),
      path: winPath(path.join(dirPath, f, `${f}ED`, `index${findED(f)}`)),
      dirName: f,
      relativeInput: `${f}/${f}ED`,
      outputFilePrefix: `${f}.editor`
    }));

    resolve([
      ...target,
      ...targetED
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