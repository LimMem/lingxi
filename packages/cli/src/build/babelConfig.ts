import { getConfigOpts } from "../utils";
import { RollupBabelInputPluginOptions } from '@rollup/plugin-babel/types';

export const getBabelConfig = async (): Promise<RollupBabelInputPluginOptions> => {
  const { targets, babelOptions } = await getConfigOpts();
  return {
    babelrc: false,
    configFile: false,
    babelHelpers: "inline",
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.es6', '.es', '.mjs'],
    presets: [
      [require.resolve("@babel/preset-typescript")],
      [require.resolve('@babel/preset-env'), {
        modules: "auto",
        targets
      }],
      [require.resolve('@babel/preset-react')],
      ...(babelOptions?.presets || [])
    ],
    plugins: [
      [require.resolve('babel-plugin-import'), { libraryName: "antd-mobile", style: "true" }],
      [require.resolve('babel-plugin-react-require')],
      require.resolve('@babel/plugin-syntax-dynamic-import'),
      require.resolve('@babel/plugin-proposal-export-default-from'),
      require.resolve('@babel/plugin-proposal-export-namespace-from'),
      require.resolve('@babel/plugin-proposal-do-expressions'),
      require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'),
      require.resolve('@babel/plugin-proposal-optional-chaining'),
      [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
      [require.resolve('@babel/plugin-proposal-class-properties'), { loose: true }],
      [require.resolve('@babel/plugin-proposal-private-methods'), { "loose": true }],
      [require.resolve('@babel/plugin-proposal-private-property-in-object'), { "loose": true }],
      ...(babelOptions?.plugins || [])
    ],
    exclude: /\/node_modules\//,
  };
}