import { ISection, ISettingType } from "~/models";

export const defaultSections: ISection[] = [
	{
		name: "General",
		settings: [
			{
				name: "Test Number",
				correspondingSetting: "testNumber",
				type: ISettingType.NumberInput,
				placeholder: "Enter a number!"
			},
			{
				name: "Test String",
				correspondingSetting: "testString",
				type: ISettingType.TextInput,
				placeholder: "Enter a string!"
			},
			{
				name: "Test Array",
				correspondingSetting: "testArray",
				type: ISettingType.TextArea,
				placeholder: "Enter multiple strings!"
			},
			{
				name: "Test Select",
				correspondingSetting: "testSelect",
				type: ISettingType.Select,
				options: [
					{ name: "One", value: "1" },
					{ name: "Two", value: "2" },
					{ name: "Three", value: "3" }
				]
			},
			{
				name: "Test Object Array",
				correspondingSetting: "testObjectArray",
				type: ISettingType.ObjectArray,
				schema: [
					{
						name: "Hello!",
						correspondingSetting: "hello",
						placeholder: "Enter Hello!",
						type: ISettingType.TextInput
					},
					{
						name: "Goodbye!",
						correspondingSetting: "goodbye",
						placeholder: "Enter Goodbye!",
						type: ISettingType.NumberInput
					}
				],
				newTemplate: { hello: "Hi!", goodbye: 1 }
			},
			{
				name: "Test Boolean",
				correspondingSetting: "testBool",
				type: ISettingType.Checkbox
			},
			{
				name: "Test Boolean",
				correspondingSetting: "testBool",
				type: ISettingType.Checkbox
			},
			{
				name: "Test Boolean",
				correspondingSetting: "testBool",
				type: ISettingType.Checkbox
			},
			{
				name: "Test Boolean",
				correspondingSetting: "testBool",
				type: ISettingType.Checkbox
			},
			{
				name: "Test Boolean",
				correspondingSetting: "testBool",
				type: ISettingType.Checkbox
			},
			{
				name: "Test Boolean",
				correspondingSetting: "testBool",
				type: ISettingType.Checkbox
			}
		]
	}
];

export const defaultSettings = {
	testNumber: 10,
	testString: "Hello!",
	testArray: ["1!", "2!", "3!"],
	testSelect: "2",
	testBool: true,
	testObjectArray: [{ hello: "Hi!", goodbye: 1 }]
};
