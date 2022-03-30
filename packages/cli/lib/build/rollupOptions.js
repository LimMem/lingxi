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

var _dayjs = _interopRequireDefault(require("dayjs"));

var _rollupPlugins = require("./rollupPlugins");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var getDefaultExternal = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var _yield$getConfigOpts, platform;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _utils.getConfigOpts)();

          case 2:
            _yield$getConfigOpts = _context.sent;
            platform = _yield$getConfigOpts.platform;

            if (!(platform === 'app')) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", ['react', 'antd-mobile', 'classnames', '@alitajs/dform', '@alitajs/antd-mobile-plus']);

          case 6:
            return _context.abrupt("return", ['react', 'antd', 'classnames']);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getDefaultExternal() {
    return _ref.apply(this, arguments);
  };
}();

var getDefaultGlobals = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var _yield$getConfigOpts2, platform;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _utils.getConfigOpts)();

          case 2:
            _yield$getConfigOpts2 = _context2.sent;
            platform = _yield$getConfigOpts2.platform;

            if (!(platform === 'app')) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", {
              'react': "React",
              'antd-mobile': "AntdMobile",
              'classnames': "classNames",
              '@alitajs/dform': "Dform",
              '@alitajs/antd-mobile-plus': "AntdMobilePlus"
            });

          case 6:
            return _context2.abrupt("return", {
              'react': "React",
              'antd': "Antd",
              'classnames': "classNames"
            });

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getDefaultGlobals() {
    return _ref2.apply(this, arguments);
  };
}();

