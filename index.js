const requireOrImport = async pluginPath => {
  console.log(pluginPath);
  try {
    return require(pluginPath);
  } catch (error) {
    return await import(pluginPath);
  }
};

(async () => {
  console.log(await requireOrImport('./config.js'));
})();
