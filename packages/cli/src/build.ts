import { rollup } from 'rollup';
import chalk from 'chalk';
import rimraf from "rimraf";
import { getCompNames } from './utils/tool';
import { outputPathAbsolutePath, targetAbsolutePaths } from './utils';
import rollupOpts from './build/rollupOptions';

(async () => {
  const targetAbsolutePath = targetAbsolutePaths();
  const compNames = await getCompNames(targetAbsolutePath);

  rimraf.sync(outputPathAbsolutePath);

  for (let index = 0; index < compNames.length; index++) {
    const compInfo = compNames[index];
    const opts = rollupOpts({
      ...compInfo,
      outputDir: outputPathAbsolutePath,
    });
    for (let j = 0; j < opts.length; j++) {
      const { output, exportFileName, ...input } = opts[j];
      const bundle = await rollup(input);
      await bundle.write(output as any /** 类型校验错误 */);
      console.log(chalk.green(`${compInfo.relativeInput} ---> ${exportFileName}`));
    }
  }
  console.log();
  console.log(chalk.green(`🌈🍻编译完成。`));

})();

