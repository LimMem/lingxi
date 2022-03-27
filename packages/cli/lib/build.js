"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _rollup = require("rollup");

var _chalk = _interopRequireDefault(require("chalk"));

var _rimraf = _interopRequireDefault(require("rimraf"));

var _chokidar = _interopRequireDefault(require("chokidar"));

var _utils = require("./utils");

var _rollupOptions = _interopRequireDefault(require("./build/rollupOptions"));

var _tool = require("./utils/tool");

var _lodash = _interopRequireDefault(require("lodash"));

var _excluded = ["output", "exportFileName", "min"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

/**
 * 编译单个组件
 * @param compInfo 
 */
var buildCompName = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(compInfo) {
    var opts, j, _opts$j, output, exportFileName, min, input, bundle, _yield$getConfigOpts, _yield$getConfigOpts$, editor, engine;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = _rollupOptions["default"];
            _context.t1 = _objectSpread;
            _context.t2 = _objectSpread({}, compInfo);
            _context.t3 = {};
            _context.next = 6;
            return (0, _utils.outputPathAbsolutePath)();

          case 6:
            _context.t4 = _context.sent;
            _context.t5 = {
              outputDir: _context.t4
            };
            _context.t6 = (0, _context.t1)(_context.t2, _context.t3, _context.t5);
            _context.next = 11;
            return (0, _context.t0)(_context.t6);

          case 11:
            opts = _context.sent;
            j = 0;

          case 13:
            if (!(j < opts.length)) {
              _context.next = 30;
              break;
            }

            _opts$j = opts[j], output = _opts$j.output, exportFileName = _opts$j.exportFileName, min = _opts$j.min, input = (0, _objectWithoutProperties2["default"])(_opts$j, _excluded); // 开始编译

            _context.next = 17;
            return (0, _rollup.rollup)(input);

          case 17:
            bundle = _context.sent;
            _context.next = 20;
            return bundle.write(output
            /** 类型校验错误 */
            );

          case 20:
            _context.next = 22;
            return (0, _utils.getConfigOpts)();

          case 22:
            _yield$getConfigOpts = _context.sent;
            _yield$getConfigOpts$ = _yield$getConfigOpts.libraryDir;
            editor = _yield$getConfigOpts$.editor;
            engine = _yield$getConfigOpts$.engine;
            console.log(_chalk["default"].blue("[".concat(compInfo.isEditor ? '编辑态' : '配置态', ": ").concat(min ? "压  缩" : "非压缩", "]")), _chalk["default"].green("".concat(compInfo.isEditor ? editor : engine, "/").concat(compInfo.compName, " ---> ").concat(exportFileName)));

          case 27:
            j++;
            _context.next = 13;
            break;

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function buildCompName(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * 编译指定组件
 * @param compName 编译指定组件
 */


function compileCompByCompName(_x2) {
  return _compileCompByCompName.apply(this, arguments);
}

function _compileCompByCompName() {
  _compileCompByCompName = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(compName) {
    var compInfos, index, key, compInfo;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _tool.getCompileInfo)(compName);

          case 2:
            compInfos = _context6.sent;
            index = 0;

          case 4:
            if (!(index < Object.keys(compInfos).length)) {
              _context6.next = 12;
              break;
            }

            key = Object.keys(compInfos)[index];
            compInfo = compInfos[key];
            _context6.next = 9;
            return buildCompName(compInfo);

          case 9:
            index++;
            _context6.next = 4;
            break;

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _compileCompByCompName.apply(this, arguments);
}

;

var getRealPath = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(fullPath) {
    var _yield$targetAbsolute, editor, engine;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _utils.targetAbsolutePaths)();

          case 2:
            _yield$targetAbsolute = _context2.sent;
            editor = _yield$targetAbsolute.editor;
            engine = _yield$targetAbsolute.engine;

            if (!fullPath.startsWith(editor)) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", {
              isEditor: true,
              realPath: fullPath.replace(editor, '')
            });

          case 7:
            return _context2.abrupt("return", {
              isEditor: false,
              realPath: fullPath.replace(engine, '')
            });

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getRealPath(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

var getRelCompInfo = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(fullPath) {
    var _yield$getRealPath, realPath, isEditor, _yield$targetAbsolute2, editor, engine, compName, indexFileName;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return getRealPath(fullPath);

          case 2:
            _yield$getRealPath = _context3.sent;
            realPath = _yield$getRealPath.realPath;
            isEditor = _yield$getRealPath.isEditor;
            _context3.next = 7;
            return (0, _utils.targetAbsolutePaths)();

          case 7:
            _yield$targetAbsolute2 = _context3.sent;
            editor = _yield$targetAbsolute2.editor;
            engine = _yield$targetAbsolute2.engine;
            // TODO: windows平台待确认;
            compName = realPath.split('/').filter(function (t) {
              return !!t;
            })[0];
            indexFileName = (0, _utils.getDefaultFile)(_path["default"].join(isEditor ? editor : engine, compName));
            return _context3.abrupt("return", {
              compName: _lodash["default"].upperFirst(compName),
              isEditor: isEditor,
              dirName: compName,
              path: _path["default"].join(isEditor ? editor : engine, compName, indexFileName)
            });

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getRelCompInfo(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

var build = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(opts) {
    var _opts$watch, w, compName, server, compNames, index, name, _yield$targetAbsolute3, editor, engine, _yield$getConfigOpts2, libraryDir, watchDir, watcher;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _opts$watch = opts.watch, w = _opts$watch === void 0 ? false : _opts$watch, compName = opts.compName, server = opts.server;
            _context5.t0 = _rimraf["default"];
            _context5.next = 4;
            return (0, _utils.outputPathAbsolutePath)();

          case 4:
            _context5.t1 = _context5.sent;

            _context5.t0.sync.call(_context5.t0, _context5.t1);

            compNames = [compName];

            if (compName) {
              _context5.next = 11;
              break;
            }

            _context5.next = 10;
            return (0, _tool.getAllCompName)();

          case 10:
            compNames = _context5.sent;

          case 11:
            index = 0;

          case 12:
            if (!(index < compNames.length)) {
              _context5.next = 19;
              break;
            }

            name = compNames[index];
            _context5.next = 16;
            return compileCompByCompName(name);

          case 16:
            index++;
            _context5.next = 12;
            break;

          case 19:
            if (!w) {
              _context5.next = 35;
              break;
            }

            _context5.next = 22;
            return (0, _utils.targetAbsolutePaths)();

          case 22:
            _yield$targetAbsolute3 = _context5.sent;
            editor = _yield$targetAbsolute3.editor;
            engine = _yield$targetAbsolute3.engine;
            _context5.next = 27;
            return (0, _utils.getConfigOpts)();

          case 27:
            _yield$getConfigOpts2 = _context5.sent;
            libraryDir = _yield$getConfigOpts2.libraryDir;
            watchDir = {
              editor: editor,
              engine: engine,
              absoluteEditor: editor,
              absoluteEngine: engine
            };

            if (compName) {
              watchDir = {
                editor: "".concat(libraryDir.editor, "/").concat(compName),
                engine: "".concat(libraryDir.engine, "/").concat(compName),
                absoluteEditor: _path["default"].join(editor, compName),
                absoluteEngine: _path["default"].join(engine, compName)
              };
            }

            console.log(watchDir);
            console.log(_chalk["default"].blue("\u5F00\u59CB\u76D1\u542C[".concat(watchDir.editor, "\u3001").concat(watchDir.engine, "]\u76EE\u5F55")));
            watcher = _chokidar["default"].watch([watchDir.absoluteEditor, watchDir.absoluteEngine], {
              ignoreInitial: true
            });
            watcher.on('all', /*#__PURE__*/function () {
              var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(event, fullPath) {
                var _yield$getRealPath2, realPath;

                return _regenerator["default"].wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        if (_fs["default"].existsSync(fullPath)) {
                          _context4.next = 2;
                          break;
                        }

                        return _context4.abrupt("return");

                      case 2:
                        if (!_fs["default"].statSync(fullPath).isFile()) {
                          _context4.next = 16;
                          break;
                        }

                        _context4.next = 5;
                        return getRealPath(fullPath);

                      case 5:
                        _yield$getRealPath2 = _context4.sent;
                        realPath = _yield$getRealPath2.realPath;
                        console.log();
                        console.log(_chalk["default"].yellow("[".concat(_utils.watcherEventNameMap[event], "] ").concat(realPath)));
                        _context4.t0 = buildCompName;
                        _context4.next = 12;
                        return getRelCompInfo(fullPath);

                      case 12:
                        _context4.t1 = _context4.sent;
                        _context4.next = 15;
                        return (0, _context4.t0)(_context4.t1);

                      case 15:
                        console.log(_chalk["default"].green("\u7F16\u8BD1\u5B8C\u6210\u2728\uD83D\uDE80"));

                      case 16:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function (_x6, _x7) {
                return _ref5.apply(this, arguments);
              };
            }());

          case 35:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function build(_x5) {
    return _ref4.apply(this, arguments);
  };
}();

module.exports = build;