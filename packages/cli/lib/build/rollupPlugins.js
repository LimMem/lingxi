"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPlugins = void 0;

var _rollupPluginPostcss = _interopRequireDefault(require("rollup-plugin-postcss"));

var _pluginUrl = _interopRequireDefault(require("@rollup/plugin-url"));

var _pluginJson = _interopRequireDefault(require("@rollup/plugin-json"));

var _pluginReplace = _interopRequireDefault(require("@rollup/plugin-replace"));

var _pluginNodeResolve = _interopRequireDefault(require("@rollup/plugin-node-resolve"));

var _rollupPluginTypescript = _interopRequireDefault(require("rollup-plugin-typescript2"));

var _rollupPluginTerser = require("rollup-plugin-terser");

var _rollup = _interopRequireDefault(require("@svgr/rollup"));

var _lessPluginNpmImport = _interopRequireDefault(require("less-plugin-npm-import"));

var _autoprefixer = _interopRequireDefault(require("autoprefixer"));

var _tool = require("../utils/tool");

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _tempDir = _interopRequireDefault(require("temp-dir"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const getPlugins = ({
  minFile = false,
  isTypeScript
}) => {
  const _getConfigOpts = (0, _utils.getConfigOpts)(),
        _getConfigOpts$replac = _getConfigOpts.replace,
        replaceOpts = _getConfigOpts$replac === void 0 ? {} : _getConfigOpts$replac,
        disableTypeCheck = _getConfigOpts.disableTypeCheck,
        typescriptOpts = _getConfigOpts.typescriptOpts;

  return [(0, _pluginUrl.default)(), (0, _rollup.default)(), (0, _rollupPluginPostcss.default)({
    autoModules: false,
    minimize: minFile,
    use: {
      less: {
        plugins: [new _lessPluginNpmImport.default({
          prefix: '~'
        })],
        javascriptEnabled: true
      },
      sass: false,
      stylus: false
    },
    plugins: [(0, _autoprefixer.default)({
      remove: false
    })]
  }), ...(replaceOpts && Object.keys(replaceOpts || {}).length ? [(0, _pluginReplace.default)(replaceOpts)] : []), (0, _pluginNodeResolve.default)({
    mainFields: ['module', 'jsnext:main', 'main']
  }), ...(isTypeScript ? [(0, _rollupPluginTypescript.default)(_objectSpread({
    cwd: _tool.cwd,
    clean: true,
    cacheRoot: `${_tempDir.default}/.rollup_plugin_typescript2_cache`,
    tsconfig: [_path.default.join(_tool.cwd, 'tsconfig.json')].find(_fs.default.existsSync),
    tsconfigDefaults: {
      compilerOptions: {
        declaration: false
      }
    },
    tsconfigOverride: {
      compilerOptions: {
        target: 'esnext',
        declaration: false
      }
    },
    check: !disableTypeCheck
  }, typescriptOpts || {}))] : []), (0, _pluginJson.default)(), ...(minFile ? [(0, _pluginReplace.default)({
    'process.env.NODE_ENV': minFile ? JSON.stringify('production') : JSON.stringify('development')
  }), (0, _rollupPluginTerser.terser)({
    compress: {
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true
    }
  })] : [])];
};

exports.getPlugins = getPlugins;