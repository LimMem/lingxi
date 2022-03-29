import fs from 'fs';
import path from 'path';
import postcss from 'rollup-plugin-postcss';
import url from '@rollup/plugin-url';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript2 from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import svgr from '@svgr/rollup';
import { babel } from '@rollup/plugin-babel';
import NpmImport from 'less-plugin-npm-import';
import autoprefixer from 'autoprefixer';
import tempDir from 'temp-dir';
import chalk from 'chalk'
import { cwd } from '../utils/tool';
import { getConfigOpts, getDefaultFile, getOutputFile, outputPathAbsolutePath, pkgInfo, targetAbsolutePaths } from '../utils';
import { getBabelConfig } from './babelConfig';

export const getPlugins = async ({ minFile = false, isTypeScript, name, server = false, compName }) => {
  const { replace: replaceOpts = {}, disableTypeCheck, typescriptOpts, postcssExtension, outputDir } = await getConfigOpts();
  return [
    nodeResolve({
      preferBuiltins: true,
      browser: true,
    }),
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
    babel(await getBabelConfig()),
    json(),
    ...(!minFile && server ? [
      serve({
        contentBase: path.join(outputDir, compName),
        onListening: async function (server) {
          const address = server.address()
          const host = address.address === '::' ? 'localhost' : address.address;
          const editorFileName = await getOutputFile({
            isMin: false,
            compName,
            isEditor: true
          })
          const engineFileName = await getOutputFile({
            isMin: false,
            compName,
            isEditor: false
          });

          const { editor, engine } = await targetAbsolutePaths();
          const editorIndexFile = await getDefaultFile(path.join(editor, compName))
          const engineIndexFile = await getDefaultFile(path.join(engine, compName))
          if (editorIndexFile) {
            if (fs.existsSync(path.join(editor, compName, editorIndexFile))) {
              console.log(chalk.green(`http://${host}:${address.port}/${editorFileName}`));
            }
          }
          if (engineIndexFile) {
            if (fs.existsSync(path.join(engine, compName, engineIndexFile))) {
              console.log(chalk.green(`http://${host}:${address.port}/${engineFileName}`));
            }
          }
        }
      }),
      livereload({ watch: path.join(outputDir, compName) }),
    ] : []),
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