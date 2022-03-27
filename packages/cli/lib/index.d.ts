
export interface LingXiOptions {
  libraryDir: {
    editor?: string;
    engine?: string;
  },
  outputDir?: string;
  external?: string[];
  globals?: Record<string, any>;
  sourcemap?: boolean;
  outputType?: "all" | "development" | "production"; // default production 
  replace?: Record<string, any>;
  disableTypeCheck?: boolean;
  typescriptOpts?: Record<string, any>;
  namePrefix?: string;
  platform?: 'app' | 'pc';
  targets?: any;
  postcssExtension?: Record<string, any>;
  babelOptions?: {
    plugins: any[];
    presets: any[];
  }
}

export type GetConfigOptsFunction = () => Promise<Required<LingXiOptions>>;
