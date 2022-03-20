import path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import { getConfigOpts, pkgInfo } from "../utils"
import winPath from '../utils/winPath';
import { getPlugins } from './rollupPlugins';


export default (opts) => {
  const { compName, outputDir, path: optsPath, outputFilePrefix } = opts;
  const { minFile, globals, extraExternals, namePrefix, platform } = getConfigOpts();
  return [
    {
      input: optsPath,
      external: [
        ...Object.keys(pkgInfo.peerDependencies || {}),
        ...extraExternals
      ],
      plugins: [
        ...getPlugins({
          minFile: false,
          isTypeScript: ['.ts', '.tsx'].includes(path.extname(optsPath))
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
        name: `${namePrefix}${compName}`,
        file: winPath(path.join(outputDir, compName, `${outputFilePrefix}.${platform}.js`))
      },
      exportFileName: `${outputFilePrefix}.${platform}.js`
    },
    ...(
      minFile ? [
        {
          input: optsPath,
          external: [
            ...Object.keys(pkgInfo.peerDependencies || {}),
            ...extraExternals
          ],
          plugins: [
            ...getPlugins({
              minFile,
              isTypeScript: ['.ts', '.tsx'].includes(path.extname(optsPath))
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
            name: `${namePrefix}${compName}`,
            file: winPath(path.join(outputDir, compName, `${outputFilePrefix}.${platform}.min.js`))
          },
          exportFileName: `${outputFilePrefix}.${platform}.min.js`
        }
      ] : []
    )
  ]
};