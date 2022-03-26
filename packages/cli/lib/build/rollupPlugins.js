"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPlugins = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _rollupPluginPostcss = _interopRequireDefault(require("rollup-plugin-postcss"));

var _pluginUrl = _interopRequireDefault(require("@rollup/plugin-url"));

var _pluginJson = _interopRequireDefault(require("@rollup/plugin-json"));

var _pluginReplace = _interopRequireDefault(require("@rollup/plugin-replace"));

var _pluginNodeResolve = _interopRequireDefault(require("@rollup/plugin-node-resolve"));

var _rollupPluginTypescript = _interopRequireDefault(require("rollup-plugin-typescript2"));

var _rollupPluginTerser = require("rollup-plugin-terser");

var _rollup = _interopRequireDefault(require("@svgr/rollup"));

var _pluginBabel = require("@rollup/plugin-babel");

var _lessPluginNpmImport = _interopRequireDefault(require("less-plugin-npm-import"));

var _autoprefixer = _interopRequireDefault(require("autoprefixer"));

var _tempDir = _interopRequireDefault(require("temp-dir"));

var _tool = require("../utils/tool");

var _utils = require("../utils");

var _babelConfig = require("./babelConfig");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var getPlugins = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var _ref$minFile, minFile, isTypeScript, name, _yield$getConfigOpts, _yield$getConfigOpts$, replaceOpts, disableTypeCheck, typescriptOpts, postcssExtension;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref$minFile = _ref.minFile, minFile = _ref$minFile === void 0 ? false : _ref$minFile, isTypeScript = _ref.isTypeScript, name = _ref.name;
            _context.next = 3;
            return (0, _utils.getConfigOpts)();

          case 3:
            _yield$getConfigOpts = _context.sent;
            _yield$getConfigOpts$ = _yield$getConfigOpts.replace;
            replaceOpts = _yield$getConfigOpts$ === void 0 ? {} : _yield$getConfigOpts$;
            disableTypeCheck = _yield$getConfigOpts.disableTypeCheck;
            typescriptOpts = _yield$getConfigOpts.typescriptOpts;
            postcssExtension = _yield$getConfigOpts.postcssExtension;
            _context.t0 = [(0, _pluginNodeResolve["default"])({
              preferBuiltins: true,
              browser: true
            }), (0, _pluginUrl["default"])(), (0, _rollup["default"])(), (0, _rollupPluginPostcss["default"])(_objectSpread({
              autoModules: false,
              minimize: minFile,
              use: {
                less: {
                  plugins: [new _lessPluginNpmImport["default"]({
                    prefix: '~'
                  })],
                  javascriptEnabled: true
                },
                sass: false,
                stylus: false
              },
              plugins: [(0, _autoprefixer["default"])({
                remove: false
              })]
            }, postcssExtension))];
            _context.t1 = (0, _toConsumableArray2["default"])(replaceOpts && Object.keys(replaceOpts || {}).length ? [(0, _pluginReplace["default"])(_objectSpread({
              __buildDate__: function __buildDate__() {
                return JSON.stringify(new Date());
              },
              __buildVersion__: function __buildVersion__() {
                return JSON.stringify((0, _utils.pkgInfo)().version);
              },
              'process.env.NODE_ENV': minFile ? JSON.stringify('production') : JSON.stringify('development')
            }, replaceOpts))] : []);
            _context.t2 = (0, _toConsumableArray2["default"])(isTypeScript ? [(0, _rollupPluginTypescript["default"])(_objectSpread({
              cwd: (0, _tool.cwd)(),
              clean: true,
              cacheRoot: "".concat(_tempDir["default"], "/.rollup_plugin_typescript2_cache"),
              tsconfig: [_path["default"].join((0, _tool.cwd)(), 'tsconfig.json')].find(_fs["default"].existsSync),
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
            }, typescriptOpts || {}))] : []);
            _context.t3 = _pluginBabel.babel;
            _context.next = 15;
            return (0, _babelConfig.getBabelConfig)();

          case 15:
            _context.t4 = _context.sent;
            _context.t5 = (0, _context.t3)(_context.t4);
            _context.t6 = (0, _pluginJson["default"])();
            _context.t7 = [_context.t5, _context.t6];
            _context.t8 = (0, _toConsumableArray2["default"])(minFile ? [(0, _rollupPluginTerser.terser)({
              compress: {
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true
              }
            })] : []);
            return _context.abrupt("return", _context.t0.concat.call(_context.t0, _context.t1, _context.t2, _context.t7, _context.t8));

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getPlugins(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getPlugins = getPlugins;