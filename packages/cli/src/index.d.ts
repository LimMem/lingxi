export interface LingXiOptions {
  libraryDir: string | string[],
  outputDir: string;
  exclude: string[];
  extraExternals: string[];
  globals: Record<string, any>;
  sourcemap: boolean;
  minFile?: boolean;
  replace: Record<string, any>;
  disableTypeCheck: boolean;
  typescriptOpts: Record<string, any>;
  namePrefix?: string;
  platform: 'h5' | 'pc';
}

export type GetConfigOptsFunction = () => LingXiOptions;