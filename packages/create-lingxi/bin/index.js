#!/usr/bin/env node

const yParser = require('yargs-parser');
const create = require('@lingxiteam/cli/lib/create');

const args = yParser(process.argv.slice(2), {
  alias: {
    compName: 'compname',
    platform: 'p',
  },
});

if (args.v || args.version) {
  console.log(require('@lingxiteam/cli/package.json').version);
  process.exit(0);
}

create({
  appName: args._[0],
  platform: args.platform || 'app',
});
