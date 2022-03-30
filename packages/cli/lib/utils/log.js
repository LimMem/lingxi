"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFooterLog = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

var createFooterLog = function createFooterLog(appName) {
  console.log();
  console.log(_chalk["default"].green("\uD83C\uDF08\uD83C\uDF7A\u521B\u5EFA\u5B8C\u6210\u3002\u8BF7\u6267\u884C\u4EE5\u4E0B\u547D\u4EE4"));
  console.log('-----------------------------------------');
  console.log('-\t\t\t\t\t-');
  console.log('-\t\t', _chalk["default"].blue("cd ".concat(appName)), '\t\t-');
  console.log('-\t\t\t\t\t-');
  console.log('-\t\t ', _chalk["default"].blue("yarn"), ' \t\t-');
  console.log('-\t\t\t\t\t-');
  console.log('-----------------------------------------');
  console.log();
  console.log(_chalk["default"].yellow('你还可以使用以下命令:'));
  console.log();
  console.log(_chalk["default"].blue("[\u7F16    \u8BD1]: lingxi build"));
  console.log(_chalk["default"].blue("[\u76D1    \u542C]: lingxi build --watch[w]"));
  console.log(_chalk["default"].blue("[\u542F\u52A8\u670D\u52A1]: lingxi build --watch[w] --server[s] --compname=[componentName]"));
  console.log();
};

exports.createFooterLog = createFooterLog;