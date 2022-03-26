"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  fsExtra: true,
  rimraf: true,
  mustache: true,
  chokidar: true
};
Object.defineProperty(exports, "chokidar", {
  enumerable: true,
  get: function get() {
    return _chokidar.default;
  }
});
exports.default = void 0;
Object.defineProperty(exports, "fsExtra", {
  enumerable: true,
  get: function get() {
    return _fsExtra.default;
  }
});
Object.defineProperty(exports, "mustache", {
  enumerable: true,
  get: function get() {
    return _mustache.default;
  }
});
Object.defineProperty(exports, "rimraf", {
  enumerable: true,
  get: function get() {
    return _rimraf.default;
  }
});

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _rimraf = _interopRequireDefault(require("rimraf"));

var _mustache = _interopRequireDefault(require("mustache"));

var _chokidar = _interopRequireDefault(require("chokidar"));

var _utils = require("./utils");

Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _utils[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _utils[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Aclass {
  constructor() {}

  getAction() {}

}

var _default = Aclass;
exports.default = _default;