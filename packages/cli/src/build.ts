import { rollup } from 'rollup';
import chalk from 'chalk';
import rimraf from "rimraf";
import nodeWatch from 'node-watch';
import { getCompName, getCompNames, removeWillBuildFile } from './utils/tool';
import { getConfigOpts, outputPathAbsolutePath, targetAbsolutePaths } from './utils';
import rollupOpts from './build/rollupOptions';


/**
 * 编译单个组件
 * @param compInfo 
 */
const rollupBuildSingleFile = async (compInfo) => {
  const opts = rollupOpts({
    ...compInfo,
    outputDir: outputPathAbsolutePath(),
  });
  for (let j = 0; j < opts.length; j++) {
    const { output, exportFileName, ...input } = opts[j]; 
      // 开始编译
      const bundle = await rollup(input);
      await bundle.write(output as any /** 类型校验错误 */);
      console.log(chalk.green(`${compInfo.relativeInput} ---> ${exportFileName}`));
  }
};

/**
 * 编译所有组件
 * @param compNames 
 */
const rollupAllBuild = async (compNames) => { 
  for (let index = 0; index < compNames.length; index++) {
    const compInfo = compNames[index];
    await rollupBuildSingleFile(compInfo);
  }
};


const build = async (opts: any) => {
  const { watch: w = false } = opts;

  const targetAbsolutePath = targetAbsolutePaths();
  rimraf.sync(outputPathAbsolutePath());

  const compNames = await getCompNames(targetAbsolutePath);
  await rollupAllBuild(compNames);

  if (w) {
    const nodeWatcher = nodeWatch(targetAbsolutePath, {
      recursive: true
    }, async (eventType, filePath) => {
      const { isED, compNames = [], name } = await getCompName(filePath);
      removeWillBuildFile({ isED, name }, filePath);
      rollupAllBuild(compNames);
      isED ? console.log(chalk.blue(`${eventType}组件: ${name}/${name}ED`)) : console.log(chalk.blue(`update ${name}`));
    });
    console.log(chalk.yellow(`正在监听: ${getConfigOpts().libraryDir}`));
    process.on("SIGINT", () => {
      nodeWatcher.close();
    });
    
  } else { 
    console.log();
    console.log(chalk.green(`🌈🍻编译完成。`));
  }
}

module.exports = build

