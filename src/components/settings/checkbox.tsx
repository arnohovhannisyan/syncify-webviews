import { h } from "preact";
import { useEffect, useState, useRef } from "preact/hooks";
import { Subject } from "rxjs/internal/Subject";
import { debounceTime } from "rxjs/internal/operators/debounceTime";
import { ICheckbox, IUpdate } from "~/models";
import { getVSCode } from "~/utilities";
import * as componentStyles from "~/styles/component.scss";

interface IProps {
	map: ICheckbox;
	value: boolean;
	onChange?: (update: IUpdate) => any;
}

export const CheckboxComponent = (props: IProps): h.JSX.Element => {
	const vscode = getVSCode();

	const { name, correspondingSetting } = props.map;

	const [value, setValue] = useState(props.value);
	const subject = useRef(new Subject<IUpdate>()).current;

	useEffect(() => {
		setValue(props.value);
	}, [props.value]);

	useEffect(() => {
		const subscription = subject
			.pipe(debounceTime(1000))
			.subscribe(update => vscode.postMessage(update));

		return () => subscription.unsubscribe();
	}, [subject, vscode]);

	return (
		<label class={componentStyles.checkbox}>
			{name}
			<input
				type="checkbox"
				checked={value}
				id={`setting:${correspondingSetting}`}
				onChange={event => {
					const update: IUpdate = {
						setting: correspondingSetting,
						value: event.currentTarget.checked
					};

					setValue(update.value);

					subject.next(update);

					props.onChange?.(update);
				}}
			/>
			<span class={componentStyles.checkmark} />
		</label>
	);
};
