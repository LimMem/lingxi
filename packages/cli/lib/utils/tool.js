"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeWillBuildFile = exports.readDir = exports.getFileName = exports.getCompNames = exports.getCompName = exports.cwd = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _lodash = _interopRequireDefault(require("lodash"));

var _rimraf = _interopRequireDefault(require("rimraf"));

var _winPath = _interopRequireDefault(require("./winPath"));

var _ = require(".");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * 命令行执行路径
 */
const cwd = process.cwd;
exports.cwd = cwd;

const getCompEDOpts = (files, dirPath) => {
  const findED = f => {
    return ['.tsx', '.jsx', '.js', '.ts'].find(suffix => _fs.default.existsSync(_path.default.join(dirPath, f, `${f}ED`, `index${suffix}`)));
  };

  const targetED = files.filter(f => !!findED(f)).map(f => ({
    compName: _lodash.default.upperFirst(f),
    path: (0, _winPath.default)(_path.default.join(dirPath, f, `${f}ED`, `index${findED(f)}`)),
    dirName: f,
    relativeInput: `${f}/${f}ED`,
    outputFilePrefix: (0, _.getOutputFilePrefix)(true, f),
    isEditor: true
  }));
  return targetED || [];
};

const getCompOpts = (files, dirPath) => {
  const find = f => {
    return ['.tsx', '.jsx', '.js', '.ts'].find(suffix => _fs.default.existsSync(_path.default.join(dirPath, f, `index${suffix}`)));
  };

  const target = files.filter(f => !!find(f)).map(f => ({
    compName: _lodash.default.upperFirst(f),
    path: (0, _winPath.default)(_path.default.join(dirPath, f, `index${find(f)}`)),
    dirName: f,
    relativeInput: f,
    outputFilePrefix: (0, _.getOutputFilePrefix)(false, f),
    isEditor: false
  }));
  return target || [];
};

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

        resolve([...getCompOpts(files, dirPath), ...getCompEDOpts(files, dirPath)]);
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

const getFileName = (iPath = "") => {
  const targetPath = (0, _.targetAbsolutePaths)();
  const p = targetPath.find(p => new RegExp(`^${p}`).test(iPath));

  if (p) {
    const fileNames = iPath.replace(p, '').split('/');

    if (fileNames.length > 1) {
      let name = fileNames[1];
      const file = fileNames.find(f => `${name}ED` === f);
      return {
        name,
        targetPath: p,
        isED: !!file
      };
    }
  }

  return "";
};

exports.getFileName = getFileName;

const getCompName = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (iPath = "") {
    const fileOpts = getFileName(iPath);

    if (fileOpts) {
      const name = fileOpts.name,
            targetPath = fileOpts.targetPath,
            isED = fileOpts.isED;

      if (isED) {
        return {
          compNames: getCompEDOpts([name], targetPath),
          isED,
          name
        };
      }

      return {
        compNames: getCompOpts([name], targetPath),
        isED,
        name
      };
    }

    return null;
  });

  return function getCompName() {
    return _ref3.apply(this, arguments);
  };
}(); // 移除要编译的文件


exports.getCompName = getCompName;

const removeWillBuildFile = ({
  isED,
  name
}, filePath = "") => {
  const _getConfigOpts = (0, _.getConfigOpts)(),
        minFile = _getConfigOpts.minFile;

  const nameDir = _path.default.join((0, _.outputPathAbsolutePath)(), name);

  _rimraf.default.sync(_path.default.join(nameDir, (0, _.getOutputFile)({
    isMin: false,
    compName: name,
    isEditor: isED
  })));

  if (minFile) {
    _rimraf.default.sync(_path.default.join(nameDir, (0, _.getOutputFile)({
      isMin: true,
      compName: name,
      isEditor: isED
    })));
  } // 如果文件夹无文件，就把文件夹删除


  if (_fs.default.existsSync(nameDir)) {
    _fs.default.readdir(nameDir, (err, files) => {
      if (err) {
        console.log(err);
      } else if (!(files !== null && files !== void 0 && files.length)) {
        _rimraf.default.sync(nameDir);
      }
    });
  }
};

exports.removeWillBuildFile = removeWillBuildFile;