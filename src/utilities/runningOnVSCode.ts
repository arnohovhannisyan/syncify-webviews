export function runningOnVSCode(): boolean {
	return typeof acquireVsCodeApi !== "undefined";
}
