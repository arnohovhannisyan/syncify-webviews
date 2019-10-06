interface IVSCode {
  postMessage: (message: any) => void;
}

let vscodeCache: IVSCode;

export default class Utilities {
  public static getData(name: string) {
    const receiver = document.querySelector("data-receiver");

    if (!receiver) return;

    const attr = receiver.getAttribute(`data-${name}`);

    if (!attr) return;

    const data = unescape(attr);

    if (this.isJSON(data)) {
      return JSON.parse(data);
    }

    return data as any;
  }

  public static isJSON(json: string) {
    try {
      JSON.parse(json);
      return true;
    } catch {
      return false;
    }
  }

  public static getVSCode(): IVSCode {
    if (vscodeCache) {
      return vscodeCache;
    }

    const acquireFakeApi = () => ({ postMessage: console.log });
    vscodeCache = (this.runningOnVSCode()
      ? acquireVsCodeApi
      : acquireFakeApi)();

    return vscodeCache;
  }

  public static runningOnVSCode() {
    try {
      return !!acquireVsCodeApi;
    } catch {
      return false;
    }
  }
}

export const getData = Utilities.getData;
export const isJSON = Utilities.isJSON;
export const getVSCode = Utilities.getVSCode;
export const runningOnVSCode = Utilities.runningOnVSCode;
