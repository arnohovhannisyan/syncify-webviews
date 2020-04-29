import { Option, SettingType } from "~/models";

export type Checkbox = {
	name: string;
	type: SettingType.Checkbox;
	correspondingSetting: string;
};

export type TextInput = {
	name: string;
	type: SettingType.TextInput;
	correspondingSetting: string;
	placeholder: string;
};

export type TextArea = {
	name: string;
	type: SettingType.TextArea;
	correspondingSetting: string;
	placeholder: string;
};

export type NumberInput = {
	name: string;
	type: SettingType.NumberInput;
	correspondingSetting: string;
	placeholder: string;
	min?: number;
	max?: number;
};

export type Select = {
	name: string;
	type: SettingType.Select;
	correspondingSetting: string;
	options: Option[];
};

export type ObjectArray = {
	name: string;
	type: SettingType.ObjectArray;
	correspondingSetting: string;
	schema: SettingMap[];
	newTemplate: object;
};

export type SettingMap =
	| Checkbox
	| Select
	| TextArea
	| TextInput
	| NumberInput
	| ObjectArray;
