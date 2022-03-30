"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watcherEventNameMap = exports.tsconfigPath = exports.targetAbsolutePaths = exports.pkgPath = exports.pkgInfo = exports.outputPathAbsolutePath = exports.getSubDirsByDir = exports.getOutputFilePrefix = exports.getOutputFile = exports.getDefaultFile = exports.getConfigOpts = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _path = require("path");

var _fs = _interopRequireDefault(require("fs"));

var _winPath = _interopRequireDefault(require("./winPath"));

var _defaultConfig = _interopRequireDefault(require("../build/defaultConfig"));

var _getConfig = require("./getConfig");

var _tool = require("./tool");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

/**
 * 获取用户配置
 * @returns 用户配置
 */
var getConfigOpts = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var path, userConfig, _ref2, editor, engine;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            path = (0, _getConfig.getConfigFile)();

            if (_fs["default"].existsSync(path)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", _defaultConfig["default"]);

          case 3:
            _context.next = 5;
            return require(path);

          case 5:
            _context.t0 = _context.sent;

            if (_context.t0) {
              _context.next = 8;
              break;
            }

            _context.t0 = {};

          case 8:
            userConfig = _context.t0;
            _ref2 = userConfig.libraryDir || {}, editor = _ref2.editor, engine = _ref2.engine;
            return _context.abrupt("return", _objectSpread(_objectSpread(_objectSpread({}, _defaultConfig["default"]), userConfig), {}, {
              libraryDir: {
                editor: editor || _defaultConfig["default"].libraryDir.editor,
                engine: engine || _defaultConfig["default"].libraryDir.engine
              }
            }));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getConfigOpts() {
    return _ref.apply(this, arguments);
  };
}();
/**
 * 获取组件的真实路径
 * @param dirName 组件名称
 * @returns
 */


exports.getConfigOpts = getConfigOpts;

var getDefaultFile = function getDefaultFile(dirName) {
  return ['index.ts', 'index.js', 'index.tsx', 'index.jsx'].find(function (it) {
    return _fs["default"].existsSync((0, _path.join)(dirName, it));
  });
};
/**
 * 通过文件夹路径 获取所有子文件夹
 * @param dir
 */


exports.getDefaultFile = getDefaultFile;

var getSubDirsByDir = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(dir) {
    var compNames;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            compNames = _fs["default"].readdirSync(dir, {
              encoding: 'utf8'
            });
            return _context2.abrupt("return", compNames.filter(function (comp) {
              return getDefaultFile((0, _path.join)(dir, comp));
            }));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getSubDirsByDir(_x) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * 库目标绝对路径
 */


exports.getSubDirsByDir = getSubDirsByDir;

var targetAbsolutePaths = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var _yield$getConfigOpts, libraryDir;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return getConfigOpts();

          case 2:
            _yield$getConfigOpts = _context3.sent;
            libraryDir = _yield$getConfigOpts.libraryDir;
            return _context3.abrupt("return", {
              engine: (0, _winPath["default"])((0, _path.join)((0, _tool.cwd)(), libraryDir.engine)),
              editor: (0, _winPath["default"])((0, _path.join)((0, _tool.cwd)(), libraryDir.editor))
            });

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function targetAbsolutePaths() {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * 输出文件夹
 */


exports.targetAbsolutePaths = targetAbsolutePaths;

var outputPathAbsolutePath = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    var _yield$getConfigOpts2, outputDir;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return getConfigOpts();

          case 2:
            _yield$getConfigOpts2 = _context4.sent;
            outputDir = _yield$getConfigOpts2.outputDir;
            return _context4.abrupt("return", (0, _winPath["default"])((0, _path.join)((0, _tool.cwd)(), outputDir)));

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function outputPathAbsolutePath() {
    return _ref5.apply(this, arguments);
  };
}();
/**
 * tsconfig.json 路径
 */


exports.outputPathAbsolutePath = outputPathAbsolutePath;

var tsconfigPath = function tsconfigPath() {
  return _fs["default"].existsSync((0, _winPath["default"])((0, _path.join)((0, _tool.cwd)(), 'tsconfig.json'))) ? (0, _winPath["default"])((0, _path.join)((0, _tool.cwd)(), 'tsconfig.json')) : null;
};
/**
 * pkg路径
 */


exports.tsconfigPath = tsconfigPath;

var pkgPath = function pkgPath() {
  return (0, _winPath["default"])((0, _path.join)((0, _tool.cwd)(), 'package.json'));
};
/**
 * pkg信息
 */


exports.pkgPath = pkgPath;

var pkgInfo = function pkgInfo() {
  return require(pkgPath());
};
/**
 * 获取输出路径前缀
 * @param isEditor
 * @param compName
 * @returns
 */


exports.pkgInfo = pkgInfo;

var getOutputFilePrefix = function getOutputFilePrefix(isEditor, compName) {
  return isEditor ? "".concat(compName, ".editor") : compName;
};
/**
 * 获取输出文件名
 * @param param0
 * @returns
 */


exports.getOutputFilePrefix = getOutputFilePrefix;

var getOutputFile = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_ref6) {
    var _ref6$isMin, isMin, compName, isEditor, _yield$getConfigOpts3, platform, outputFilePrefix;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _ref6$isMin = _ref6.isMin, isMin = _ref6$isMin === void 0 ? false : _ref6$isMin, compName = _ref6.compName, isEditor = _ref6.isEditor;
            _context5.next = 3;
            return getConfigOpts();

          case 3:
            _yield$getConfigOpts3 = _context5.sent;
            platform = _yield$getConfigOpts3.platform;
            outputFilePrefix = getOutputFilePrefix(isEditor, compName);
            return _context5.abrupt("return", "".concat(outputFilePrefix, ".").concat(platform).concat(isMin ? '.min' : "", ".js"));

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getOutputFile(_x2) {
    return _ref7.apply(this, arguments);
  };
}();

exports.getOutputFile = getOutputFile;
var watcherEventNameMap = {
  add: '新增文件',
  addDir: '新增文件夹',
  change: '修改',
  unlink: '删除文件',
  unlinkDir: '删除文件夹'
};
exports.watcherEventNameMap = watcherEventNameMap;