"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chalk = _interopRequireDefault(require("chalk"));

var _path = _interopRequireDefault(require("path"));

var _lodash = _interopRequireDefault(require("lodash"));

var _mustacheDir = _interopRequireDefault(require("./utils/mustacheDir"));

var _log = require("./utils/log");

function create(_ref) {
  var appName = _ref.appName,
      _ref$platform = _ref.platform,
      platform = _ref$platform === void 0 ? 'app' : _ref$platform;

  if (!appName) {
    console.log();
    console.log(_chalk["default"].red('xingxi create [appName]\nappName不能为空'));
    process.exit(1);
  }

  var mustacheOpts = {
    appName: appName,
    appname: _lodash["default"].toLower(appName),
    AppName: _lodash["default"].upperFirst(appName),
    platform: platform
  };
  (0, _mustacheDir["default"])({
    opts: mustacheOpts,
    type: 'create',
    outputDir: _path["default"].join(process.cwd(), appName)
  });
  (0, _log.createFooterLog)(appName);
}

module.exports = create;