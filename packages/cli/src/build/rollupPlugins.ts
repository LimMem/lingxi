import postcss from 'rollup-plugin-postcss';
import url from '@rollup/plugin-url';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript2 from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import svgr from '@svgr/rollup';
import NpmImport from 'less-plugin-npm-import';
import autoprefixer from 'autoprefixer';
import { cwd } from '../utils/tool';
import path from 'path';
import fs from 'fs';
import tempDir from 'temp-dir';
import { getConfigOpts } from '../utils';

export const getPlugins = ({ minFile = false, isTypeScript }) => {
  const { replace: replaceOpts = {}, disableTypeCheck, typescriptOpts } = getConfigOpts();
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
    }),
    ...(replaceOpts && Object.keys(replaceOpts || {}).length ? [replace(replaceOpts)] : []),
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
    json(),
    ...(minFile ? [
      replace({
        'process.env.NODE_ENV': minFile ? JSON.stringify('production') : JSON.stringify('development'),
      }),
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