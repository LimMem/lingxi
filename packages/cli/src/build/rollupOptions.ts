import path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import { getConfigOpts, getOutputFile, pkgInfo } from "../utils"
import winPath from '../utils/winPath';
import dayjs from 'dayjs';
import { getPlugins } from './rollupPlugins';

const getDefaultExternal = async () => {
  const { platform } = await getConfigOpts();
  if (platform === 'app') {
    return [
      'react',
      'antd-mobile',
      'classnames',
      '@alitajs/dform',
      '@alitajs/antd-mobile-plus',
    ]
  }
  return [
    'react',
    'antd',
    'classnames',
  ]
}

const getDefaultGlobals = async () => {
  const { platform } = await getConfigOpts();
  if (platform === 'app') {
    return {
      'react': "React",
      'antd-mobile': "AntdMobile",
      'classnames': "classNames",
      '@alitajs/dform': "Dform",
      '@alitajs/antd-mobile-plus': "AntdMobilePlus",
    }
  }
  return {
    'react': "React",
    'antd': "Antd",
    'classnames': "classNames"
  }
}

export default async (opts) => {
  const { compName, outputDir, path: optsPath, isEditor, server } = opts;
  const { outputType, globals, external, namePrefix } = await getConfigOpts();
  const name = `${namePrefix}${compName}`;
  const footer = `window.${name}={
  __VERSION__: ${JSON.stringify(pkgInfo().version)},
  __BUILD_DATE__: ${JSON.stringify(dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'))}
};`;
  const minFile = outputType === 'all' || outputType === 'production';
  return [
    ...(outputType === 'all' || outputType === 'development' ? [
      {
        input: optsPath,
        external: [
          // ...await getDefaultExternal(),
          ...Object.keys(pkgInfo().peerDependencies || {}),
          ...external
        ],
        plugins: [
          ...await getPlugins({
            server,
            minFile: false,
            isTypeScript: ['.ts', '.tsx'].includes(path.extname(optsPath)),
            name,
            compName,
          }),
          commonjs({
            include: /node_modules/
          }),
        ],
        output: {
          format: "umd",
          sourcemap: false,
          globals: {
            // ...await getDefaultGlobals(),
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
        min: false,
      },
    ] : []),
    ...(
      minFile ? [
        {
          min: true,
          input: optsPath,
          external: [
            // ...await getDefaultExternal(),
            ...Object.keys(pkgInfo().peerDependencies || {}),
            ...external
          ],
          plugins: [
            ...await getPlugins({
              server,
              minFile,
              isTypeScript: ['.ts', '.tsx'].includes(path.extname(optsPath)),
              name,
              compName,
            }),
            commonjs({
              include: /node_modules/
            })
          ],
          output: {
            format: "umd",
            sourcemap: false,
            globals: {
              // ...await getDefaultGlobals(),
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