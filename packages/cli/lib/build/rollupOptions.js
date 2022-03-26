"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _path = _interopRequireDefault(require("path"));

var _pluginCommonjs = _interopRequireDefault(require("@rollup/plugin-commonjs"));

var _utils = require("../utils");

var _winPath = _interopRequireDefault(require("../utils/winPath"));

var _rollupPlugins = require("./rollupPlugins");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var _default = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(opts) {
    var compName, outputDir, optsPath, isEditor, _yield$getConfigOpts, outputType, globals, external, namePrefix, name, footer, minFile;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            compName = opts.compName, outputDir = opts.outputDir, optsPath = opts.path, isEditor = opts.isEditor;
            _context.next = 3;
            return (0, _utils.getConfigOpts)();

          case 3:
            _yield$getConfigOpts = _context.sent;
            outputType = _yield$getConfigOpts.outputType;
            globals = _yield$getConfigOpts.globals;
            external = _yield$getConfigOpts.external;
            namePrefix = _yield$getConfigOpts.namePrefix;
            name = "".concat(namePrefix).concat(compName);
            footer = "window.".concat(name, "={};\nwindow.").concat(name, ".__VERSION__=").concat(JSON.stringify((0, _utils.pkgInfo)().version), ";\nwindow.").concat(name, ".__BUILD_DATE__=").concat(JSON.stringify(new Date()));
            minFile = outputType === 'all' || outputType === 'production';
            _context.t0 = [];
            _context.t1 = _toConsumableArray2["default"];

            if (!(outputType === 'all' || outputType === 'development')) {
              _context.next = 44;
              break;
            }

            _context.t3 = optsPath;
            _context.t4 = [].concat((0, _toConsumableArray2["default"])(Object.keys((0, _utils.pkgInfo)().peerDependencies || {})), (0, _toConsumableArray2["default"])(external));
            _context.t5 = [];
            _context.t6 = _toConsumableArray2["default"];
            _context.next = 20;
            return (0, _rollupPlugins.getPlugins)({
              minFile: false,
              isTypeScript: ['.ts', '.tsx'].includes(_path["default"].extname(optsPath)),
              name: name
            });

          case 20:
            _context.t7 = _context.sent;
            _context.t8 = (0, _context.t6)(_context.t7);
            _context.t9 = [(0, _pluginCommonjs["default"])({
              include: /node_modules/
            })];
            _context.t10 = _context.t5.concat.call(_context.t5, _context.t8, _context.t9);
            _context.t11 = _objectSpread({
              'react': "React"
            }, globals || {});
            _context.t12 = name;
            _context.t13 = footer;
            _context.t14 = _winPath["default"];
            _context.t15 = _path["default"];
            _context.t16 = outputDir;
            _context.t17 = compName;
            _context.next = 33;
            return (0, _utils.getOutputFile)({
              isMin: false,
              compName: compName,
              isEditor: isEditor
            });

          case 33:
            _context.t18 = _context.sent;
            _context.t19 = _context.t15.join.call(_context.t15, _context.t16, _context.t17, _context.t18);
            _context.t20 = (0, _context.t14)(_context.t19);
            _context.t21 = {
              format: "umd",
              sourcemap: false,
              globals: _context.t11,
              name: _context.t12,
              footer: _context.t13,
              file: _context.t20
            };
            _context.next = 39;
            return (0, _utils.getOutputFile)({
              isMin: false,
              compName: compName,
              isEditor: isEditor
            });

          case 39:
            _context.t22 = _context.sent;
            _context.t23 = {
              input: _context.t3,
              external: _context.t4,
              plugins: _context.t10,
              output: _context.t21,
              exportFileName: _context.t22
            };
            _context.t2 = [_context.t23];
            _context.next = 45;
            break;

          case 44:
            _context.t2 = [];

          case 45:
            _context.t24 = _context.t2;
            _context.t25 = (0, _context.t1)(_context.t24);
            _context.t26 = _toConsumableArray2["default"];

            if (!minFile) {
              _context.next = 79;
              break;
            }

            _context.t28 = optsPath;
            _context.t29 = [].concat((0, _toConsumableArray2["default"])(Object.keys((0, _utils.pkgInfo)().peerDependencies || {})), (0, _toConsumableArray2["default"])(external));
            _context.t30 = [];
            _context.t31 = _toConsumableArray2["default"];
            _context.next = 55;
            return (0, _rollupPlugins.getPlugins)({
              minFile: minFile,
              isTypeScript: ['.ts', '.tsx'].includes(_path["default"].extname(optsPath)),
              name: name
            });

          case 55:
            _context.t32 = _context.sent;
            _context.t33 = (0, _context.t31)(_context.t32);
            _context.t34 = [(0, _pluginCommonjs["default"])({
              include: /node_modules/
            })];
            _context.t35 = _context.t30.concat.call(_context.t30, _context.t33, _context.t34);
            _context.t36 = _objectSpread({
              'react': "React"
            }, globals || {});
            _context.t37 = name;
            _context.t38 = footer;
            _context.t39 = _winPath["default"];
            _context.t40 = _path["default"];
            _context.t41 = outputDir;
            _context.t42 = compName;
            _context.next = 68;
            return (0, _utils.getOutputFile)({
              isMin: true,
              compName: compName,
              isEditor: isEditor
            });

          case 68:
            _context.t43 = _context.sent;
            _context.t44 = _context.t40.join.call(_context.t40, _context.t41, _context.t42, _context.t43);
            _context.t45 = (0, _context.t39)(_context.t44);
            _context.t46 = {
              format: "umd",
              sourcemap: false,
              globals: _context.t36,
              name: _context.t37,
              footer: _context.t38,
              file: _context.t45
            };
            _context.next = 74;
            return (0, _utils.getOutputFile)({
              isMin: true,
              compName: compName,
              isEditor: isEditor
            });

          case 74:
            _context.t47 = _context.sent;
            _context.t48 = {
              input: _context.t28,
              external: _context.t29,
              plugins: _context.t35,
              output: _context.t46,
              exportFileName: _context.t47
            };
            _context.t27 = [_context.t48];
            _context.next = 80;
            break;

          case 79:
            _context.t27 = [];

          case 80:
            _context.t49 = _context.t27;
            _context.t50 = (0, _context.t26)(_context.t49);
            return _context.abrupt("return", _context.t0.concat.call(_context.t0, _context.t25, _context.t50));

          case 83:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;