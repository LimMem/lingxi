"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tsconfigPath = exports.targetAbsolutePaths = exports.pkgPath = exports.pkgInfo = exports.outputPathAbsolutePath = exports.getOutputFilePrefix = exports.getOutputFile = exports.getConfigOpts = exports.excludeDirAbsolutePaths = void 0;

var _path = require("path");

var _fs = _interopRequireDefault(require("fs"));

var _winPath = _interopRequireDefault(require("./winPath"));

var _defaultConfig = _interopRequireDefault(require("../build/defaultConfig"));

var _getConfig = require("./getConfig");

var _tool = require("./tool");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 获取用户配置
 * @returns 用户配置
 */
const getConfigOpts = () => {
  const path = (0, _getConfig.getConfigFile)();

  if (!path) {
    return _defaultConfig.default;
  }

  const userConfig = require(path) || {};
  return _objectSpread(_objectSpread({}, _defaultConfig.default), userConfig);
};
/**
 * 库目标绝对路径
 */


exports.getConfigOpts = getConfigOpts;

const targetAbsolutePaths = () => {
  const _getConfigOpts = getConfigOpts(),
        libraryDir = _getConfigOpts.libraryDir;

  let target = libraryDir;

  if (typeof libraryDir === 'string') {
    target = [libraryDir];
  }

  return target.map(dirName => (0, _winPath.default)((0, _path.join)((0, _tool.cwd)(), dirName)));
};
/**
 * 输出文件夹
 */


exports.targetAbsolutePaths = targetAbsolutePaths;

const outputPathAbsolutePath = () => {
  return (0, _winPath.default)((0, _path.join)((0, _tool.cwd)(), getConfigOpts().outputDir));
};
/**
 * 放弃编译的文件夹
 */


exports.outputPathAbsolutePath = outputPathAbsolutePath;

const excludeDirAbsolutePaths = () => {
  return (getConfigOpts().exclude || []).map(exc => (0, _winPath.default)((0, _path.join)((0, _tool.cwd)(), exc)));
};
/**
 * tsconfig.json 路径
 */


exports.excludeDirAbsolutePaths = excludeDirAbsolutePaths;

const tsconfigPath = () => {
  return _fs.default.existsSync((0, _winPath.default)((0, _path.join)((0, _tool.cwd)(), 'tsconfig.json'))) ? (0, _winPath.default)((0, _path.join)((0, _tool.cwd)(), 'tsconfig.json')) : null;
};
/**
 * pkg路径
 */


exports.tsconfigPath = tsconfigPath;

const pkgPath = () => {
  return (0, _winPath.default)((0, _path.join)((0, _tool.cwd)(), 'package.json'));
};
/**
 * pkg信息
 */


exports.pkgPath = pkgPath;

const pkgInfo = () => require(pkgPath());
/**
 * 获取输出路径前缀
 * @param isEditor 
 * @param compName 
 * @returns 
 */


exports.pkgInfo = pkgInfo;

const getOutputFilePrefix = (isEditor, compName) => {
  return isEditor ? `${compName}.editor` : compName;
};
/**
 * 获取输出文件名
 * @param param0 
 * @returns 
 */


exports.getOutputFilePrefix = getOutputFilePrefix;

const getOutputFile = ({
  isMin = false,
  compName,
  isEditor
}) => {
  const _getConfigOpts2 = getConfigOpts(),
        platform = _getConfigOpts2.platform;

  const outputFilePrefix = getOutputFilePrefix(isEditor, compName);
  return `${outputFilePrefix}.${platform}${isMin ? '.min' : ""}.js`;
};

exports.getOutputFile = getOutputFile;