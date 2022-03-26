"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeWillBuildFile = exports.readDir = exports.getFileName = exports.getCompNames = exports.getCompName = exports.cwd = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _lodash = _interopRequireDefault(require("lodash"));

var _rimraf = _interopRequireDefault(require("rimraf"));

var _winPath = _interopRequireDefault(require("./winPath"));

var _ = require(".");

/**
 * 命令行执行路径
 */
var cwd = process.cwd;
exports.cwd = cwd;

var getCompEDOpts = function getCompEDOpts(files, dirPath) {
  var findED = function findED(f) {
    return ['.tsx', '.jsx', '.js', '.ts'].find(function (suffix) {
      return _fs["default"].existsSync(_path["default"].join(dirPath, f, "".concat(f, "ED"), "index".concat(suffix)));
    });
  };

  var targetED = files.filter(function (f) {
    return !!findED(f);
  }).map(function (f) {
    return {
      compName: _lodash["default"].upperFirst(f),
      path: (0, _winPath["default"])(_path["default"].join(dirPath, f, "".concat(f, "ED"), "index".concat(findED(f)))),
      dirName: f,
      relativeInput: "".concat(f, "/").concat(f, "ED"),
      outputFilePrefix: (0, _.getOutputFilePrefix)(true, f),
      isEditor: true
    };
  });
  return targetED || [];
};

var getCompOpts = function getCompOpts(files, dirPath) {
  var find = function find(f) {
    return ['.tsx', '.jsx', '.js', '.ts'].find(function (suffix) {
      return _fs["default"].existsSync(_path["default"].join(dirPath, f, "index".concat(suffix)));
    });
  };

  var target = files.filter(function (f) {
    return !!find(f);
  }).map(function (f) {
    return {
      compName: _lodash["default"].upperFirst(f),
      path: (0, _winPath["default"])(_path["default"].join(dirPath, f, "index".concat(find(f)))),
      dirName: f,
      relativeInput: f,
      outputFilePrefix: (0, _.getOutputFilePrefix)(false, f),
      isEditor: false
    };
  });
  return target || [];
};

var readDir = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(dirPath) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              if (!_fs["default"].existsSync(dirPath)) {
                reject("文件不存在");
                return;
              }

              _fs["default"].readdir(dirPath, {
                encoding: "utf8"
              }, function (err, files) {
                if (err) {
                  reject(err);
                  return;
                }

                resolve([].concat((0, _toConsumableArray2["default"])(getCompOpts(files, dirPath)), (0, _toConsumableArray2["default"])(getCompEDOpts(files, dirPath))));
              });
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function readDir(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.readDir = readDir;

var getCompNames = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(dirPaths) {
    var target, index, dirPath, components;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            target = [];
            index = 0;

          case 2:
            if (!(index < dirPaths.length)) {
              _context2.next = 17;
              break;
            }

            dirPath = dirPaths[index];
            _context2.prev = 4;
            _context2.next = 7;
            return readDir(dirPath);

          case 7:
            components = _context2.sent;
            target.push.apply(target, (0, _toConsumableArray2["default"])(components));
            _context2.next = 14;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](4);
            console.log("".concat(dirPath, "\u76EE\u5F55\u4E0D\u5B58\u5728"));

          case 14:
            index++;
            _context2.next = 2;
            break;

          case 17:
            return _context2.abrupt("return", target);

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[4, 11]]);
  }));

  return function getCompNames(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getCompNames = getCompNames;

var getFileName = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var iPath,
        targetPath,
        p,
        fileNames,
        name,
        file,
        _args3 = arguments;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            iPath = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : "";
            _context3.next = 3;
            return (0, _.targetAbsolutePaths)();

          case 3:
            targetPath = _context3.sent;
            p = targetPath.find(function (p) {
              return new RegExp("^".concat(p)).test(iPath);
            });

            if (!p) {
              _context3.next = 11;
              break;
            }

            fileNames = iPath.replace(p, '').split('/');

            if (!(fileNames.length > 1)) {
              _context3.next = 11;
              break;
            }

            name = fileNames[1];
            file = fileNames.find(function (f) {
              return "".concat(name, "ED") === f;
            });
            return _context3.abrupt("return", {
              name: name,
              targetPath: p,
              isED: !!file
            });

          case 11:
            return _context3.abrupt("return", "");

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getFileName() {
    return _ref3.apply(this, arguments);
  };
}();

