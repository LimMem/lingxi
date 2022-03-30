declare const _default: (opts: any) => Promise<{
    input: any;
    external: string[];
    plugins: any[];
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
    min: boolean;
}[]>;
export default _default;
