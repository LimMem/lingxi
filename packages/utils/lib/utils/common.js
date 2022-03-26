"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cwd = void 0;
exports.requireLib = requireLib;

/**
 * 获取命令文件路径
 */
const cwd = process.cwd();
/**
 * 获取文件导出
 * @param path 路径
 * @returns object 对象
 */

exports.cwd = cwd;

function requireLib(path) {
  const lib = require(path);

  if (lib && lib.default) {
    return lib.default;
  }

  return lib;
}