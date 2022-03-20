"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConfigFile = void 0;

var _fs = require("fs");

var _path = require("path");

var _tool = require("./tool");

var _winPath = _interopRequireDefault(require("./winPath"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RC_FILES_SUFFIX = ['.ts', '.js'];
const RC_FILENAME = "lingxirc";

const getConfigFile = () => {
  const suffix = RC_FILES_SUFFIX.find(suffix => (0, _fs.existsSync)((0, _winPath.default)((0, _path.join)((0, _tool.cwd)(), `${RC_FILENAME}${suffix}`))));

  if (!suffix) {
    return null;
  }

  return (0, _winPath.default)((0, _path.join)((0, _tool.cwd)(), `${RC_FILENAME}${suffix}`));
};

exports.getConfigFile = getConfigFile;