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

var _rollupPluginLivereload = _interopRequireDefault(require("rollup-plugin-livereload"));

var _rollupPluginServe = _interopRequireDefault(require("rollup-plugin-serve"));

var _pluginNodeResolve = _interopRequireDefault(require("@rollup/plugin-node-resolve"));

var _rollupPluginTypescript = _interopRequireDefault(require("rollup-plugin-typescript2"));

var _rollupPluginTerser = require("rollup-plugin-terser");

var _rollup = _interopRequireDefault(require("@svgr/rollup"));

var _pluginBabel = require("@rollup/plugin-babel");

var _lessPluginNpmImport = _interopRequireDefault(require("less-plugin-npm-import"));

var _autoprefixer = _interopRequireDefault(require("autoprefixer"));

var _tempDir = _interopRequireDefault(require("temp-dir"));

var _chalk = _interopRequireDefault(require("chalk"));

var _tool = require("../utils/tool");

var _utils = require("../utils");

var _babelConfig = require("./babelConfig");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var getPlugins = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref) {
    var _ref$minFile, minFile, isTypeScript, name, _ref$server, server, compName, _yield$getConfigOpts, _yield$getConfigOpts$, replaceOpts, disableTypeCheck, typescriptOpts, postcssExtension, outputDir;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _ref$minFile = _ref.minFile, minFile = _ref$minFile === void 0 ? false : _ref$minFile, isTypeScript = _ref.isTypeScript, name = _ref.name, _ref$server = _ref.server, server = _ref$server === void 0 ? false : _ref$server, compName = _ref.compName;
            _context2.next = 3;
            return (0, _utils.getConfigOpts)();

          case 3:
            _yield$getConfigOpts = _context2.sent;
            _yield$getConfigOpts$ = _yield$getConfigOpts.replace;
            replaceOpts = _yield$getConfigOpts$ === void 0 ? {} : _yield$getConfigOpts$;
            disableTypeCheck = _yield$getConfigOpts.disableTypeCheck;
            typescriptOpts = _yield$getConfigOpts.typescriptOpts;
            postcssExtension = _yield$getConfigOpts.postcssExtension;
            outputDir = _yield$getConfigOpts.outputDir;
            _context2.t0 = [(0, _pluginNodeResolve["default"])({
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
            _context2.t1 = (0, _toConsumableArray2["default"])(replaceOpts && Object.keys(replaceOpts || {}).length ? [(0, _pluginReplace["default"])(_objectSpread({
              __buildDate__: function __buildDate__() {
                return JSON.stringify(new Date());
              },
              __buildVersion__: function __buildVersion__() {
                return JSON.stringify((0, _utils.pkgInfo)().version);
              },
              'process.env.NODE_ENV': minFile ? JSON.stringify('production') : JSON.stringify('development')
            }, replaceOpts))] : []);
            _context2.t2 = (0, _toConsumableArray2["default"])(isTypeScript ? [(0, _rollupPluginTypescript["default"])(_objectSpread({
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
            _context2.t3 = _pluginBabel.babel;
            _context2.next = 16;
            return (0, _babelConfig.getBabelConfig)();

          case 16:
            _context2.t4 = _context2.sent;
            _context2.t5 = (0, _context2.t3)(_context2.t4);
            _context2.t6 = (0, _pluginJson["default"])();
            _context2.t7 = [_context2.t5, _context2.t6];
            _context2.t8 = (0, _toConsumableArray2["default"])(!minFile && server ? [(0, _rollupPluginServe["default"])({
              contentBase: _path["default"].join(outputDir, compName),
              onListening: function () {
                var _onListening = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(server) {
                  var address, host, editorFileName, engineFileName, _yield$targetAbsolute, editor, engine, editorIndexFile, engineIndexFile;

                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          address = server.address();
                          host = address.address === '::' ? 'localhost' : address.address;
                          _context.next = 4;
                          return (0, _utils.getOutputFile)({
                            isMin: false,
                            compName: compName,
                            isEditor: true
                          });

                        case 4:
                          editorFileName = _context.sent;
                          _context.next = 7;
                          return (0, _utils.getOutputFile)({
                            isMin: false,
                            compName: compName,
                            isEditor: false
                          });

                        case 7:
                          engineFileName = _context.sent;
                          _context.next = 10;
                          return (0, _utils.targetAbsolutePaths)();

                        case 10:
                          _yield$targetAbsolute = _context.sent;
                          editor = _yield$targetAbsolute.editor;
                          engine = _yield$targetAbsolute.engine;
                          _context.next = 15;
                          return (0, _utils.getDefaultFile)(_path["default"].join(editor, compName));

                        case 15:
                          editorIndexFile = _context.sent;
                          _context.next = 18;
                          return (0, _utils.getDefaultFile)(_path["default"].join(engine, compName));

                        case 18:
                          engineIndexFile = _context.sent;

                          if (editorIndexFile) {
                            if (_fs["default"].existsSync(_path["default"].join(editor, compName, editorIndexFile))) {
                              console.log(_chalk["default"].green("http://".concat(host, ":").concat(address.port, "/").concat(editorFileName)));
                            }
                          }

                          if (engineIndexFile) {
                            if (_fs["default"].existsSync(_path["default"].join(engine, compName, engineIndexFile))) {
                              console.log(_chalk["default"].green("http://".concat(host, ":").concat(address.port, "/").concat(engineFileName)));
                            }
                          }

                        case 21:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                function onListening(_x2) {
                  return _onListening.apply(this, arguments);
                }

                return onListening;
              }()
            }), (0, _rollupPluginLivereload["default"])({
              watch: _path["default"].join(outputDir, compName)
            })] : []);
            _context2.t9 = (0, _toConsumableArray2["default"])(minFile ? [(0, _rollupPluginTerser.terser)({
              compress: {
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true
              }
            })] : []);
            return _context2.abrupt("return", _context2.t0.concat.call(_context2.t0, _context2.t1, _context2.t2, _context2.t7, _context2.t8, _context2.t9));

          case 23:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getPlugins(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getPlugins = getPlugins;