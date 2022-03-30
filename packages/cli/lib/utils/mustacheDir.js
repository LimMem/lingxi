"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _mustache = _interopRequireDefault(require("mustache"));

var _mkdirp = _interopRequireDefault(require("mkdirp"));

var mustacheRender = function mustacheRender(_ref, _ref2) {
  var input = _ref.input,
      output = _ref.output,
      fileName = _ref.fileName;
  var outputDir = _ref2.outputDir,
      opts = _ref2.opts;

  var absInputPath = _path["default"].join(__dirname, input);

  _mkdirp["default"].sync(_path["default"].dirname(_path["default"].join(outputDir, output)));

  var contentTpl = _fs["default"].readFileSync(absInputPath, {
    encoding: 'utf-8'
  });

  var contentText = _mustache["default"].render(contentTpl, opts);

  _fs["default"].writeFileSync(_path["default"].join(outputDir, output), contentText, {
    encoding: "utf-8"
  });
};

var readInputDirSync = function readInputDirSync(src) {
  var dirPath = _path["default"].join(__dirname, src);

  if (!_fs["default"].lstatSync(dirPath).isDirectory()) {
    return;
  }

  var fileList = [];

  function recursiveDir(dir, prefix) {
    var files = _fs["default"].readdirSync(_path["default"].join(__dirname, dir), {
      encoding: "utf-8"
    });

    files.forEach(function (file) {
      var lstat = _fs["default"].lstatSync(_path["default"].join(__dirname, dir, file));

      if (lstat.isDirectory()) {
        recursiveDir("".concat(dir, "/").concat(file), "".concat(prefix ? prefix + "/" : "").concat(file));
      } else {
        fileList.push({
          input: "".concat(dir, "/").concat(file),
          output: "".concat(prefix ? prefix + "/" : "").concat(file.replace(/\.tpl$/, "")),
          fileName: file
        });
      }
    });
  }

  recursiveDir(src, '');
  return fileList;
};

var _default = function _default(_ref3) {
  var type = _ref3.type,
      outputDir = _ref3.outputDir,
      opts = _ref3.opts;
  var files = readInputDirSync("../../template/".concat(type));
  files.forEach(function (file) {
    mustacheRender(file, {
      outputDir: outputDir,
      opts: opts
    });
  });
};

exports["default"] = _default;