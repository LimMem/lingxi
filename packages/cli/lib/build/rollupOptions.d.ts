declare const _default: (opts: any) => Promise<{
    input: any;
    external: string[];
    plugins: any[];
    output: {
        format: string;
        sourcemap: boolean;
        globals: {
            react: string;
            'antd-mobile': string;
            classnames: string;
            '@alitajs/dform': string;
            '@alitajs/antd-mobile-plus': string;
            antd?: undefined;
        } | {
            react: string;
            antd: string;
            classnames: string;
            'antd-mobile'?: undefined;
            '@alitajs/dform'?: undefined;
            '@alitajs/antd-mobile-plus'?: undefined;
        };
        name: string;
        footer: string;
        file: string;
    };
    exportFileName: string;
    min: boolean;
}[]>;
export default _default;
