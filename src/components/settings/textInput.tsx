import { h } from "preact";
import { useEffect, useState, useRef } from "preact/hooks";
import { Subject } from "rxjs/internal/Subject";
import { debounceTime } from "rxjs/internal/operators/debounceTime";
import { TextInput, Update } from "~/models";
import { getVSCode } from "~/utilities";
import styles from "./styles";
import components from "~/css/components";

type Props = {
	map: TextInput;
	value: string;
	onChange?: (update: Update) => any;
};

export const TextInputComponent = (props: Props): h.JSX.Element => {
	const vscode = getVSCode();

	const { name, placeholder, correspondingSetting } = props.map;

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
	}, []);

	return (
		<div class={styles.container}>
			<label for={`setting:${correspondingSetting}`}>{name}</label>
			<input
				type="text"
				class={components.input}
				value={value}
				id={`setting:${correspondingSetting}`}
				placeholder={placeholder}
				onChange={(event) => {
					const update: Update = {
						setting: correspondingSetting,
						value: event.currentTarget.value,
					};

					setValue(update.value);

					subject.next(update);

					props.onChange?.(update);
				}}
			/>
		</div>
	);
};
