import chalk from 'chalk';
export const createFooterLog = (appName) => {
  console.log();
  console.log(chalk.green(`🌈🍺创建完成。请执行以下命令`));
  console.log('-----------------------------------------');
  console.log('-\t\t\t\t\t-');
  console.log('-\t\t', chalk.blue(`cd ${appName}`), '\t\t-');
  console.log('-\t\t\t\t\t-');
  console.log('-\t\t ', chalk.blue(`yarn`), ' \t\t-');
  console.log('-\t\t\t\t\t-');
  console.log('-----------------------------------------');
  console.log();
  console.log(chalk.yellow('你还可以使用以下命令:'));
  console.log();
  console.log(chalk.blue(`[编    译]: lingxi build`));
  console.log(chalk.blue(`[监    听]: lingxi build --watch[w]`))
  console.log(chalk.blue(`[启动服务]: lingxi build --watch[w] --server[s] --compname=[componentName]`));
  console.log();
}