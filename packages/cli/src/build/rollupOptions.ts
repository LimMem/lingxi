import path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import { getConfigOpts, getOutputFile, pkgInfo } from "../utils"
import winPath from '../utils/winPath';
import { getPlugins } from './rollupPlugins';

export default async (opts) => {
  const { compName, outputDir, path: optsPath, isEditor } = opts;
  const { outputType, globals, external, namePrefix } = await getConfigOpts();
  const name = `${namePrefix}${compName}`;
  const footer = `window.${name}={};\nwindow.${name}.__VERSION__=${JSON.stringify(pkgInfo().version)};\nwindow.${name}.__BUILD_DATE__=${JSON.stringify(new Date())}`;
  const minFile = outputType === 'all' || outputType === 'production';
  return [
    ...(outputType === 'all' || outputType === 'development' ? [
      {
        input: optsPath,
        external: [
          ...Object.keys(pkgInfo().peerDependencies || {}),
          ...external
        ],
        plugins: [
          ...await getPlugins({
            minFile: false,
            isTypeScript: ['.ts', '.tsx'].includes(path.extname(optsPath)),
            name
          }),
          commonjs({
            include: /node_modules/
          }),
        ],
        output: {
          format: "umd",
          sourcemap: false,
          globals: {
            'react': "React",
            ...(globals || {})
          },
          name,
          footer,
          file: winPath(path.join(outputDir, compName, await getOutputFile({
            isMin: false,
            compName,
            isEditor
          })))
        },
        exportFileName: await getOutputFile({
          isMin: false,
          compName,
          isEditor
        }),
      },
    ] : []),
    ...(
      minFile ? [
        {
          input: optsPath,
          external: [
            ...Object.keys(pkgInfo().peerDependencies || {}),
            ...external
          ],
          plugins: [
            ...await getPlugins({
              minFile,
              isTypeScript: ['.ts', '.tsx'].includes(path.extname(optsPath)),
              name
            }),
            commonjs({
              include: /node_modules/
            })
          ],
          output: {
            format: "umd",
            sourcemap: false,
            globals: {
              'react': "React",
              ...(globals || {})
            },
            name,
            footer,
            file: winPath(path.join(outputDir, compName, await getOutputFile({
              isMin: true,
              compName,
              isEditor
            })))
          },
          exportFileName: await getOutputFile({
            isMin: true,
            compName,
            isEditor
          })
        }
      ] : []
    )
  ]
};