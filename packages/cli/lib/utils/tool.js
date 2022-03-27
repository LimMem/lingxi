"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cwd = void 0;
exports.getAllCompName = getAllCompName;
exports.getCompileInfo = getCompileInfo;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _path = _interopRequireDefault(require("path"));

var _lodash = _interopRequireDefault(require("lodash"));

var _ = require(".");

/**
 * 命令行执行路径
 */
var cwd = process.cwd;
exports.cwd = cwd;

function getCompileInfo() {
  return _getCompileInfo.apply(this, arguments);
}
/**
 * 获取文件夹下所有文件
 */


function _getCompileInfo() {
  _getCompileInfo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var compName,
        _yield$targetAbsolute,
        editor,
        engine,
        entries,
        editorIndexFile,
        engineIndexFile,
        _args = arguments;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            compName = _args.length > 0 && _args[0] !== undefined ? _args[0] : "";
            _context.next = 3;
            return (0, _.targetAbsolutePaths)();

          case 3:
            _yield$targetAbsolute = _context.sent;
            editor = _yield$targetAbsolute.editor;
            engine = _yield$targetAbsolute.engine;
            entries = {};
            editorIndexFile = (0, _.getDefaultFile)(_path["default"].join(editor, compName));
            engineIndexFile = (0, _.getDefaultFile)(_path["default"].join(engine, compName));

            if (editorIndexFile) {
              entries.editor = {
                compName: _lodash["default"].upperFirst(compName),
                isEditor: true,
                dirName: compName,
                path: _path["default"].join(editor, compName, editorIndexFile)
              };
            }

            if (engineIndexFile) {
              entries.engine = {
                compName: _lodash["default"].upperFirst(compName),
                isEditor: false,
                dirName: compName,
                path: _path["default"].join(engine, compName, engineIndexFile)
              };
            }

            return _context.abrupt("return", entries);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getCompileInfo.apply(this, arguments);
}

function getAllCompName() {
  return _getAllCompName.apply(this, arguments);
}

function _getAllCompName() {
  _getAllCompName = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var _yield$targetAbsolute2, editor, engine, unique, compNames;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _.targetAbsolutePaths)();

          case 2:
            _yield$targetAbsolute2 = _context2.sent;
            editor = _yield$targetAbsolute2.editor;
            engine = _yield$targetAbsolute2.engine;
            unique = {};
            _context2.t0 = [];
            _context2.t1 = _toConsumableArray2["default"];
            _context2.next = 10;
            return (0, _.getSubDirsByDir)(editor);

          case 10:
            _context2.t2 = _context2.sent;
            _context2.t3 = (0, _context2.t1)(_context2.t2);
            _context2.t4 = _toConsumableArray2["default"];
            _context2.next = 15;
            return (0, _.getSubDirsByDir)(engine);

          case 15:
            _context2.t5 = _context2.sent;
            _context2.t6 = (0, _context2.t4)(_context2.t5);
            compNames = _context2.t0.concat.call(_context2.t0, _context2.t3, _context2.t6);
            compNames.forEach(function (it) {
              return unique[it] = null;
            });
            return _context2.abrupt("return", Object.keys(unique));

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getAllCompName.apply(this, arguments);
}