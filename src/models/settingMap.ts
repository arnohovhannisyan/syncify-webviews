import { IOption, ISettingType } from "~/models";

export interface ICheckbox {
  name: string;
  type: ISettingType.Checkbox;
  correspondingSetting: string;
}

export interface ITextInput {
  name: string;
  type: ISettingType.TextInput;
  correspondingSetting: string;
  placeholder: string;
}

export interface ITextArea {
  name: string;
  type: ISettingType.TextArea;
  correspondingSetting: string;
  placeholder: string;
}

export interface INumberInput {
  name: string;
  type: ISettingType.NumberInput;
  correspondingSetting: string;
  placeholder: string;
  min?: number;
  max?: number;
}

export interface ISelect {
  name: string;
  type: ISettingType.Select;
  correspondingSetting: string;
  options: IOption[];
}

export interface IObjectArray {
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
