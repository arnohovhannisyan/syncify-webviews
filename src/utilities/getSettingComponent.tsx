import get from "lodash/get";
import { h } from "preact";
import {
	CheckboxComponent,
	NumberInputComponent,
	ObjectArrayComponent,
	SelectComponent,
	TextAreaComponent,
	TextInputComponent,
} from "~/components";
import { SettingMap, SettingType, Update } from "~/models";

export const getSettingComponent = (
	settings: any,
	map: SettingMap,
	onChange?: (update: Update) => any,
): h.JSX.Element => {
	switch (map.type) {
		case SettingType.TextInput:
			return (
				<TextInputComponent
					key={map.correspondingSetting}
					map={map}
					value={get(settings, map.correspondingSetting)}
					onChange={onChange}
				/>
			);
		case SettingType.NumberInput:
			return (
				<NumberInputComponent
					key={map.correspondingSetting}
					map={map}
					value={get(settings, map.correspondingSetting)}
					onChange={onChange}
				/>
			);
		case SettingType.Select:
			return (
				<SelectComponent
					key={map.correspondingSetting}
					map={map}
					value={get(settings, map.correspondingSetting)}
					onChange={onChange}
				/>
			);
		case SettingType.Checkbox:
			return (
				<CheckboxComponent
					key={map.correspondingSetting}
					map={map}
					value={get(settings, map.correspondingSetting)}
					onChange={onChange}
				/>
			);
		case SettingType.TextArea:
			return (
				<TextAreaComponent
					key={map.correspondingSetting}
					map={map}
					value={get(settings, map.correspondingSetting)}
					onChange={onChange}
				/>
			);
		case SettingType.ObjectArray:
			return (
				<ObjectArrayComponent
					key={map.correspondingSetting}
					map={map}
					value={get(settings, map.correspondingSetting)}
				/>
			);
		default:
			return <p>Invalid map</p>;
	}
};
