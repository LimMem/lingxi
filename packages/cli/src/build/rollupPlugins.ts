import fs from 'fs';
import path from 'path';
import postcss from 'rollup-plugin-postcss';
import url from '@rollup/plugin-url';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript2 from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import svgr from '@svgr/rollup';
import { babel } from '@rollup/plugin-babel';
import NpmImport from 'less-plugin-npm-import';
import autoprefixer from 'autoprefixer';
import tempDir from 'temp-dir';
import { cwd } from '../utils/tool';
import { getConfigOpts, pkgInfo } from '../utils';

export const getPlugins = ({ minFile = false, isTypeScript, name }) => {
  const { replace: replaceOpts = {}, disableTypeCheck, typescriptOpts, targets, postcssExtension } = getConfigOpts();
  return [
    url(),
    svgr(),
    postcss({
      autoModules: false,
      minimize: minFile,
      use: {
        less: {
          plugins: [new NpmImport({ prefix: '~' })],
          javascriptEnabled: true,
        },
        sass: false,
        stylus: false
      },
      plugins: [autoprefixer({
        remove: false,
      })],
      ...postcssExtension
    }),
    ...(replaceOpts && Object.keys(replaceOpts || {}).length ? [replace({
      __buildDate__: () => JSON.stringify(new Date()),
      __buildVersion__: () => JSON.stringify(pkgInfo().version),
      'process.env.NODE_ENV': minFile ? JSON.stringify('production') : JSON.stringify('development'),
      ...replaceOpts,
    })] : []),
    nodeResolve({
      mainFields: ['module', 'jsnext:main', 'main'],
    }),
    ...(isTypeScript
      ? [
        typescript2({
          cwd: cwd(),
          clean: true,
          cacheRoot: `${tempDir}/.rollup_plugin_typescript2_cache`,
          tsconfig: [path.join(cwd(), 'tsconfig.json')].find(fs.existsSync),
          tsconfigDefaults: {
            compilerOptions: {
              declaration: false,
            },
          },
          tsconfigOverride: {
            compilerOptions: {
              target: 'esnext',
              declaration: false,
            },
          },
          check: !disableTypeCheck,
          ...(typescriptOpts || {}),
        }),
      ]
      : []),
    babel({
      babelrc: false,
      configFile: false,
      babelHelpers: "bundled",
      extensions: ['ts', 'tsx', 'js', 'jsx', '.json'],
      presets: [
        [require.resolve("@babel/preset-typescript")],
        [require.resolve('@babel/preset-env'), {
          useBuiltIns: 'usage',
          corejs: 2,
          targets
        }],
        [require.resolve('@babel/preset-react')]
      ],
      exclude: /\/node_modules\//,
    }),
    json(),
    ...(minFile ? [
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
        },
      }),
    ] : [])
  ];
}