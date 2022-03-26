export const requireOrImport = async (pluginPath: string): Promise<any> => {
  try {
    return require(pluginPath);
  } catch (error) {
    return await import(pluginPath);
  }
};