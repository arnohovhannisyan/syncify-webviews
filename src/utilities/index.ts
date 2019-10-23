import { getData } from "~/utilities/getData";
import { getVSCode } from "~/utilities/getVSCode";
import { isJSON } from "~/utilities/isJSON";
import { runningOnVSCode } from "~/utilities/runningOnVSCode";
import { useSearchParam } from "~/utilities/useSearchParam";

export { getData, getVSCode, isJSON, runningOnVSCode, useSearchParam };

export default {
  isJSON,
  runningOnVSCode,
  getVSCode,
  getData,
  useSearchParam
};
