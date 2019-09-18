import get from "lodash/get";
import React from "react";
import { ISettingMap, ISettingType } from "../../models";
import { CheckboxComponent } from "./checkbox";
import { NumberInputComponent } from "./numberInput";
import { SelectComponent } from "./select";
import { TextAreaComponent } from "./textArea";
import { TextInputComponent } from "./textInput";

interface IProps {
  name: string;
  map: ISettingMap[];
  settings: any[];
}

export const SectionComponent = (props: IProps) => (
  <div>
    <h3 className="mx-auto mt-2 text-left">{props.name}</h3>
    {props.map.map(setting => {
      switch (setting.type) {
        case ISettingType.TextInput:
          return (
            <TextInputComponent
              name={setting.name}
              correspondingSetting={setting.correspondingSetting}
              placeholder={setting.placeholder}
              value={get(props.settings, setting.correspondingSetting)}
              key={setting.correspondingSetting}
            ></TextInputComponent>
          );
        case ISettingType.NumberInput:
          return (
            <NumberInputComponent
              name={setting.name}
              correspondingSetting={setting.correspondingSetting}
              placeholder={setting.placeholder}
              value={get(props.settings, setting.correspondingSetting)}
              key={setting.correspondingSetting}
            ></NumberInputComponent>
          );
        case ISettingType.Select:
          return (
            <SelectComponent
              name={setting.name}
              correspondingSetting={setting.correspondingSetting}
              value={get(props.settings, setting.correspondingSetting)}
              key={setting.correspondingSetting}
              options={setting.options}
            ></SelectComponent>
          );
        case ISettingType.Checkbox:
          return (
            <CheckboxComponent
              name={setting.name}
              correspondingSetting={setting.correspondingSetting}
              value={get(props.settings, setting.correspondingSetting)}
              key={setting.correspondingSetting}
            ></CheckboxComponent>
          );
        case ISettingType.TextArea:
          return (
            <TextAreaComponent
              name={setting.name}
              correspondingSetting={setting.correspondingSetting}
              placeholder={setting.placeholder}
              value={get(props.settings, setting.correspondingSetting)}
              key={setting.correspondingSetting}
            ></TextAreaComponent>
          );
      }
    })}
  </div>
);
