import fs from 'fs';
import path from 'path';
import mustache from 'mustache';
import mkdirp from 'mkdirp';

const mustacheRender = ({ input, output, fileName }, {
  outputDir,
  opts
}) => {
  const absInputPath = path.join(__dirname, input);
  mkdirp.sync(path.dirname(path.join(outputDir, output)));
  const contentTpl = fs.readFileSync(absInputPath, { encoding: 'utf-8' });
  const contentText = mustache.render(contentTpl, opts);
  fs.writeFileSync(path.join(outputDir, output), contentText, { encoding: "utf-8" });
};


const readInputDirSync = (src: string) => {
  const dirPath = path.join(__dirname, src);
  if (!fs.lstatSync(dirPath).isDirectory()) {
    return;
  }

  const fileList = [];
  function recursiveDir(dir, prefix) {
    const files = fs.readdirSync(path.join(__dirname, dir), { encoding: "utf-8" });
    files.forEach(file => {
      const lstat = fs.lstatSync(path.join(__dirname, dir, file));
      if (lstat.isDirectory()) {
        recursiveDir(`${dir}/${file}`, `${prefix ? prefix + "/" : ""}${file}`)
      } else {
        fileList.push({
          input: `${dir}/${file}`,
          output: `${prefix ? prefix + "/" : ""}${file.replace(/\.tpl$/, "")}`,
          fileName: file
        });
      }
    });
  }
  recursiveDir(src, '');
  return fileList;
}


export default ({
  type,
  outputDir,
  opts
}: {
  type: 'create'
  opts: any;
  outputDir: string
}) => {
  const files = readInputDirSync(`../../template/${type}`);
  files.forEach((file) => {
    mustacheRender(file, {
      outputDir,
      opts
    });
  });
}