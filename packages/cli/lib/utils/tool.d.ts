/**
 * 命令行执行路径
 */
export declare const cwd: () => string;
export declare const readDir: (dirPath: any) => Promise<any[]>;
export declare const getCompNames: (dirPaths: any) => Promise<any[]>;
export declare const getFileName: (iPath?: string) => Promise<"" | {
    name: string;
    targetPath: string;
    isED: boolean;
}>;
export declare const getCompName: (iPath?: string) => Promise<{
    compNames: any;
    isED: boolean;
    name: string;
}>;
export declare const removeWillBuildFile: ({ isED, name }: {
    isED: any;
    name: any;
}, filePath?: string) => Promise<void>;