exports.getFileName = getFileName;

var getCompName = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    var iPath,
        fileOpts,
        name,
        targetPath,
        isED,
        _args4 = arguments;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            iPath = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : "";
            _context4.next = 3;
            return getFileName(iPath);

          case 3:
            fileOpts = _context4.sent;

            if (!fileOpts) {
              _context4.next = 9;
              break;
            }

            name = fileOpts.name, targetPath = fileOpts.targetPath, isED = fileOpts.isED;

            if (!isED) {
              _context4.next = 8;
              break;
            }

            return _context4.abrupt("return", {
              compNames: getCompEDOpts([name], targetPath),
              isED: isED,
              name: name
            });

          case 8:
            return _context4.abrupt("return", {
              compNames: getCompOpts([name], targetPath),
              isED: isED,
              name: name
            });

          case 9:
            return _context4.abrupt("return", null);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getCompName() {
    return _ref4.apply(this, arguments);
  };
}(); // 移除要编译的文件


exports.getCompName = getCompName;

var removeWillBuildFile = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_ref5) {
    var isED,
        name,
        filePath,
        _yield$getConfigOpts,
        outputType,
        nameDir,
        _args5 = arguments;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            isED = _ref5.isED, name = _ref5.name;
            filePath = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : "";
            _context5.next = 4;
            return (0, _.getConfigOpts)();

          case 4:
            _yield$getConfigOpts = _context5.sent;
            outputType = _yield$getConfigOpts.outputType;
            _context5.t0 = _path["default"];
            _context5.next = 9;
            return (0, _.outputPathAbsolutePath)();

          case 9:
            _context5.t1 = _context5.sent;
            _context5.t2 = name;
            nameDir = _context5.t0.join.call(_context5.t0, _context5.t1, _context5.t2);
            _context5.t3 = _rimraf["default"];
            _context5.t4 = _path["default"];
            _context5.t5 = nameDir;
            _context5.next = 17;
            return (0, _.getOutputFile)({
              isMin: false,
              compName: name,
              isEditor: isED
            });

          case 17:
            _context5.t6 = _context5.sent;
            _context5.t7 = _context5.t4.join.call(_context5.t4, _context5.t5, _context5.t6);

            _context5.t3.sync.call(_context5.t3, _context5.t7);

            if (!['all', 'production'].includes(outputType)) {
              _context5.next = 29;
              break;
            }

            _context5.t8 = _rimraf["default"];
            _context5.t9 = _path["default"];
            _context5.t10 = nameDir;
            _context5.next = 26;
            return (0, _.getOutputFile)({
              isMin: true,
              compName: name,
              isEditor: isED
            });

          case 26:
            _context5.t11 = _context5.sent;
            _context5.t12 = _context5.t9.join.call(_context5.t9, _context5.t10, _context5.t11);

            _context5.t8.sync.call(_context5.t8, _context5.t12);

          case 29:
            // 如果文件夹无文件，就把文件夹删除
            if (_fs["default"].existsSync(nameDir)) {
              _fs["default"].readdir(nameDir, function (err, files) {
                if (err) {
                  console.log(err);
                } else if (!(files !== null && files !== void 0 && files.length)) {
                  _rimraf["default"].sync(nameDir);
                }
              });
            }

          case 30:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function removeWillBuildFile(_x3) {
    return _ref6.apply(this, arguments);
  };
}();

exports.removeWillBuildFile = removeWillBuildFile;