var _default = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(opts) {
    var compName, outputDir, optsPath, isEditor, server, _yield$getConfigOpts3, outputType, globals, external, namePrefix, name, footer, minFile;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            compName = opts.compName, outputDir = opts.outputDir, optsPath = opts.path, isEditor = opts.isEditor, server = opts.server;
            _context3.next = 3;
            return (0, _utils.getConfigOpts)();

          case 3:
            _yield$getConfigOpts3 = _context3.sent;
            outputType = _yield$getConfigOpts3.outputType;
            globals = _yield$getConfigOpts3.globals;
            external = _yield$getConfigOpts3.external;
            namePrefix = _yield$getConfigOpts3.namePrefix;
            name = "".concat(namePrefix).concat(compName);
            footer = "window.".concat(name, "={\n  __VERSION__: ").concat(JSON.stringify((0, _utils.pkgInfo)().version), ",\n  __BUILD_DATE__: ").concat(JSON.stringify((0, _dayjs["default"])(new Date()).format('YYYY-MM-DD HH:mm:ss')), "\n};");
            minFile = outputType === 'all' || outputType === 'production';
            _context3.t0 = [];
            _context3.t1 = _toConsumableArray2["default"];

            if (!(outputType === 'all' || outputType === 'development')) {
              _context3.next = 44;
              break;
            }

            _context3.t3 = optsPath;
            _context3.t4 = [].concat((0, _toConsumableArray2["default"])(Object.keys((0, _utils.pkgInfo)().peerDependencies || {})), (0, _toConsumableArray2["default"])(external));
            _context3.t5 = [];
            _context3.t6 = _toConsumableArray2["default"];
            _context3.next = 20;
            return (0, _rollupPlugins.getPlugins)({
              server: server,
              minFile: false,
              isTypeScript: ['.ts', '.tsx'].includes(_path["default"].extname(optsPath)),
              name: name,
              compName: compName
            });

          case 20:
            _context3.t7 = _context3.sent;
            _context3.t8 = (0, _context3.t6)(_context3.t7);
            _context3.t9 = [(0, _pluginCommonjs["default"])({
              include: /node_modules/
            })];
            _context3.t10 = _context3.t5.concat.call(_context3.t5, _context3.t8, _context3.t9);
            _context3.t11 = _objectSpread({
              // ...await getDefaultGlobals(),
              'react': "React"
            }, globals || {});
            _context3.t12 = name;
            _context3.t13 = footer;
            _context3.t14 = _winPath["default"];
            _context3.t15 = _path["default"];
            _context3.t16 = outputDir;
            _context3.t17 = compName;
            _context3.next = 33;
            return (0, _utils.getOutputFile)({
              isMin: false,
              compName: compName,
              isEditor: isEditor
            });

          case 33:
            _context3.t18 = _context3.sent;
            _context3.t19 = _context3.t15.join.call(_context3.t15, _context3.t16, _context3.t17, _context3.t18);
            _context3.t20 = (0, _context3.t14)(_context3.t19);
            _context3.t21 = {
              format: "umd",
              sourcemap: false,
              globals: _context3.t11,
              name: _context3.t12,
              footer: _context3.t13,
              file: _context3.t20
            };
            _context3.next = 39;
            return (0, _utils.getOutputFile)({
              isMin: false,
              compName: compName,
              isEditor: isEditor
            });

          case 39:
            _context3.t22 = _context3.sent;
            _context3.t23 = {
              input: _context3.t3,
              external: _context3.t4,
              plugins: _context3.t10,
              output: _context3.t21,
              exportFileName: _context3.t22,
              min: false
            };
            _context3.t2 = [_context3.t23];
            _context3.next = 45;
            break;

          case 44:
            _context3.t2 = [];

          case 45:
            _context3.t24 = _context3.t2;
            _context3.t25 = (0, _context3.t1)(_context3.t24);
            _context3.t26 = _toConsumableArray2["default"];

            if (!minFile) {
              _context3.next = 79;
              break;
            }

            _context3.t28 = optsPath;
            _context3.t29 = [].concat((0, _toConsumableArray2["default"])(Object.keys((0, _utils.pkgInfo)().peerDependencies || {})), (0, _toConsumableArray2["default"])(external));
            _context3.t30 = [];
            _context3.t31 = _toConsumableArray2["default"];
            _context3.next = 55;
            return (0, _rollupPlugins.getPlugins)({
              server: server,
              minFile: minFile,
              isTypeScript: ['.ts', '.tsx'].includes(_path["default"].extname(optsPath)),
              name: name,
              compName: compName
            });

          case 55:
            _context3.t32 = _context3.sent;
            _context3.t33 = (0, _context3.t31)(_context3.t32);
            _context3.t34 = [(0, _pluginCommonjs["default"])({
              include: /node_modules/
            })];
            _context3.t35 = _context3.t30.concat.call(_context3.t30, _context3.t33, _context3.t34);
            _context3.t36 = _objectSpread({
              // ...await getDefaultGlobals(),
              'react': "React"
            }, globals || {});
            _context3.t37 = name;
            _context3.t38 = footer;
            _context3.t39 = _winPath["default"];
            _context3.t40 = _path["default"];
            _context3.t41 = outputDir;
            _context3.t42 = compName;
            _context3.next = 68;
            return (0, _utils.getOutputFile)({
              isMin: true,
              compName: compName,
              isEditor: isEditor
            });

          case 68:
            _context3.t43 = _context3.sent;
            _context3.t44 = _context3.t40.join.call(_context3.t40, _context3.t41, _context3.t42, _context3.t43);
            _context3.t45 = (0, _context3.t39)(_context3.t44);
            _context3.t46 = {
              format: "umd",
              sourcemap: false,
              globals: _context3.t36,
              name: _context3.t37,
              footer: _context3.t38,
              file: _context3.t45
            };
            _context3.next = 74;
            return (0, _utils.getOutputFile)({
              isMin: true,
              compName: compName,
              isEditor: isEditor
            });

          case 74:
            _context3.t47 = _context3.sent;
            _context3.t48 = {
              min: true,
              input: _context3.t28,
              external: _context3.t29,
              plugins: _context3.t35,
              output: _context3.t46,
              exportFileName: _context3.t47
            };
            _context3.t27 = [_context3.t48];
            _context3.next = 80;
            break;

          case 79:
            _context3.t27 = [];

          case 80:
            _context3.t49 = _context3.t27;
            _context3.t50 = (0, _context3.t26)(_context3.t49);
            return _context3.abrupt("return", _context3.t0.concat.call(_context3.t0, _context3.t25, _context3.t50));

          case 83:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x) {
    return _ref3.apply(this, arguments);
  };
}();

exports["default"] = _default;