/**
 * {
    libraryDir: "src/library",
    outputDir: 'dist',
    exclude: [],
    extraExternals: [],
    globals: {},
    minFile: true,
    replace: {},
    disableTypeCheck: true,
    typescriptOpts: {}
  }
 */
module.exports = {
  outputDir: "lib",
  libraryDir: ["src/library"],
  minFile: true,
  platform: 'h5'
}