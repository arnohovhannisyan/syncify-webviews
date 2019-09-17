import { IOption } from "../components";
import { ISettingType } from "./settingType";

export interface ISettingMap {
  correspondingSetting: string;
  name: string;
  placeholder?: string;
  type: ISettingType;
  options?: IOption[];
}
