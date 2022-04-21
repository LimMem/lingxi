"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBabelConfig = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _utils = require("../utils");

var getBabelConfig = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var _yield$getConfigOpts, targets, babelOptions;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _utils.getConfigOpts)();

          case 2:
            _yield$getConfigOpts = _context.sent;
            targets = _yield$getConfigOpts.targets;
            babelOptions = _yield$getConfigOpts.babelOptions;
            return _context.abrupt("return", {
              babelrc: false,
              configFile: false,
              babelHelpers: "inline",
              extensions: ['.js', '.jsx', '.ts', '.tsx', '.es6', '.es', '.mjs'],
              presets: [[require.resolve("@babel/preset-typescript")], [require.resolve('@babel/preset-env'), {
                modules: "auto",
                targets: targets
              }], [require.resolve('@babel/preset-react')]].concat((0, _toConsumableArray2["default"])((babelOptions === null || babelOptions === void 0 ? void 0 : babelOptions.presets) || [])),
              plugins: [// [require.resolve('babel-plugin-import'), { libraryName: "antd-mobile", style: "true" }],
              [require.resolve('babel-plugin-react-require')], require.resolve('@babel/plugin-syntax-dynamic-import'), require.resolve('@babel/plugin-proposal-export-default-from'), require.resolve('@babel/plugin-proposal-export-namespace-from'), require.resolve('@babel/plugin-proposal-do-expressions'), require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'), require.resolve('@babel/plugin-proposal-optional-chaining'), [require.resolve('@babel/plugin-proposal-decorators'), {
                legacy: true
              }], [require.resolve('@babel/plugin-proposal-class-properties'), {
                loose: true
              }], [require.resolve('@babel/plugin-proposal-private-methods'), {
                "loose": true
              }], [require.resolve('@babel/plugin-proposal-private-property-in-object'), {
                "loose": true
              }]].concat((0, _toConsumableArray2["default"])((babelOptions === null || babelOptions === void 0 ? void 0 : babelOptions.plugins) || [])),
              exclude: /\/node_modules\//
            });

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getBabelConfig() {
    return _ref.apply(this, arguments);
  };
}();

exports.getBabelConfig = getBabelConfig;