import { h } from "preact";
import { useEffect, useState, useRef } from "preact/hooks";
import { Subject } from "rxjs/internal/Subject";
import { debounceTime } from "rxjs/internal/operators/debounceTime";
import { Checkbox, Update } from "~/models";
import { getVSCode } from "~/utilities";
import components from "~/css/components";

type Props = {
	map: Checkbox;
	value: boolean;
	onChange?: (update: Update) => any;
};

export const CheckboxComponent = (props: Props): h.JSX.Element => {
	const vscode = getVSCode();

	const { name, correspondingSetting } = props.map;

	const [value, setValue] = useState(props.value);
	const subject = useRef(new Subject<Update>()).current;

	useEffect(() => {
		setValue(props.value);
	}, [props.value]);

	useEffect(() => {
		const subscription = subject
			.pipe(debounceTime(1000))
			.subscribe((update) => vscode.postMessage(update));

		return () => subscription.unsubscribe();
	}, [subject, vscode]);

	return (
		<label class={components.checkbox}>
			{name}
			<input
				type="checkbox"
				checked={value}
				id={`setting:${correspondingSetting}`}
				onChange={(event) => {
					const update: Update = {
						setting: correspondingSetting,
						value: event.currentTarget.checked,
					};

					setValue(update.value);

					subject.next(update);

					props.onChange?.(update);
				}}
			/>
			<span />
		</label>
	);
};
