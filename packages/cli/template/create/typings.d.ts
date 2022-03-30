export { }

declare module "*.less";
declare module "*.svg";

declare global {
  interface Window {
    appId: string;
    lcdpApi: {
      registerComponent: (comp: any, config: any, platform?: 'h5' | 'pc') => void;
      registerAction: (key: string, action?: (params?: any) => Promise<any>) => void;
      getAction: (key: string) => Promise<any>;
    };
    wufengController: {
      registerComponent: (Comp: any, config: any, type: 'h5' | 'pc') => void;
    }
  }
}
