import get from "lodash/get";
import { h } from "preact";
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
					map={map}
					value={get(settings, map.correspondingSetting)}
					key={map.correspondingSetting}
					onChange={onChange}
				/>
			);
		case ISettingType.NumberInput:
			return (
				<NumberInputComponent
					map={map}
					value={get(settings, map.correspondingSetting)}
					key={map.correspondingSetting}
					onChange={onChange}
				/>
			);
		case ISettingType.Select:
			return (
				<SelectComponent
					map={map}
					value={get(settings, map.correspondingSetting)}
					key={map.correspondingSetting}
					onChange={onChange}
				/>
			);
		case ISettingType.Checkbox:
			return (
				<CheckboxComponent
					map={map}
					value={get(settings, map.correspondingSetting)}
					key={map.correspondingSetting}
					onChange={onChange}
				/>
			);
		case ISettingType.TextArea:
			return (
				<TextAreaComponent
					map={map}
					value={get(settings, map.correspondingSetting)}
					key={map.correspondingSetting}
					onChange={onChange}
				/>
			);
		case ISettingType.ObjectArray:
			return (
				<ObjectArrayComponent
					map={map}
					value={get(settings, map.correspondingSetting)}
					key={map.correspondingSetting}
				/>
			);
		default:
			return <p>Invalid map</p>;
	}
};
