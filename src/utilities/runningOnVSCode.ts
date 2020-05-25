export const runningOnVSCode = (): boolean =>
	typeof acquireVsCodeApi !== "undefined";
