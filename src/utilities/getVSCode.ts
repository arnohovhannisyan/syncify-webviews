import { runningOnVSCode } from "~/utilities";

interface IVSCode {
  postMessage: (message: any) => any;
}

let vscodeCache: IVSCode;

export function getVSCode(): IVSCode {
  if (vscodeCache) return vscodeCache;

  vscodeCache = runningOnVSCode()
    ? acquireVsCodeApi()
    : { postMessage: console.log };

  return vscodeCache;
}