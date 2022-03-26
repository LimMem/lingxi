"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConfigFile = void 0;

var _fs = require("fs");

var _path = require("path");

var _tool = require("./tool");

var _winPath = _interopRequireDefault(require("./winPath"));

var RC_FILES_SUFFIX = ['.ts', '.js'];
var RC_FILENAME = "lingxirc";

var getConfigFile = function getConfigFile() {
  var suffix = RC_FILES_SUFFIX.find(function (suffix) {
    return (0, _fs.existsSync)((0, _winPath["default"])((0, _path.join)((0, _tool.cwd)(), "".concat(RC_FILENAME).concat(suffix))));
  });

  if (!suffix) {
    return null;
  }

  return (0, _winPath["default"])((0, _path.join)((0, _tool.cwd)(), "".concat(RC_FILENAME).concat(suffix)));
};

exports.getConfigFile = getConfigFile;