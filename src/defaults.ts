import { ISettingType } from "~/models";

export const defaultSections = [
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
        placeholder: "Choose one!",
        options: [
          { name: "One", value: "1" },
          { name: "Two", value: "2" },
          { name: "Three", value: "3" }
        ]
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
  testBool: true
};
