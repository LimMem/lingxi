"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

// 兼容mac和win的路径
function _default(path) {
  const isExtendedLengthPath = /^\\\\\?\\/.test(path);

  if (isExtendedLengthPath) {
    return path;
  }

  return path.replace(/\\/g, '/');
}