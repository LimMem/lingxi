"use strict";

var _rollup = require("rollup");

var _chalk = _interopRequireDefault(require("chalk"));

var _rimraf = _interopRequireDefault(require("rimraf"));

var _tool = require("./utils/tool");

var _utils = require("./utils");

var _rollupOptions = _interopRequireDefault(require("./build/rollupOptions"));

const _excluded = ["output", "exportFileName"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_asyncToGenerator(function* () {
  const targetAbsolutePath = (0, _utils.targetAbsolutePaths)();
  const compNames = yield (0, _tool.getCompNames)(targetAbsolutePath);

  _rimraf.default.sync(_utils.outputPathAbsolutePath);

  for (let index = 0; index < compNames.length; index++) {
    const compInfo = compNames[index];
    const opts = (0, _rollupOptions.default)(_objectSpread(_objectSpread({}, compInfo), {}, {
      outputDir: _utils.outputPathAbsolutePath
    }));

    for (let j = 0; j < opts.length; j++) {
      const _opts$j = opts[j],
            output = _opts$j.output,
            exportFileName = _opts$j.exportFileName,
            input = _objectWithoutProperties(_opts$j, _excluded);

      const bundle = yield (0, _rollup.rollup)(input);
      yield bundle.write(output
      /** 类型校验错误 */
      );
      console.log(_chalk.default.green(`${compInfo.relativeInput} ---> ${exportFileName}`));
    }
  }

  console.log();
  console.log(_chalk.default.green(`🌈🍻编译完成。`));
})();