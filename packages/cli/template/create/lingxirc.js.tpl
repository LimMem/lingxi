module.exports = {
  outputDir: 'lib',
  libraryDir: {
    editor: 'src/editor',
    engine: 'src/engine',
  },
  outputType: 'all', // development, all, production
  namePrefix: '{{{ AppName }}}',
  platform: '{{{ platform }}}', // app, pc
};
