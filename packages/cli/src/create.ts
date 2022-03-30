
import chalk from 'chalk';
import path from 'path';
import lodash from 'lodash';
import mustacheDir from './utils/mustacheDir';
import { createFooterLog } from './utils/log';

function create({ appName, platform = 'app' }) {
  if (!appName) {
    console.log();
    console.log(chalk.red('xingxi create [appName]\nappName不能为空'));
    process.exit(1);
  }

  const mustacheOpts = {
    appName,
    appname: lodash.toLower(appName),
    AppName: lodash.upperFirst(appName),
    platform
  };

  mustacheDir({
    opts: mustacheOpts,
    type: 'create',
    outputDir: path.join(process.cwd(), appName)
  });

  createFooterLog(appName);
}

module.exports = create;