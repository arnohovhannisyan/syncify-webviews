import get from "lodash/get";
import React from "react";
import {
  CheckboxComponent,
  NumberInputComponent,
  ObjectArrayComponent,
  SelectComponent,
  TextAreaComponent,
  TextInputComponent
} from "~/components";
import { ISettingMap, ISettingType, IUpdate } from "~/models";

export const getSettingComponent = (
  settings: any,
  map: ISettingMap,
  onChange?: (update: IUpdate) => any
) => {
  switch (map.type) {
    case ISettingType.TextInput:
      return (
        <TextInputComponent
          name={map.name}
          correspondingSetting={map.correspondingSetting}
          placeholder={map.placeholder}
          value={get(settings, map.correspondingSetting)}
          key={map.correspondingSetting}
          onChange={onChange}
        />
      );
    case ISettingType.NumberInput:
      return (
        <NumberInputComponent
          name={map.name}
          correspondingSetting={map.correspondingSetting}
          placeholder={map.placeholder}
          value={get(settings, map.correspondingSetting)}
          key={map.correspondingSetting}
          onChange={onChange}
        />
      );
    case ISettingType.Select:
      return (
        <SelectComponent
          name={map.name}
          correspondingSetting={map.correspondingSetting}
          value={get(settings, map.correspondingSetting)}
          key={map.correspondingSetting}
          options={map.options}
          onChange={onChange}
        />
      );
    case ISettingType.Checkbox:
      return (
        <CheckboxComponent
          name={map.name}
          correspondingSetting={map.correspondingSetting}
          value={get(settings, map.correspondingSetting)}
          key={map.correspondingSetting}
          onChange={onChange}
        />
      );
    case ISettingType.TextArea:
      return (
        <TextAreaComponent
          name={map.name}
          correspondingSetting={map.correspondingSetting}
          placeholder={map.placeholder}
          value={get(settings, map.correspondingSetting)}
          key={map.correspondingSetting}
          onChange={onChange}
        />
      );
    case ISettingType.ObjectArray:
      return (
        <ObjectArrayComponent
          name={map.name}
          correspondingSetting={map.correspondingSetting}
          value={get(settings, map.correspondingSetting)}
          schema={map.schema}
          newTemplate={map.newTemplate}
          key={map.correspondingSetting}
        />
      );
    default:
      return <p>Invalid map</p>;
  }
};
