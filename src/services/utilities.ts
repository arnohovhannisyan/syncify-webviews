interface IVSCode {
  postMessage: (message: any) => void;
}

let vscodeCache: IVSCode;

export class Utilities {
  public static getData(name: string) {
    const data = unescape(
      document.querySelector("data-receiver").getAttribute(`data-${name}`)
    );

    if (this.isJSON(data)) {
      return JSON.parse(data);
    }

    return data;
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
    vscodeCache = (this.runningOnVSCode() || acquireFakeApi)();

    return vscodeCache;
  }

  public static runningOnVSCode() {
    try {
      return acquireVsCodeApi;
    } catch {
      return false;
    }
  }
}
