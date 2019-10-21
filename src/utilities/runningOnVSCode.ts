export function runningOnVSCode() {
  try {
    return !!acquireVsCodeApi;
  } catch {
    return false;
  }
}
