/**
 * 命令行执行路径
 */
export declare const cwd: () => string;
export declare function getCompileInfo(compName?: string): Promise<any>;
/**
 * 获取文件夹下所有文件
 */
export declare function getAllCompName(): Promise<string[]>;
