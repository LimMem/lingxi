export interface LingXiOptions {
  libraryDir: string | string[],
  outputDir: string;
  external: string[];
  globals: Record<string, any>;
  sourcemap: boolean;
  outputType: "all" | "development" | "production"; // default production 
  replace: Record<string, any>;
  disableTypeCheck: boolean;
  typescriptOpts: Record<string, any>;
  namePrefix?: string;
  platform: 'h5' | 'pc';
  targets?: any;
  postcssExtension?: Record<string, any>;
}

export type GetConfigOptsFunction = () => LingXiOptions;