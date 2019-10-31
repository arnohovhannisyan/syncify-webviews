import { getData } from "~/utilities/getData";
import { getSettingComponent } from "~/utilities/getSettingComponent";
import { isJSON } from "~/utilities/isJSON";
import { runningOnVSCode } from "~/utilities/runningOnVSCode";
import { useSearchParam } from "~/utilities/useSearchParam";
import { useVSCode } from "~/utilities/useVSCode";

export {
  getData,
  useVSCode,
  isJSON,
  runningOnVSCode,
  useSearchParam,
  getSettingComponent
};

export default {
  isJSON,
  runningOnVSCode,
  useVSCode,
  getData,
  useSearchParam,
  getSettingComponent
};
