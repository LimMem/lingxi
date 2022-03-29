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
              _context3.next = 60;
              break;
            }

            _context3.t3 = optsPath;
            _context3.t4 = [];
            _context3.t5 = _toConsumableArray2["default"];
            _context3.next = 19;
            return getDefaultExternal();

          case 19:
            _context3.t6 = _context3.sent;
            _context3.t7 = (0, _context3.t5)(_context3.t6);
            _context3.t8 = (0, _toConsumableArray2["default"])(Object.keys((0, _utils.pkgInfo)().peerDependencies || {}));
            _context3.t9 = (0, _toConsumableArray2["default"])(external);
            _context3.t10 = _context3.t4.concat.call(_context3.t4, _context3.t7, _context3.t8, _context3.t9);
            _context3.t11 = [];
            _context3.t12 = _toConsumableArray2["default"];
            _context3.next = 28;
            return (0, _rollupPlugins.getPlugins)({
              server: server,
              minFile: false,
              isTypeScript: ['.ts', '.tsx'].includes(_path["default"].extname(optsPath)),
              name: name,
              compName: compName
            });

          case 28:
            _context3.t13 = _context3.sent;
            _context3.t14 = (0, _context3.t12)(_context3.t13);
            _context3.t15 = [(0, _pluginCommonjs["default"])({
              include: /node_modules/
            })];
            _context3.t16 = _context3.t11.concat.call(_context3.t11, _context3.t14, _context3.t15);
            _context3.t17 = _objectSpread;
            _context3.t18 = _objectSpread;
            _context3.t19 = {};
            _context3.next = 37;
            return getDefaultGlobals();

          case 37:
            _context3.t20 = _context3.sent;
            _context3.t21 = (0, _context3.t18)(_context3.t19, _context3.t20);
            _context3.t22 = globals || {};
            _context3.t23 = (0, _context3.t17)(_context3.t21, _context3.t22);
            _context3.t24 = name;
            _context3.t25 = footer;
            _context3.t26 = _winPath["default"];
            _context3.t27 = _path["default"];
            _context3.t28 = outputDir;
            _context3.t29 = compName;
            _context3.next = 49;
            return (0, _utils.getOutputFile)({
              isMin: false,
              compName: compName,
              isEditor: isEditor
            });

          case 49:
            _context3.t30 = _context3.sent;
            _context3.t31 = _context3.t27.join.call(_context3.t27, _context3.t28, _context3.t29, _context3.t30);
            _context3.t32 = (0, _context3.t26)(_context3.t31);
            _context3.t33 = {
              format: "umd",
              sourcemap: false,
              globals: _context3.t23,
              name: _context3.t24,
              footer: _context3.t25,
              file: _context3.t32
            };
            _context3.next = 55;
            return (0, _utils.getOutputFile)({
              isMin: false,
              compName: compName,
              isEditor: isEditor
            });

          case 55:
            _context3.t34 = _context3.sent;
            _context3.t35 = {
              input: _context3.t3,
              external: _context3.t10,
              plugins: _context3.t16,
              output: _context3.t33,
              exportFileName: _context3.t34,
              min: false
            };
            _context3.t2 = [_context3.t35];
            _context3.next = 61;
            break;

          case 60:
            _context3.t2 = [];

          case 61:
            _context3.t36 = _context3.t2;
            _context3.t37 = (0, _context3.t1)(_context3.t36);
            _context3.t38 = _toConsumableArray2["default"];

            if (!minFile) {
              _context3.next = 111;
              break;
            }

            _context3.t40 = optsPath;
            _context3.t41 = [];
            _context3.t42 = _toConsumableArray2["default"];
            _context3.next = 70;
            return getDefaultExternal();

          case 70:
            _context3.t43 = _context3.sent;
            _context3.t44 = (0, _context3.t42)(_context3.t43);
            _context3.t45 = (0, _toConsumableArray2["default"])(Object.keys((0, _utils.pkgInfo)().peerDependencies || {}));
            _context3.t46 = (0, _toConsumableArray2["default"])(external);
            _context3.t47 = _context3.t41.concat.call(_context3.t41, _context3.t44, _context3.t45, _context3.t46);
            _context3.t48 = [];
            _context3.t49 = _toConsumableArray2["default"];
            _context3.next = 79;
            return (0, _rollupPlugins.getPlugins)({
              server: server,
              minFile: minFile,
              isTypeScript: ['.ts', '.tsx'].includes(_path["default"].extname(optsPath)),
              name: name,
              compName: compName
            });

          case 79:
            _context3.t50 = _context3.sent;
            _context3.t51 = (0, _context3.t49)(_context3.t50);
            _context3.t52 = [(0, _pluginCommonjs["default"])({
              include: /node_modules/
            })];
            _context3.t53 = _context3.t48.concat.call(_context3.t48, _context3.t51, _context3.t52);
            _context3.t54 = _objectSpread;
            _context3.t55 = _objectSpread;
            _context3.t56 = {};
            _context3.next = 88;
            return getDefaultGlobals();

          case 88:
            _context3.t57 = _context3.sent;
            _context3.t58 = (0, _context3.t55)(_context3.t56, _context3.t57);
            _context3.t59 = globals || {};
            _context3.t60 = (0, _context3.t54)(_context3.t58, _context3.t59);
            _context3.t61 = name;
            _context3.t62 = footer;
            _context3.t63 = _winPath["default"];
            _context3.t64 = _path["default"];
            _context3.t65 = outputDir;
            _context3.t66 = compName;
            _context3.next = 100;
            return (0, _utils.getOutputFile)({
              isMin: true,
              compName: compName,
              isEditor: isEditor
            });

          case 100:
            _context3.t67 = _context3.sent;
            _context3.t68 = _context3.t64.join.call(_context3.t64, _context3.t65, _context3.t66, _context3.t67);
            _context3.t69 = (0, _context3.t63)(_context3.t68);
            _context3.t70 = {
              format: "umd",
              sourcemap: false,
              globals: _context3.t60,
              name: _context3.t61,
              footer: _context3.t62,
              file: _context3.t69
            };
            _context3.next = 106;
            return (0, _utils.getOutputFile)({
              isMin: true,
              compName: compName,
              isEditor: isEditor
            });

          case 106:
            _context3.t71 = _context3.sent;
            _context3.t72 = {
              min: true,
              input: _context3.t40,
              external: _context3.t47,
              plugins: _context3.t53,
              output: _context3.t70,
              exportFileName: _context3.t71
            };
            _context3.t39 = [_context3.t72];
            _context3.next = 112;
            break;

          case 111:
            _context3.t39 = [];

          case 112:
            _context3.t73 = _context3.t39;
            _context3.t74 = (0, _context3.t38)(_context3.t73);
            return _context3.abrupt("return", _context3.t0.concat.call(_context3.t0, _context3.t37, _context3.t74));

          case 115:
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