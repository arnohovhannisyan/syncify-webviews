import { Section, SettingType } from "~/models";

export const defaultSections: Section[] =
	process.env.NODE_ENV === "production"
		? []
		: [
				{
					name: "General",
					settings: [
						{
							name: "Test Number",
							correspondingSetting: "testNumber",
							type: SettingType.NumberInput,
							placeholder: "Enter a number!",
						},
						{
							name: "Test String",
							correspondingSetting: "testString",
							type: SettingType.TextInput,
							placeholder: "Enter a string!",
						},
						{
							name: "Test Array",
							correspondingSetting: "testArray",
							type: SettingType.TextArea,
							placeholder: "Enter multiple strings!",
						},
						{
							name: "Test Select",
							correspondingSetting: "testSelect",
							type: SettingType.Select,
							options: [
								{ name: "One", value: "1" },
								{ name: "Two", value: "2" },
								{ name: "Three", value: "3" },
							],
						},
						{
							name: "Test Object Array",
							correspondingSetting: "testObjectArray",
							type: SettingType.ObjectArray,
							schema: [
								{
									name: "Hello!",
									correspondingSetting: "hello",
									placeholder: "Enter Hello!",
									type: SettingType.TextInput,
								},
								{
									name: "Goodbye!",
									correspondingSetting: "goodbye",
									placeholder: "Enter Goodbye!",
									type: SettingType.NumberInput,
								},
							],
							newTemplate: { hello: "Hi!", goodbye: 1 },
						},
						{
							name: "Test Boolean",
							correspondingSetting: "testBool",
							type: SettingType.Checkbox,
						},
						{
							name: "Test Boolean",
							correspondingSetting: "testBool",
							type: SettingType.Checkbox,
						},
						{
							name: "Test Boolean",
							correspondingSetting: "testBool",
							type: SettingType.Checkbox,
						},
						{
							name: "Test Boolean",
							correspondingSetting: "testBool",
							type: SettingType.Checkbox,
						},
						{
							name: "Test Boolean",
							correspondingSetting: "testBool",
							type: SettingType.Checkbox,
						},
						{
							name: "Test Boolean",
							correspondingSetting: "testBool",
							type: SettingType.Checkbox,
						},
					],
				},
		  ];

export const defaultSettings =
	process.env.NODE_ENV === "production"
		? {}
		: {
				testNumber: 10,
				testString: "Hello!",
				testArray: ["1!", "2!", "3!"],
				testSelect: "2",
				testBool: true,
				testObjectArray: [{ hello: "Hi!", goodbye: 1 }],
		  };
