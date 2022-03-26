"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _rollup = require("rollup");

var _chalk = _interopRequireDefault(require("chalk"));

var _rimraf = _interopRequireDefault(require("rimraf"));

var _nodeWatch = _interopRequireDefault(require("node-watch"));

var _tool = require("./utils/tool");

var _utils = require("./utils");

var _rollupOptions = _interopRequireDefault(require("./build/rollupOptions"));

var _excluded = ["output", "exportFileName"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

/**
 * 编译单个组件
 * @param compInfo 
 */
var rollupBuildSingleFile = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(compInfo) {
    var opts, j, _opts$j, output, exportFileName, input, bundle;

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
              _context.next = 24;
              break;
            }

            _opts$j = opts[j], output = _opts$j.output, exportFileName = _opts$j.exportFileName, input = (0, _objectWithoutProperties2["default"])(_opts$j, _excluded); // 开始编译

            _context.next = 17;
            return (0, _rollup.rollup)(input);

          case 17:
            bundle = _context.sent;
            _context.next = 20;
            return bundle.write(output
            /** 类型校验错误 */
            );

          case 20:
            console.log(_chalk["default"].green("".concat(compInfo.relativeInput, " ---> ").concat(exportFileName)));

          case 21:
            j++;
            _context.next = 13;
            break;

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function rollupBuildSingleFile(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * 编译所有组件
 * @param compNames 
 */


var rollupAllBuild = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(compNames) {
    var index, compInfo;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            index = 0;

          case 1:
            if (!(index < compNames.length)) {
              _context2.next = 8;
              break;
            }

            compInfo = compNames[index];
            _context2.next = 5;
            return rollupBuildSingleFile(compInfo);

          case 5:
            index++;
            _context2.next = 1;
            break;

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function rollupAllBuild(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var build = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(opts) {
    var _opts$watch, w, _yield$getConfigOpts, libraryDir, targetAbsolutePath, compNames, nodeWatcher;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _opts$watch = opts.watch, w = _opts$watch === void 0 ? false : _opts$watch;
            _context4.next = 3;
            return (0, _utils.getConfigOpts)();

          case 3:
            _yield$getConfigOpts = _context4.sent;
            libraryDir = _yield$getConfigOpts.libraryDir;
            _context4.next = 7;
            return (0, _utils.targetAbsolutePaths)();

          case 7:
            targetAbsolutePath = _context4.sent;
            _context4.t0 = _rimraf["default"];
            _context4.next = 11;
            return (0, _utils.outputPathAbsolutePath)();

          case 11:
            _context4.t1 = _context4.sent;

            _context4.t0.sync.call(_context4.t0, _context4.t1);

            _context4.next = 15;
            return (0, _tool.getCompNames)(targetAbsolutePath);

          case 15:
            compNames = _context4.sent;
            _context4.next = 18;
            return rollupAllBuild(compNames);

          case 18:
            if (w) {
              nodeWatcher = (0, _nodeWatch["default"])(targetAbsolutePath, {
                recursive: true
              }, /*#__PURE__*/function () {
                var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(eventType, filePath) {
                  var _yield$getCompName, isED, _yield$getCompName$co, compNames, name;

                  return _regenerator["default"].wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          _context3.next = 2;
                          return (0, _tool.getCompName)(filePath);

                        case 2:
                          _yield$getCompName = _context3.sent;
                          isED = _yield$getCompName.isED;
                          _yield$getCompName$co = _yield$getCompName.compNames;
                          compNames = _yield$getCompName$co === void 0 ? [] : _yield$getCompName$co;
                          name = _yield$getCompName.name;
                          (0, _tool.removeWillBuildFile)({
                            isED: isED,
                            name: name
                          }, filePath);
                          rollupAllBuild(compNames);
                          isED ? console.log(_chalk["default"].blue("".concat(eventType, "\u7EC4\u4EF6: ").concat(name, "/").concat(name, "ED"))) : console.log(_chalk["default"].blue("update ".concat(name)));

                        case 10:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                }));

                return function (_x4, _x5) {
                  return _ref4.apply(this, arguments);
                };
              }());
              console.log(_chalk["default"].yellow("\u6B63\u5728\u76D1\u542C: ".concat(libraryDir)));
              process.on("SIGINT", function () {
                nodeWatcher.close();
              });
            } else {
              console.log();
              console.log(_chalk["default"].green("\uD83C\uDF08\uD83C\uDF7B\u7F16\u8BD1\u5B8C\u6210\u3002"));
            }

          case 19:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function build(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

module.exports = build;