import { IOption, ISettingType } from "~/models";

interface ICheckbox {
  name: string;
  type: ISettingType.Checkbox;
  correspondingSetting: string;
}

interface ITextInput {
  name: string;
  type: ISettingType.TextInput;
  correspondingSetting: string;
  placeholder: string;
}

interface ITextArea {
  name: string;
  type: ISettingType.TextArea;
  correspondingSetting: string;
  placeholder: string;
}

interface INumberInput {
  name: string;
  type: ISettingType.NumberInput;
  correspondingSetting: string;
  placeholder: string;
}

interface ISelect {
  name: string;
  type: ISettingType.Select;
  correspondingSetting: string;
  options: IOption[];
}

interface IObjectArray {
  name: string;
  type: ISettingType.ObjectArray;
  correspondingSetting: string;
  schema: ISettingMap[];
  newTemplate: object;
}

export type ISettingMap =
  | ICheckbox
  | ISelect
  | ITextArea
  | ITextInput
  | INumberInput
  | IObjectArray;
