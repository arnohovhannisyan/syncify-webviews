export function runningOnVSCode() {
  return typeof acquireVsCodeApi !== "undefined";
}
