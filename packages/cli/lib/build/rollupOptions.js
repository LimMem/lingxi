"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _pluginCommonjs = _interopRequireDefault(require("@rollup/plugin-commonjs"));

var _utils = require("../utils");

var _winPath = _interopRequireDefault(require("../utils/winPath"));

var _rollupPlugins = require("./rollupPlugins");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = opts => {
  const compName = opts.compName,
        outputDir = opts.outputDir,
        optsPath = opts.path,
        outputFilePrefix = opts.outputFilePrefix;

  const _getConfigOpts = (0, _utils.getConfigOpts)(),
        minFile = _getConfigOpts.minFile,
        globals = _getConfigOpts.globals,
        extraExternals = _getConfigOpts.extraExternals,
        namePrefix = _getConfigOpts.namePrefix,
        platform = _getConfigOpts.platform;

  return [{
    input: optsPath,
    external: [...Object.keys(_utils.pkgInfo.peerDependencies || {}), ...extraExternals],
    plugins: [...(0, _rollupPlugins.getPlugins)({
      minFile: false,
      isTypeScript: ['.ts', '.tsx'].includes(_path.default.extname(optsPath))
    }), (0, _pluginCommonjs.default)({
      include: /node_modules/
    })],
    output: {
      format: "umd",
      sourcemap: false,
      globals: _objectSpread({
        'react': "React"
      }, globals || {}),
      name: `${namePrefix}${compName}`,
      file: (0, _winPath.default)(_path.default.join(outputDir, compName, `${outputFilePrefix}.${platform}.js`))
    },
    exportFileName: `${outputFilePrefix}.${platform}.js`
  }, ...(minFile ? [{
    input: optsPath,
    external: [...Object.keys(_utils.pkgInfo.peerDependencies || {}), ...extraExternals],
    plugins: [...(0, _rollupPlugins.getPlugins)({
      minFile,
      isTypeScript: ['.ts', '.tsx'].includes(_path.default.extname(optsPath))
    }), (0, _pluginCommonjs.default)({
      include: /node_modules/
    })],
    output: {
      format: "umd",
      sourcemap: false,
      globals: _objectSpread({
        'react': "React"
      }, globals || {}),
      name: `${namePrefix}${compName}`,
      file: (0, _winPath.default)(_path.default.join(outputDir, compName, `${outputFilePrefix}.${platform}.min.js`))
    },
    exportFileName: `${outputFilePrefix}.${platform}.min.js`
  }] : [])];
};

exports.default = _default;