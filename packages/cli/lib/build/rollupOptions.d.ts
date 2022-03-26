declare const _default: (opts: any) => Promise<{
    input: any;
    external: string[];
    plugins: import("rollup").Plugin[];
    output: {
        format: string;
        sourcemap: boolean;
        globals: {
            react: string;
        };
        name: string;
        footer: string;
        file: string;
    };
    exportFileName: string;
}[]>;
export default _default;
