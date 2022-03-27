import fs from 'fs';
import path from 'path';
import { rollup, RollupOptions } from 'rollup';
import chalk from 'chalk';
import rimraf from "rimraf";
import chokidar from 'chokidar';
import { getConfigOpts, getDefaultFile, outputPathAbsolutePath, targetAbsolutePaths, watcherEventNameMap } from './utils';
import rollupOpts from './build/rollupOptions';
import { getAllCompName, getCompileInfo } from './utils/tool';
import lodash from 'lodash';

/**
 * 编译单个组件
 * @param compInfo 
 */
const buildCompName = async (compInfo) => {
  const opts = await rollupOpts({
    ...compInfo,
    outputDir: await outputPathAbsolutePath(),
  });
  for (let j = 0; j < opts.length; j++) {
    const { output, exportFileName, min, ...input } = opts[j];
    // 开始编译
    const bundle = await rollup(input as RollupOptions);
    await bundle.write(output as any /** 类型校验错误 */);
    const { libraryDir: { editor, engine } } = await getConfigOpts();
    console.log(chalk.blue(`[${compInfo.isEditor ? '编辑态' : '配置态'}: ${min ? "压  缩" : "非压缩"}]`), chalk.green(`${compInfo.isEditor ? editor : engine}/${compInfo.compName} ---> ${exportFileName}`));
  }
};

/**
 * 编译指定组件
 * @param compName 编译指定组件
 */
async function compileCompByCompName(compName) {
  const compInfos = await getCompileInfo(compName);
  for (let index = 0; index < Object.keys(compInfos).length; index++) {
    const key = Object.keys(compInfos)[index];
    const compInfo = compInfos[key];
    await buildCompName(compInfo);
  }
};

const getRealPath = async (fullPath: string) => {
  const { editor, engine } = await targetAbsolutePaths();
  if (fullPath.startsWith(editor)) {
    return {
      isEditor: true,
      realPath: fullPath.replace(editor, '')
    };
  }
  return {
    isEditor: false,
    realPath: fullPath.replace(engine, '')
  };
}

const getRelCompInfo = async (fullPath: string) => {
  const { realPath, isEditor } = await getRealPath(fullPath);
  const { editor, engine } = await targetAbsolutePaths();
  // TODO: windows平台待确认;
  const compName = realPath.split('/').filter(t => !!t)[0];
  const indexFileName = getDefaultFile(path.join(isEditor ? editor : engine, compName));
  return {
    compName: lodash.upperFirst(compName),
    isEditor: isEditor,
    dirName: compName,
    path: path.join(isEditor ? editor : engine, compName, indexFileName)
  }
};


const build = async (opts: any) => {
  const { watch: w = false, compName, server } = opts;
  rimraf.sync(await outputPathAbsolutePath());

  let compNames = [compName];
  if (!compName) {
    compNames = await getAllCompName();
  }
  for (let index = 0; index < compNames.length; index++) {
    const name = compNames[index];
    await compileCompByCompName(name);
  }

  if (w) {
    const { editor, engine } = await targetAbsolutePaths();
    const { libraryDir } = await getConfigOpts();

    let watchDir = {
      editor,
      engine,
      absoluteEditor: editor,
      absoluteEngine: engine
    };

    if (compName) {
      watchDir = {
        editor: `${libraryDir.editor}/${compName}`,
        engine: `${libraryDir.engine}/${compName}`,
        absoluteEditor: path.join(editor, compName),
        absoluteEngine: path.join(engine, compName)
      }
    }

    console.log(watchDir);
    console.log(chalk.blue(`开始监听[${watchDir.editor}、${watchDir.engine}]目录`));
    const watcher = chokidar.watch([watchDir.absoluteEditor, watchDir.absoluteEngine], {
      ignoreInitial: true,
    });
    watcher.on('all', async (event, fullPath) => {
      if (!fs.existsSync(fullPath)) return;
      if (fs.statSync(fullPath).isFile()) {
        const { realPath } = await getRealPath(fullPath);
        console.log();
        console.log(
          chalk.yellow(`[${watcherEventNameMap[event]}] ${realPath}`)
        );
        await buildCompName(await getRelCompInfo(fullPath));
        console.log(
          chalk.green(`编译完成✨🚀`)
        );
      }
    });
  }
}

module.exports = build

