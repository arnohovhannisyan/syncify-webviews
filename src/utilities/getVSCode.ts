import { runningOnVSCode } from "~/utilities";

type VSCodeAPI = {
	postMessage: (message: any) => void;
};

let vscodeCache: VSCodeAPI;

export const getVSCode = (): VSCodeAPI => {
	if (vscodeCache) return vscodeCache;

	vscodeCache = runningOnVSCode()
		? acquireVsCodeApi()
		: { postMessage: console.log };

	return vscodeCache;
};
