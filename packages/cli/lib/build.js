"use strict";

var _rollup = require("rollup");

var _chalk = _interopRequireDefault(require("chalk"));

var _rimraf = _interopRequireDefault(require("rimraf"));

var _nodeWatch = _interopRequireDefault(require("node-watch"));

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

/**
 * 编译单个组件
 * @param compInfo 
 */
const rollupBuildSingleFile = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (compInfo) {
    const opts = (0, _rollupOptions.default)(_objectSpread(_objectSpread({}, compInfo), {}, {
      outputDir: (0, _utils.outputPathAbsolutePath)()
    }));

    for (let j = 0; j < opts.length; j++) {
      const _opts$j = opts[j],
            output = _opts$j.output,
            exportFileName = _opts$j.exportFileName,
            input = _objectWithoutProperties(_opts$j, _excluded); // 开始编译


      const bundle = yield (0, _rollup.rollup)(input);
      yield bundle.write(output
      /** 类型校验错误 */
      );
      console.log(_chalk.default.green(`${compInfo.relativeInput} ---> ${exportFileName}`));
    }
  });

  return function rollupBuildSingleFile(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * 编译所有组件
 * @param compNames 
 */


const rollupAllBuild = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (compNames) {
    for (let index = 0; index < compNames.length; index++) {
      const compInfo = compNames[index];
      yield rollupBuildSingleFile(compInfo);
    }
  });

  return function rollupAllBuild(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

const build = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (opts) {
    const _opts$watch = opts.watch,
          w = _opts$watch === void 0 ? false : _opts$watch;
    const targetAbsolutePath = (0, _utils.targetAbsolutePaths)();

    _rimraf.default.sync((0, _utils.outputPathAbsolutePath)());

    const compNames = yield (0, _tool.getCompNames)(targetAbsolutePath);
    yield rollupAllBuild(compNames);

    if (w) {
      const nodeWatcher = (0, _nodeWatch.default)(targetAbsolutePath, {
        recursive: true
      }, /*#__PURE__*/function () {
        var _ref4 = _asyncToGenerator(function* (eventType, filePath) {
          const _yield$getCompName = yield (0, _tool.getCompName)(filePath),
                isED = _yield$getCompName.isED,
                _yield$getCompName$co = _yield$getCompName.compNames,
                compNames = _yield$getCompName$co === void 0 ? [] : _yield$getCompName$co,
                name = _yield$getCompName.name;

          (0, _tool.removeWillBuildFile)({
            isED,
            name
          }, filePath);
          rollupAllBuild(compNames);
          isED ? console.log(_chalk.default.blue(`${eventType}组件: ${name}/${name}ED`)) : console.log(_chalk.default.blue(`update ${name}`));
        });

        return function (_x4, _x5) {
          return _ref4.apply(this, arguments);
        };
      }());
      console.log(_chalk.default.yellow(`正在监听: ${(0, _utils.getConfigOpts)().libraryDir}`));
      process.on("SIGINT", () => {
        nodeWatcher.close();
      });
    } else {
      console.log();
      console.log(_chalk.default.green(`🌈🍻编译完成。`));
    }
  });

  return function build(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

module.exports = build;