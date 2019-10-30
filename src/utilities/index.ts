import { getData } from "~/utilities/getData";
import { isJSON } from "~/utilities/isJSON";
import { runningOnVSCode } from "~/utilities/runningOnVSCode";
import { useSearchParam } from "~/utilities/useSearchParam";
import { useVSCode } from "~/utilities/useVSCode";

export { getData, useVSCode, isJSON, runningOnVSCode, useSearchParam };

export default {
  isJSON,
  runningOnVSCode,
  useVSCode,
  getData,
  useSearchParam
};
