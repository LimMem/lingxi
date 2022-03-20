#!/usr/bin/env node

const yParser = require('yargs-parser');

const args = yParser(process.argv.slice(2));

if (args.v || args.version) {
  console.log(require('../package').version);
  process.exit(0);
}

const [ cliType ] = args._;

switch (cliType) {
  case "build":
    require("../lib/build")({
      watch: args.watch || args.w
    });
    break;
  case "create":
    require("../lib/create");
  default:
    break;
}
