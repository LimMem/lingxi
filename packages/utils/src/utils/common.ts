/**
 * 获取命令文件路径
 */
export const cwd = process.cwd();

/**
 * 获取文件导出
 * @param path 路径
 * @returns object 对象
 */
export function requireLib(path) { 
  const lib = require(path);
  if (lib && lib.default) {
    return lib.default;
  }
  return lib;
}