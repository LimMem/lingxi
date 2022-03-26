import { GetConfigOptsFunction } from '..';
/**
 * 获取用户配置
 * @returns 用户配置
 */
export declare const getConfigOpts: GetConfigOptsFunction;
/**
 * 库目标绝对路径
 */
export declare const targetAbsolutePaths: () => Promise<string[]>;
/**
 * 输出文件夹
 */
export declare const outputPathAbsolutePath: () => Promise<string>;
/**
 * tsconfig.json 路径
 */
export declare const tsconfigPath: () => string;
/**
 * pkg路径
 */
export declare const pkgPath: () => string;
/**
 * pkg信息
 */
export declare const pkgInfo: () => any;
/**
 * 获取输出路径前缀
 * @param isEditor
 * @param compName
 * @returns
 */
export declare const getOutputFilePrefix: (isEditor: any, compName: any) => any;
/**
 * 获取输出文件名
 * @param param0
 * @returns
 */
export declare const getOutputFile: ({ isMin, compName, isEditor }: {
    isMin?: boolean;
    compName: any;
    isEditor: any;
}) => Promise<string>;
