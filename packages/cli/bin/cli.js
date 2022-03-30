#!/usr/bin/env node

const yParser = require('yargs-parser');

const args = yParser(process.argv.slice(2), {
  alias: {
    compName: 'compname',
    platform: 'p',
  },
});

if (args.v || args.version) {
  console.log(require('../package').version);
  process.exit(0);
}

const [cliType] = args._;

switch (cliType) {
  case 'build':
    require('../lib/build')({
      watch: args.watch || args.w,
      compName: args.compName,
      server: args.server || args.s,
    });
    break;
  case 'create':
    require('../lib/create')({
      appName: args._[1],
      platform: args.platform || 'app',
    });
  default:
    break;
}
