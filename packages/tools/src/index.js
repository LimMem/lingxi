const yParser = require('yargs-parser');
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const gulpTs = require('gulp-typescript');
const gulpBabel = require('gulp-babel');
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const chalk = require('chalk');
const through = require('through2');
const chokidar = require('chokidar');

const cwd = process.cwd();

const args = yParser(process.argv.slice(2), {
  alias: {
    watch: 'w',
    srcDir: 'src-dir',
    output: 'output',
  },
});

let userOptions = {
  srcDir: args.srcDir || 'src',
  output: args.output || 'lib',
  watch: args.watch,
};

function isTypeScript(file) {
  return ['.ts', '.tsx'].includes(file.extname) && !/.d.ts$/.test(file.path);
}

function getTypescriptConfig() {
  const tsConfigFilePath = path.join(cwd, 'tsconfig.json');
  if (fs.existsSync(tsConfigFilePath)) {
    return gulpTs.createProject(tsConfigFilePath, {
      declaration: true,
    })();
  }
  return gulpTs({
    declaration: false,
    noImplicitAny: true,
    rootDir: path.join(cwd, userOptions.srcDir),
  })();
}

function canBabelCompile(file) {
  return (
    ['.ts', '.tsx', '.js', '.jsx', '.cjs', '.mjs'].includes(file.extname) &&
    !/\.d\.ts$/.test(file.path)
  );
}

console.log(chalk.yellow(`clean ${userOptions.output}`));
rimraf.sync(path.join(cwd, userOptions.output));

function build(src, outputFile) {
  const { srcDir, output } = userOptions;
  return gulp
    .src(src)
    .pipe(
      gulpIf(
        canBabelCompile,
        through.obj(function(file, env, cb) {
          console.log(
            chalk.green(
              `[编译] ${file.path.replace(path.join(cwd, srcDir), '')}`
            )
          );
          cb(null, file);
        })
      )
    )
    .pipe(gulpIf(isTypeScript, getTypescriptConfig()))
    .pipe(
      gulpIf(
        canBabelCompile,
        gulpBabel({
          presets: [
            [require.resolve('@babel/preset-env'), {}],
            [require.resolve('@babel/preset-typescript')],
          ],
          plugins: [[require.resolve('@babel/plugin-transform-runtime')]],
          configFile: false,
          babelrc: false,
        })
      )
    )
    .pipe(gulp.dest(outputFile ? outputFile : path.join(cwd, output)));
}

const watcherEventNameMap = {
  add: '新增文件',
  addDir: '新增文件夹',
  change: '修改',
  unlink: '删除文件',
  unlinkDir: '删除文件夹',
};

build([`${path.join(cwd, userOptions.srcDir)}/**`]).on('end', function() {
  console.log();
  console.log(`🌈✨编译完成!`);
  if (process.send) {
    process.send('COMPILE_DONE');
  }
  const { watch = false, srcDir } = userOptions;
  if (watch) {
    console.log(chalk.blue(`开始监听[/${srcDir}]目录`));
    const watcher = chokidar.watch(path.join(cwd, srcDir), {
      ignoreInitial: true,
    });
    watcher.on('all', (event, fullPath) => {
      const relPath = fullPath.replace(path.join(cwd, srcDir), '');
      if (!fs.existsSync(fullPath)) return;
      if (fs.statSync(fullPath).isFile()) {
        console.log();
        console.log(
          chalk.blueBright(`[${watcherEventNameMap[event]}] ${relPath}`)
        );
        build(
          fullPath,
          path.join(process.cwd(), userOptions.output, relPath, '../')
        ).on('end', function() {
          console.log(
            chalk.green(
              `[${watcherEventNameMap[event]}: ${relPath}] 编译完成✨🚀`
            )
          );
        });
      }
    });
  }
});
