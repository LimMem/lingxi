export { }

declare module "*.less";

declare global {
  interface Window {
    appId: string;
    lcdpApi: {
      registerComponent: (comp: any, config: any, platform?: 'h5' | 'pc') => void;
      registerAction: (key: string, action?: (params?: any) => Promise<any>) => void;
      getAction: (key: string) => Promise<any>;
    }
  }
}
