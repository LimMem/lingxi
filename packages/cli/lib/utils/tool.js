"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readDir = exports.getCompNames = exports.cwd = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _lodash = _interopRequireDefault(require("lodash"));

var _winPath = _interopRequireDefault(require("./winPath"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * 命令行执行路径
 */
const cwd = process.cwd();
exports.cwd = cwd;

const readDir = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (dirPath) {
    return new Promise((resolve, reject) => {
      if (!_fs.default.existsSync(dirPath)) {
        reject("文件不存在");
        return;
      }

      _fs.default.readdir(dirPath, {
        encoding: "utf8"
      }, (err, files) => {
        if (err) {
          reject(err);
          return;
        }

        const find = f => {
          return ['.tsx', '.jsx', '.js', '.ts'].find(suffix => _fs.default.existsSync(_path.default.join(dirPath, f, `index${suffix}`)));
        };

        const target = files.filter(f => !!find(f)).map(f => ({
          compName: _lodash.default.upperFirst(f),
          path: (0, _winPath.default)(_path.default.join(dirPath, f, `index${find(f)}`)),
          dirName: f,
          relativeInput: f,
          outputFilePrefix: f
        }));

        const findED = f => {
          return ['.tsx', '.jsx', '.js', '.ts'].find(suffix => _fs.default.existsSync(_path.default.join(dirPath, f, `${f}ED`, `index${suffix}`)));
        };

        const targetED = files.filter(f => !!findED(f)).map(f => ({
          compName: _lodash.default.upperFirst(f),
          path: (0, _winPath.default)(_path.default.join(dirPath, f, `${f}ED`, `index${findED(f)}`)),
          dirName: f,
          relativeInput: `${f}/${f}ED`,
          outputFilePrefix: `${f}.editor`
        }));
        resolve([...target, ...targetED]);
      });
    });
  });

  return function readDir(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.readDir = readDir;

const getCompNames = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (dirPaths) {
    const target = [];

    for (let index = 0; index < dirPaths.length; index++) {
      const dirPath = dirPaths[index];

      try {
        const components = yield readDir(dirPath);
        target.push(...components);
      } catch (error) {
        console.log(`${dirPath}目录不存在`);
      }
    }

    return target;
  });

  return function getCompNames(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getCompNames = getCompNames;