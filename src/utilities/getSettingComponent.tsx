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
): h.JSX.Element => {
	switch (map.type) {
		case ISettingType.TextInput:
			return (
				<TextInputComponent
					key={map.correspondingSetting}
					map={map}
					value={get(settings, map.correspondingSetting)}
					onChange={onChange}
				/>
			);
		case ISettingType.NumberInput:
			return (
				<NumberInputComponent
					key={map.correspondingSetting}
					map={map}
					value={get(settings, map.correspondingSetting)}
					onChange={onChange}
				/>
			);
		case ISettingType.Select:
			return (
				<SelectComponent
					key={map.correspondingSetting}
					map={map}
					value={get(settings, map.correspondingSetting)}
					onChange={onChange}
				/>
			);
		case ISettingType.Checkbox:
			return (
				<CheckboxComponent
					key={map.correspondingSetting}
					map={map}
					value={get(settings, map.correspondingSetting)}
					onChange={onChange}
				/>
			);
		case ISettingType.TextArea:
			return (
				<TextAreaComponent
					key={map.correspondingSetting}
					map={map}
					value={get(settings, map.correspondingSetting)}
					onChange={onChange}
				/>
			);
		case ISettingType.ObjectArray:
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
