import { getData } from "~/utilities/getData";
import { getVSCode } from "~/utilities/getVSCode";
import { isJSON } from "~/utilities/isJSON";
import { runningOnVSCode } from "~/utilities/runningOnVSCode";

export { getData, getVSCode, isJSON, runningOnVSCode };

export default {
  isJSON,
  runningOnVSCode,
  getVSCode,
  getData
};
